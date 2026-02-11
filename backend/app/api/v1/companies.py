from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.company import Company

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def add_company(name: str, role: str, eligibility: str, db: Session = Depends(get_db)):
    c = Company(name=name, role=role, eligibility=eligibility)
    db.add(c)
    db.commit()
    return {"message": "Company added"}

@router.get("/")
def get_companies(db: Session = Depends(get_db)):
    return db.query(Company).all()
