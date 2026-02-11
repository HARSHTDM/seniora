# 🎓 Placement Management & Student Skill Tracking System

A modern web application for colleges and universities to track placement rounds, student skills, and company recruitment processes.

## 🚀 Tech Stack

**Backend:** FastAPI, PostgreSQL, SQLAlchemy  
**Frontend:** React, Vite, TailwindCSS

## 📁 Project Structure
```
placement-tracking-system/
├── backend/          # FastAPI backend
└── frontend/         # React frontend
```

## ⚙️ Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Configure DATABASE_URL in .env
alembic upgrade head
uvicorn app.main:app --reload
```

**Runs on:** `http://localhost:8000`  
**API Docs:** `http://localhost:8000/docs`

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Set VITE_API_URL in .env
npm run dev
```

**Runs on:** `http://localhost:5173`

## 🎯 Features

- Placement round tracking
- Student skill assessment
- Company management & eligibility criteria
- Analytics & reporting
- Drive scheduling
- Role-based access (Admin, TPO, Student)

## 📝 Environment Variables

**Backend (.env):**
```
DATABASE_URL=postgresql://user:password@localhost/placement_db
SECRET_KEY=your-secret-key
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:8000/api/v1
```

## 📄 License

MIT
