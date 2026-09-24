from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.mongodb import db
from app.routes.auth import router as auth_router


app = FastAPI(
    title="ShopAI API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "ShopAI API is running 🚀"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/api/db-test")
def database_test():

    try:

        db.command("ping")

        return {
            "status": "success",
            "message": "MongoDB connected successfully 🚀"
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }