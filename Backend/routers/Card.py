from fastapi import APIRouter, Depends,HTTPException
from database import SessionLocal
from sqlalchemy.orm import Session
from schemas import CardSchema, CardUpdate
from models import Card


routerCard = APIRouter(prefix="/cards", tags=["Card"])
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@routerCard.get("/")
def get_all_cards(db: Session = Depends(get_db)):
    cards = db.query(Card).order_by(Card.order).all()  # optional: keep ordering if you want

    result = []
    for c in cards:
        result.append({
            "title": c.title,
            "description": c.description,
            "buttonText": c.button_text,
            "logo": c.logo,
            "category": c.category,  # include category if you still want it
            "link": c.link
        })

    return result






@routerCard.post("/add")
def add_card(card: CardSchema, db: Session = Depends(get_db)):
    # Handle order logic
    if getattr(card, "order", None) == 1:  # if order=1, make it top
        # push all existing cards in the same category down by 1
        db.query(Card).filter(Card.category == card.category).update(
            {Card.order: Card.order + 1}
        )
        db.commit()
    elif not getattr(card, "order", None):
        # if no order provided, append to bottom
        max_order_card = db.query(Card).filter(Card.category == card.category).order_by(Card.order.desc()).first()
        card.order = max_order_card.order + 1 if max_order_card else 1

    # now create card with order
    db_card = Card(
        category=card.category,
        title=card.title,
        description=card.description,
        button_text=card.button_text,
        logo=card.logo,
        order=card.order,
        link = card.link
    )
    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return {"message": "Card added successfully", "card": card}


@routerCard.get("/Find")
def FindCard(title: str, db: Session = Depends(get_db)):
    cards = db.query(Card).filter(
        Card.title.ilike(f"%{title}%")
    ).all()

    return {
        "cards": [
            {
                "id": c.id,
                "title": c.title,
                "description": c.description,
                "button_text": c.button_text,
                "logo": c.logo,
                "category": c.category,
                "link": c.link,
                "order": c.order
            }
            for c in cards
        ]
    }



@routerCard.delete("/delete/{card_id}")
def delete_card(card_id: int, db: Session = Depends(get_db)):
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    db.delete(card)
    db.commit()
    return {"message": "Card deleted successfully"}






@routerCard.put("/update/{card_id}")
def update_card(card_id: int, card_data: CardUpdate, db: Session = Depends(get_db)):
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    # Update only provided fields
    for key, value in card_data.dict(exclude_unset=True).items():
        setattr(card, key, value)

    db.commit()
    db.refresh(card)
    return {"message": "Card updated successfully", "card": {
        "id": card.id,
        "title": card.title,
        "description": card.description,
        "button_text": card.button_text,
        "logo": card.logo,
        "category": card.category,
        "link": card.link,
        "order": card.order
    }}