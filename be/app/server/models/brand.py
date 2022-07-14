from typing import Optional

from pydantic import BaseModel, Field


class BrandSchema(BaseModel):
    brandName: str = Field(...)
    brandDescription: str = Field(...)
    brandLogo: str = Field(...)
    totalModel: int = Field(..., gt=0)
    status: str = Field(...)
    updateAt: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "brandName": "Toyota",
                "brandDescription": "Jeep Grand Cherokee",
                "brandLogo": "you image Src",
                "totalModel": 1200,
                "status": "Active",
                "updateAt": "25/12/2022"
            }
        }


class UpdateBrandModel(BaseModel):
    brandName: Optional[str]
    brandDescription: Optional[str]
    brandLogo: Optional[str]
    totalModel: Optional[int]
    status: Optional[str]
    updateAt: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "brandName": "Toyota",
                "brandDescription": "Jeep Grand Cherokee",
                "brandLogo": "you image Src",
                "totalModel": 1200,
                "status": "Active",
                "updateAt": "25/12/2022"
            }
        }


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}
