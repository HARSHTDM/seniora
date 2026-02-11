from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    role = Column(String)
    eligibility = Column(String)
