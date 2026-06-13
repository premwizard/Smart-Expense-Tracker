from fastapi import APIRouter, Depends, HTTPException
import uuid
from ..schemas import User, AIQuery
from ..dependencies import get_current_user
from ..mock_db import mock_storage

router = APIRouter()

@router.post("/query")
def query_ai(req: AIQuery, user: User = Depends(get_current_user)):
    if not req.prompt:
        raise HTTPException(status_code=400, detail="Prompt is required.")
        
    response_text = "AI analysis ready: based on this prompt, your expenses are weighted heavily toward recurring categories; adjust your budget and savings recommendations accordingly."
    
    conv = {
        "id": str(uuid.uuid4()),
        "user_id": user.id,
        "prompt": req.prompt,
        "response": response_text,
        "category": "financial_insight"
    }
    mock_storage["ai_conversations"].append(conv)
    
    return {"prompt": req.prompt, "response": response_text}
