from fastapi import APIRouter, Depends, HTTPException, status

from app.database.mongodb import users_collection
from app.schemas.auth import RegisterRequest, LoginRequest
from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)
from app.utils.auth import get_current_user


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


# =========================
# REGISTER
# =========================

@router.post("/register")
def register(data: RegisterRequest):

    # Check if email already exists
    existing_user = users_collection.find_one({
        "email": data.email
    })

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create user
    user = {
        "name": data.name,
        "email": data.email,
        "password_hash": hash_password(data.password)
    }

    # Save user to MongoDB
    result = users_collection.insert_one(user)

    return {
        "message": "Registration successful",
        "user_id": str(result.inserted_id)
    }


# =========================
# LOGIN
# =========================

@router.post("/login")
def login(data: LoginRequest):

    # Find user
    user = users_collection.find_one({
        "email": data.email
    })

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Verify password
    password_valid = verify_password(
        data.password,
        user["password_hash"]
    )

    if not password_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Create JWT
    access_token = create_access_token(
        str(user["_id"])
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        }
    }


# =========================
# CURRENT USER
# =========================

@router.get("/me")
def get_me(
    current_user=Depends(get_current_user)
):

    return {
        "id": str(current_user["_id"]),
        "name": current_user["name"],
        "email": current_user["email"]
    }