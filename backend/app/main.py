# app/main.py
from fastapi import FastAPI
from app.core.database import Base, engine
from app.api.v1 import auth
from app.api.v1.students import router as student_router
from app.api.v1.companies import router as company_router
from app.api.v1.drives import router as drive_router
from app.api.v1.analytics import router as analytics_router
from app.api.v1.placements import router as round_router



Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(round_router, prefix="/api/rounds")
app.include_router(student_router, prefix="/api/students")
app.include_router(company_router, prefix="/api/companies")
app.include_router(drive_router, prefix="/api/drives")
app.include_router(analytics_router, prefix="/api/analytics")
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])

@app.get("/")
def root():
    return {"status": "API running"}
