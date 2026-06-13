from fastapi import APIRouter, Depends, HTTPException
import uuid
from datetime import datetime
from schemas import User, ReportExport
from dependencies import get_current_user
from mock_db import mock_storage

router = APIRouter()

@router.get("/")
def get_reports(user: User = Depends(get_current_user)):
    user_reports = [r for r in mock_storage["reports"] if r.get("user_id") == user.id]
    return sorted(user_reports, key=lambda x: x.get("generated_at", ""), reverse=True)

@router.post("/export", status_code=201)
def export_report(req: ReportExport, user: User = Depends(get_current_user)):
    if req.type not in ["monthly", "yearly"]:
        raise HTTPException(status_code=400, detail="Report type must be monthly or yearly.")
    
    now = datetime.utcnow()
    period = now.strftime("%B %Y") if req.type == "monthly" else str(now.year)
    
    report = {
        "id": str(uuid.uuid4()),
        "user_id": user.id,
        "report_type": f"{req.type.capitalize()} Report",
        "period": period,
        "metadata": {"preparedAt": now.isoformat()},
        "download_url": None,
        "generated_at": now.isoformat()
    }
    mock_storage["reports"].append(report)
    return report
