from fastapi import Depends, HTTPException, Header
from typing import Optional
from .schemas import User

def get_current_user(authorization: Optional[str] = Header(None)) -> User:
    if not authorization:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    # Mocking user retrieval from token
    return User(id="local-user", email="local@example.com")
