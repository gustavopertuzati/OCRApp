import tensorflow as tf
import numpy as np
from tensorflow.python.keras.backend import zeros


def createModel():

    model = tf.keras.Sequential()
    model.add(tf.keras.layers.Input(shape=(20 * 20)))
    model.add(tf.keras.layers.Dense(128, activation=tf.nn.relu))
    model.add(tf.keras.layers.Dense(10, activation=tf.nn.softmax))
    model.compile(loss="mse", optimizer="Adam")
    model.summary()
    return model


def trainModel(train_features, label_features):

    # Vérification que le model existe
    try:
        model = tf.keras.Model.load_model("ocr_model.h5")
    except:
        model = createModel()

    # Stockage de la valeur récupérée dans un numpy array de une colonne et dix lignes
    label = np.zeros(10).reshape((1, 10))
    label[0][label_features] = 1

    # Stockage du canvas récupérée dans un numpy array de une colonne et 400 lignes
    train = np.reshape(train_features, (1, 400))

    # Entraînement et sauvegarde du model
    model.fit(train, label, batch_size=1, epochs=2)
    model.save("ocr_model.h5")


def guessModel(guess_features):

    # Vérification que le model existe
    try:
        model = tf.keras.Model.load_model("ocr_model.h5")
    except:
        model = createModel()
        model.save("ocr_model.h5")

    # Stockage du canvas récupérée dans un numpy array de une colonne et 400 lignes
    guess = np.reshape(guess_features, (1, 400))

    # Génération des prédictions pour l'entrée
    predict = model.predict(guess)[0, :]
    return predict
