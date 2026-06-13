from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, datetime

class User(BaseModel):
    id: str
    email: str

class SignUpRequest(BaseModel):
    email: str
    password: str

class SignInRequest(BaseModel):
    email: str
    password: str

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    preferred_theme: Optional[str] = None

class TransactionCreate(BaseModel):
    title: str
    amount: float = Field(..., ge=0)
    category: str
    date: date
    notes: Optional[str] = None

class TransactionUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = Field(None, ge=0)
    category: Optional[str] = None
    date: Optional[date] = None
    notes: Optional[str] = None

class BudgetCreate(BaseModel):
    name: str
    amount: float = Field(..., ge=0)
    start_date: date
    end_date: date
    category: Optional[str] = None

class BudgetUpdate(BaseModel):
    name: Optional[str] = None
    amount: Optional[float] = Field(None, ge=0)
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    category: Optional[str] = None

class ReportExport(BaseModel):
    type: str

class AIQuery(BaseModel):
    prompt: str
