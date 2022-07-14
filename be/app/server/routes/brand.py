from fastapi import APIRouter, Body
from typing import Union
from fastapi.encoders import jsonable_encoder

from app.server.database import (
    add_brand,
    retrieve_brands,
    retrieve_brand,
    update_brand,
    delete_brand,
    search_brands
)

from app.server.models.brand import (
    ErrorResponseModel,
    ResponseModel,
    BrandSchema,
    UpdateBrandModel,
)

router = APIRouter()


@router.post("/", response_description="Brand data added into the database")
async def add_brand_data(brand: BrandSchema = Body(...)):
    brand = jsonable_encoder(brand)
    new_brand = await add_brand(brand)
    return ResponseModel(new_brand, "Brand added successfully.")


@router.get("/", response_description="Brands retrieved")
async def get_brands(search: Union[str, None] = None):
    if search:
        brands = await search_brands(search)
    else:
        brands = await retrieve_brands()
    if brands:
        return ResponseModel(brands, "Brands data retrieved successfully")
    return ResponseModel(brands, "Empty list returned")


@router.get("/{id}", response_description="Brand data retrieved")
async def get_brand_data(id):
    brand = await retrieve_brand(id)
    if brand:
        return ResponseModel(brand, "Brand data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "Brand doesn't exist.")


@router.put("/{id}")
async def update_brand_data(id: str, req: UpdateBrandModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    updated_brand = await update_brand(id, req)
    if updated_brand:
        return ResponseModel(
            "Brand with ID: {} name update is successful".format(id),
            "Brand name updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the brand data.",
    )


@router.delete("/{id}", response_description="Brand data deleted from the database")
async def delete_brand_data(id: str):
    deleted_brand = await delete_brand(id)
    if deleted_brand:
        return ResponseModel(
            "Brand with ID: {} removed".format(
                id), "Brand deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "Brand with id {0} doesn't exist".format(
            id)
    )
