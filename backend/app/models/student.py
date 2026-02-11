from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    branch = Column(String)
    skills = Column(String)
    placed = Column(String, default="No")     # Yes / No
    placed_company = Column(String, nullable=True)
