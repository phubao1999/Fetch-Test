from fastapi import FastAPI

from app.server.routes.brand import router as BrandRouter

app = FastAPI()

app.include_router(BrandRouter, tags=["Brand"], prefix="/brand")


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}
