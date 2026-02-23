from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, Base, engine
from sqlalchemy.orm import Session
from models import Card
from schemas import CardSchema
from routers.login import routerLogin
from routers.Card import routerCard
from routers.Categories import routerCategory

app = FastAPI()
app.include_router(routerLogin)
app.include_router(routerCard)
app.include_router(routerCategory)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()





