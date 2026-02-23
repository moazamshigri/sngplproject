from pydantic import BaseModel
from typing import Optional

class CardSchema(BaseModel):
    title: str
    description: str
    button_text: str
    logo: Optional[str] = None
    category :str
    order : Optional[int] = None
    link: str
    class Config:
        orm_mode = True


class CardUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    button_text: Optional[str]
    logo: Optional[str]
    category: Optional[str]
    link: Optional[str]
    order: Optional[int]



class BaseCategoryCreate(BaseModel):
    CategoryName: str

class SubCategoryCreate(BaseModel):
    CategoryName: str
    base_id: int
