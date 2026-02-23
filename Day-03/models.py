from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    button_text = Column(String, nullable=False)
    logo = Column(String, nullable=True)  # optional, in case some cards don't have it
    category = Column(String, nullable=False) 
    link = Column(String, nullable=False) 
    order = Column(Integer, default=0)  # <- This is the new column

class Login(Base):
    __tablename__ = "login"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False)
    HashedPassword = Column(String, nullable=False)


class BaseCategory(Base):
    __tablename__ = "basecategory"
    
    id = Column(Integer, primary_key=True, index=True)
    CategoryName = Column(String, unique=True, nullable=False)

    # Add cascade delete here
    subcategories = relationship(
        "SubCategory",
        back_populates="basecategory",
        cascade="all, delete",  # <- deletes all related subcategories
        passive_deletes=True
    )


class SubCategory(Base):
    __tablename__ = "subcategory"

    id = Column(Integer, primary_key=True, index=True)
    CategoryName = Column(String, nullable=False)
    base_id = Column(
        Integer,
        ForeignKey("basecategory.id", ondelete="CASCADE"),  # <- database-level cascade
        nullable=False
    )

    basecategory = relationship("BaseCategory", back_populates="subcategories")
