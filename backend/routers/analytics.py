from fastapi import APIRouter, Depends
from schemas import User
from dependencies import get_current_user
from mock_db import mock_storage

router = APIRouter()

@router.get("/summary")
def get_analytics_summary(user: User = Depends(get_current_user)):
    user_expenses = [e for e in mock_storage["expenses"] if e.get("user_id") == user.id]
    user_income = [i for i in mock_storage["income"] if i.get("user_id") == user.id]
    
    total_expense = sum([float(e.get("amount", 0)) for e in user_expenses])
    total_income = sum([float(i.get("amount", 0)) for i in user_income])
    
    return {
        "totalExpense": total_expense,
        "totalIncome": total_income,
        "savings": total_income - total_expense
    }
