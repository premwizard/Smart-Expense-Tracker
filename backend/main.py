from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import (
    auth,
    profile,
    transactions,
    budgets,
    analytics,
    reports,
    notifications,
    ai
)

app = FastAPI(title="AI Expense Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])
app.include_router(transactions.router, prefix="/api/transactions", tags=["Transactions"])
app.include_router(budgets.router, prefix="/api/budgets", tags=["Budgets"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI"])

@app.get("/api/health")
def health_check():
    return {"status": "ok", "environment": "development"}
