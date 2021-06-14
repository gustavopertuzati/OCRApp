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

# Récupération de la valeur ainsi que du tableau de l'input de l'utilisateur
@app.post("/train/")
async def train_Ai(item: ItemValue):
    trainModel(item.tab, item.value)

# Envoi de la liste des prédicitons 
@app.post("/guess/")
async def guess_value(item: Item):
    content = guessModel(item.content).tolist()
    return JSONResponse(content)


