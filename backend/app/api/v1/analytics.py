from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.student import Student
from app.models.company import Company
from app.models.drive import Drive

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    total_students = db.query(Student).count()
    placed_students = db.query(Student).filter(Student.placed == "Yes").count()
    companies = db.query(Company).count()
    upcoming_drives = db.query(Drive).filter(Drive.status == "Upcoming").count()

    return {
        "total_students": total_students,
        "placed_students": placed_students,
        "companies": companies,
        "upcoming_drives": upcoming_drives
    }
