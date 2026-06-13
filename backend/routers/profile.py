from fastapi import APIRouter, Depends, HTTPException
from schemas import User, ProfileUpdate
from dependencies import get_current_user
from mock_db import mock_storage

router = APIRouter()

@router.get("/")
def get_profile(user: User = Depends(get_current_user)):
    profile = mock_storage["profiles"].get(user.id)
    if not profile:
        return {"id": user.id}
    return profile

@router.put("/")
def update_profile(req: ProfileUpdate, user: User = Depends(get_current_user)):
    profile = mock_storage["profiles"].get(user.id, {"id": user.id})
    if req.full_name is not None:
        profile["full_name"] = req.full_name
    if req.preferred_theme is not None:
        if req.preferred_theme not in ["dark", "light"]:
            raise HTTPException(status_code=400, detail="Invalid theme")
        profile["preferred_theme"] = req.preferred_theme
    
    mock_storage["profiles"][user.id] = profile
    return profile
