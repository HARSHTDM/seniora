from sqlalchemy import Column, Integer, String
from app.core.database import Base

class PlacementRound(Base):
    __tablename__ = "placement_rounds"

    id = Column(Integer, primary_key=True)
    student_name = Column(String)
    company_name = Column(String)
    round_name = Column(String)   # Aptitude / Technical / HR
    status = Column(String)       # Cleared / Rejected / Pending
