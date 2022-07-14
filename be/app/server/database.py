import motor.motor_asyncio
from decouple import config
from bson.objectid import ObjectId


MONGO_DETAILS = config("MONGO_DETAILS")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.brand

brand_collection = database.get_collection("brand_collection")


# Helper

def brand_helper(brand) -> dict:
    return {
        "id": str(brand["_id"]),
        "brandName": str(brand["brandName"]),
        "brandDescription": str(brand["brandDescription"]),
        "brandLogo": str(brand["brandLogo"]),
        "totalModel": int(brand["totalModel"]),
        "updateAt": str(brand["updateAt"]),
        "status": str(brand["status"]),
    }


async def add_brand(brand_data: dict) -> dict:
    brand = await brand_collection.insert_one(brand_data)
    new_brand = await brand_collection.find_one({"_id": brand.inserted_id})
    return brand_helper(new_brand)


async def retrieve_brands():
    brands = []
    async for brand in brand_collection.find():
        brands.append(brand_helper(brand))
    return brands


async def retrieve_brand(id: str) -> dict:
    brand = await brand_collection.find_one({"_id": ObjectId(id)})
    if brand:
        return brand_helper(brand)


async def update_brand(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    brand = await brand_collection.find_one({"_id": ObjectId(id)})
    if brand:
        updated_brand = await brand_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_brand:
            return True
        return False


async def delete_brand(id: str):
    brand = await brand_collection.find_one({"_id": ObjectId(id)})
    if brand:
        await brand_collection.delete_one({"_id": ObjectId(id)})
        return True
