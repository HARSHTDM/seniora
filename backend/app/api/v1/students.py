from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.student import Student

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def add_student(name: str, branch: str, skills: str, db: Session = Depends(get_db)):
    s = Student(name=name, branch=branch, skills=skills)
    db.add(s)
    db.commit()
    return {"message": "Student added"}

@router.get("/")
def get_students(db: Session = Depends(get_db)):
    return db.query(Student).all()
