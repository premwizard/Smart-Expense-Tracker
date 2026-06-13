from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
import uuid
from ..schemas import User, TransactionCreate, TransactionUpdate
from ..dependencies import get_current_user
from ..mock_db import mock_storage

router = APIRouter()

@router.get("/")
def get_transactions(
    category: Optional[str] = None,
    search: Optional[str] = None,
    user: User = Depends(get_current_user)
):
    expenses = mock_storage["expenses"]
    if category:
        expenses = [e for e in expenses if e.get("category") == category]
    if search:
        expenses = [e for e in expenses if search.lower() in e.get("title", "").lower()]
    return sorted(expenses, key=lambda x: x.get("date", ""), reverse=True)

@router.get("/recent")
def get_recent_transactions(user: User = Depends(get_current_user)):
    expenses = sorted(mock_storage["expenses"], key=lambda x: x.get("date", ""), reverse=True)
    # The express app maps to select('title,category,amount,date') limit(4)
    # Since we are returning the full object here, it will have more fields but that's generally fine.
    return expenses[:4]

@router.post("/", status_code=201)
def create_transaction(req: TransactionCreate, user: User = Depends(get_current_user)):
    expense = req.model_dump()
    expense["id"] = str(uuid.uuid4())
    expense["user_id"] = user.id
    expense["date"] = expense["date"].isoformat()
    mock_storage["expenses"].append(expense)
    return expense

@router.put("/{id}")
def update_transaction(id: str, req: TransactionUpdate, user: User = Depends(get_current_user)):
    for expense in mock_storage["expenses"]:
        if expense["id"] == id and expense["user_id"] == user.id:
            updates = req.model_dump(exclude_unset=True)
            if "date" in updates:
                updates["date"] = updates["date"].isoformat()
            expense.update(updates)
            return expense
    raise HTTPException(status_code=404, detail="Transaction not found")

@router.delete("/{id}", status_code=204)
def delete_transaction(id: str, user: User = Depends(get_current_user)):
    mock_storage["expenses"] = [e for e in mock_storage["expenses"] if not (e["id"] == id and e["user_id"] == user.id)]
    return None
