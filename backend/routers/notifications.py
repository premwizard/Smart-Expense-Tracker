from fastapi import APIRouter, Depends
from ..schemas import User
from ..dependencies import get_current_user
from ..mock_db import mock_storage

router = APIRouter()

@router.get("/")
def get_notifications(user: User = Depends(get_current_user)):
    user_notifications = [n for n in mock_storage["notifications"] if n.get("user_id") == user.id]
    return sorted(user_notifications, key=lambda x: x.get("created_at", ""), reverse=True)

@router.post("/mark-read")
def mark_read(user: User = Depends(get_current_user)):
    for notification in mock_storage["notifications"]:
        if notification.get("user_id") == user.id and not notification.get("read"):
            notification["read"] = True
    return {"message": "All notifications marked as read."}
