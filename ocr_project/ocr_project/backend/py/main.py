from typing import List
from pydantic import BaseModel
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from model import trainModel, guessModel

app = FastAPI()


class Item(BaseModel):
    content: List[int]


class ItemValue(BaseModel):
    value: int
    tab: List[int]


@app.post("/guess/")
async def guess_value(item: Item):
    content = guessModel(item.content).tolist()
    return JSONResponse(content)


@app.post("/train/")
async def train_Ai(item: ItemValue):
    trainModel(item.tab, item.value)
