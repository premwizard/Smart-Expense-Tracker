from fastapi import APIRouter
from schemas import SignUpRequest, SignInRequest

router = APIRouter()

@router.post("/signup", status_code=201)
def signup(req: SignUpRequest):
    return {"user": {"id": "local-user", "email": req.email}}

@router.post("/signin")
def signin(req: SignInRequest):
    return {
        "session": {"access_token": "local-session-token"},
        "user": {"id": "local-user", "email": req.email}
    }
