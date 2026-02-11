from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    branch = Column(String)
    skills = Column(String)   # "Python,React,SQL"
    placed = Column(String, default="No")
