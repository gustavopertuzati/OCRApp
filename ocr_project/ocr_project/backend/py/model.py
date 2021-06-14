import tensorflow as tf
import  numpy as np
from tensorflow.python.keras.backend import zeros    

def createModel():
    
    model = tf.keras.Sequential()
    model.add(tf.keras.layers.Input(shape=(20*20)))
    model.add(tf.keras.layers.Dense(128, activation=tf.nn.relu))
    model.add(tf.keras.layers.Dense(10, activation=tf.nn.softmax))
    model.compile(loss= "mse", optimizer='Adam')
    model.summary()
    return model

def trainModel(train_features, label_features):

    try:
        model = tf.keras.Model.load_model('ocr_model.h5')
    except:
        model = createModel()

    label = np.zeros(10).reshape((1,10))
    label[0][label_features] = 1
    train = np.reshape(train_features, (1, 400))
    model.fit(train, label, batch_size=1, epochs=2)
    model.save('ocr_model.h5')

def guessModel(guess_features):

    try:
        model = tf.keras.Model.load_model('ocr_model.h5')
    except:
        model = createModel()

    guess = np.reshape(guess_features, (1, 400))
    predict = model.predict(guess)[0, :]
    model.save('ocr_model.h5')
    return predict