from fastapi import APIRouter, Depends, HTTPException
import uuid
from schemas import User, BudgetCreate, BudgetUpdate
from dependencies import get_current_user
from mock_db import mock_storage

router = APIRouter()

@router.get("/")
def get_budgets(user: User = Depends(get_current_user)):
    budgets = [b for b in mock_storage["budgets"] if b.get("user_id") == user.id]
    return sorted(budgets, key=lambda x: x.get("start_date", ""), reverse=True)

@router.post("/", status_code=201)
def create_budget(req: BudgetCreate, user: User = Depends(get_current_user)):
    budget = req.model_dump()
    budget["id"] = str(uuid.uuid4())
    budget["user_id"] = user.id
    budget["start_date"] = budget["start_date"].isoformat()
    budget["end_date"] = budget["end_date"].isoformat()
    mock_storage["budgets"].append(budget)
    return budget

@router.put("/{id}")
def update_budget(id: str, req: BudgetUpdate, user: User = Depends(get_current_user)):
    for budget in mock_storage["budgets"]:
        if budget["id"] == id and budget["user_id"] == user.id:
            updates = req.model_dump(exclude_unset=True)
            if "start_date" in updates:
                updates["start_date"] = updates["start_date"].isoformat()
            if "end_date" in updates:
                updates["end_date"] = updates["end_date"].isoformat()
            budget.update(updates)
            return budget
    raise HTTPException(status_code=404, detail="Budget not found")

@router.delete("/{id}", status_code=204)
def delete_budget(id: str, user: User = Depends(get_current_user)):
    mock_storage["budgets"] = [b for b in mock_storage["budgets"] if not (b["id"] == id and b["user_id"] == user.id)]
    return None
