from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from database import SessionLocal
from sqlalchemy.orm import Session
from models import Login
from Security import hash_password, verify_password


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class checkLogin(BaseModel):
    email: str
    password: str


routerLogin = APIRouter(prefix="/login", tags=["Login"])


@routerLogin.post("/")
def login(request: checkLogin, db: Session = Depends(get_db)):
    user = db.query(Login).filter(Login.email == request.email).first()

    if not user or not verify_password(request.password, user.HashedPassword):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    return {"message": "Login successful"}


@routerLogin.post("/signup")
def signin(email, password, db: Session = Depends(get_db)):
    if db.query(Login).filter(Login.email == email).first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cannot use this username"
        )

    new_user = Login(
        email=email,
        HashedPassword=hash_password(password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Signup successful", "user_id": new_user.id}
