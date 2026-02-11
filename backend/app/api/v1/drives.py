from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.drive import Drive

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_drive(company: str, date: str, status: str, db: Session = Depends(get_db)):
    d = Drive(company=company, date=date, status=status)
    db.add(d)
    db.commit()
    return {"message": "Drive created"}

@router.get("/")
def get_drives(db: Session = Depends(get_db)):
    return db.query(Drive).all()
