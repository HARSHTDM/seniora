from fastapi import APIRouter, Depends, HTTPException
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
def mark_placed(student_name: str, company_name: str, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.name == student_name).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    student.placed = "Yes"
    student.placed_company = company_name
    db.commit()

    return {"message": f"{student_name} placed in {company_name}"}
