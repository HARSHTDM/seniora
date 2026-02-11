from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.student import Student
from app.models.company import Company
from app.models.drive import Drive
from app.models.placement import PlacementRound

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/kpis")
def kpi_stats(db: Session = Depends(get_db)):
    return {
        "total_students": db.query(Student).count(),
        "placed_students": db.query(Student).filter(Student.placed == "Yes").count(),
        "companies": db.query(Company).count(),
        "upcoming_drives": db.query(Drive).filter(Drive.status == "Upcoming").count()
    }

@router.get("/rounds")
def round_stats(db: Session = Depends(get_db)):
    rounds = ["Aptitude", "Technical", "HR"]
    data = {}

    for r in rounds:
        data[r] = {
            "cleared": db.query(PlacementRound)
                .filter(PlacementRound.round_name == r, PlacementRound.status == "Cleared")
                .count(),
            "rejected": db.query(PlacementRound)
                .filter(PlacementRound.round_name == r, PlacementRound.status == "Rejected")
                .count()
        }

    return data

@router.get("/companies")
def company_placements(db: Session = Depends(get_db)):
    companies = db.query(Company).all()
    result = []

    for c in companies:
        count = db.query(Student)\
            .filter(Student.placed_company == c.name).count()
        result.append({
            "company": c.name,
            "placed_students": count
        })
    return result

@router.get("/recent-placements")
def recent_placements(db: Session = Depends(get_db)):
    return db.query(Student)\
        .filter(Student.placed == "Yes")\
        .order_by(Student.id.desc())\
        .limit(5)\
        .all()

