from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.placement import PlacementRound

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def add_round(
    student_name: str,
    company_name: str,
    round_name: str,
    status: str,
    db: Session = Depends(get_db)
):
    r = PlacementRound(
        student_name=student_name,
        company_name=company_name,
        round_name=round_name,
        status=status
    )
    db.add(r)
    db.commit()
    return {"message": "Round updated"}

@router.get("/")
def get_rounds(db: Session = Depends(get_db)):
    return db.query(PlacementRound).all()
