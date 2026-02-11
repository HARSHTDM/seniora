from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Drive(Base):
    __tablename__ = "drives"

    id = Column(Integer, primary_key=True)
    company = Column(String)
    date = Column(String)
    status = Column(String)  # Upcoming / Ongoing / Completed
