# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine

# =======================
# AUTH MODULE
# =======================
from app.api.v1 import auth


# =======================
# CORE ENTITIES
# =======================
from app.api.v1.students import router as student_router
from app.api.v1.companies import router as company_router
from app.api.v1.drives import router as drive_router


# =======================
# PLACEMENT WORKFLOW
# =======================
from app.api.v1.placements import router as round_router
from app.api.v1.final_selection import router as final_router


# =======================
# ANALYTICS & DASHBOARD
# =======================
from app.api.v1.analytics import router as analytics_router


# =======================
# APP INITIALIZATION
# =======================
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Placement Management System API")


# =======================
# CORS (for React frontend)
# =======================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =======================
# ROUTES REGISTRATION
# =======================

# Auth
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])

# Core modules
app.include_router(student_router, prefix="/api/students", tags=["Students"])
app.include_router(company_router, prefix="/api/companies", tags=["Companies"])
app.include_router(drive_router, prefix="/api/drives", tags=["Drives"])

# Placement flow
app.include_router(round_router, prefix="/api/rounds", tags=["Placement Rounds"])
app.include_router(final_router, prefix="/api/final", tags=["Final Selection"])

# Analytics
app.include_router(analytics_router, prefix="/api/analytics", tags=["Analytics"])


# =======================
# ROOT
# =======================
@app.get("/")
def root():
    return {"status": "API running"}
