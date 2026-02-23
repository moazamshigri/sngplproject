from fastapi import APIRouter, Depends, HTTPException, status, Query
from schemas import BaseCategoryCreate, SubCategoryCreate
from models import BaseCategory, SubCategory
from database import SessionLocal
from sqlalchemy.orm import Session

routerCategory = APIRouter(tags=["Category"], prefix="/Category")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ------------------- CREATE -------------------

@routerCategory.post("/base/create")
def create_base_category(category: BaseCategoryCreate, db: Session = Depends(get_db)):
    existing = db.query(BaseCategory).filter(BaseCategory.CategoryName == category.CategoryName).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category already exists")
    
    new_category = BaseCategory(CategoryName=category.CategoryName)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category


@routerCategory.post("/sub/create")
def create_sub_category(category: SubCategoryCreate, db: Session = Depends(get_db)):
    # Check if the base category exists
    base = db.query(BaseCategory).filter(BaseCategory.id == category.base_id).first()
    if not base:
        raise HTTPException(status_code=400, detail="Base category does not exist")

    # Optional: check if subcategory with same name already exists
    existing = db.query(SubCategory).filter(SubCategory.CategoryName == category.CategoryName).first()
    if existing:
        raise HTTPException(status_code=400, detail="Subcategory already exists")
    
    new_category = SubCategory(
        CategoryName=category.CategoryName,
        base_id=category.base_id
    )
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category


# ------------------- FETCH -------------------

@routerCategory.get("/Base/fetch")
def get_base_category(db: Session = Depends(get_db)):
    categories = db.query(BaseCategory).all()
    result = []
    for cat in categories:
        result.append({
            "id": cat.id,
            "CategoryName": cat.CategoryName,
            "subcategories": [
                {"id": sub.id, "CategoryName": sub.CategoryName} for sub in cat.subcategories
            ]
        })
    return result


@routerCategory.get("/sub/fetch")
def get_sub_category(db: Session = Depends(get_db)):
    subcategories = db.query(SubCategory).all()
    result = []
    for sub in subcategories:
        result.append({
            "id": sub.id,
            "CategoryName": sub.CategoryName,
            "base": {
                "id": sub.basecategory.id,
                "CategoryName": sub.basecategory.CategoryName
            } if sub.basecategory else None
        })
    return result


# ------------------- SEARCH -------------------

@routerCategory.get("/base/search")
def search_base_category(name: str = Query(..., description="Name or part of name to search"), 
                         db: Session = Depends(get_db)):
    results = db.query(BaseCategory).filter(BaseCategory.CategoryName.ilike(f"%{name}%")).all()
    return [
        {
            "id": cat.id,
            "CategoryName": cat.CategoryName,
            "subcategories": [
                {"id": sub.id, "CategoryName": sub.CategoryName} for sub in cat.subcategories
            ]
        } for cat in results
    ]


@routerCategory.get("/sub/search")
def search_sub_category(name: str = Query(..., description="Name or part of name to search"), 
                        db: Session = Depends(get_db)):
    results = db.query(SubCategory).filter(SubCategory.CategoryName.ilike(f"%{name}%")).all()
    return [
        {
            "id": sub.id,
            "CategoryName": sub.CategoryName,
            "base": {
                "id": sub.basecategory.id,
                "CategoryName": sub.basecategory.CategoryName
            } if sub.basecategory else None
        } for sub in results
    ]



# ------------------- DELETE -------------------

@routerCategory.delete("/base/delete/{category_id}")
def delete_base_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(BaseCategory).filter(BaseCategory.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Base category not found")
    
    # Delete all subcategories of this base
    db.query(SubCategory).filter(SubCategory.base_id == category_id).delete(synchronize_session=False)
    
    # Delete the base category
    db.delete(category)
    db.commit()
    
    return {"detail": f"Base category {category.CategoryName} and all its subcategories deleted successfully"}


@routerCategory.delete("/sub/delete/{subcategory_id}")
def delete_sub_category(subcategory_id: int, db: Session = Depends(get_db)):
    subcategory = db.query(SubCategory).filter(SubCategory.id == subcategory_id).first()
    if not subcategory:
        raise HTTPException(status_code=404, detail="Subcategory not found")
    db.delete(subcategory)
    db.commit()
    return {"detail": f"Subcategory {subcategory.CategoryName} deleted successfully"}
