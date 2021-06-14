# Projet de reconnaissance de caractères (OCR)
## Description du projet
Réalisation d'une application permettant d'utiliser un réseau de neurone pour créer un logiciel de reconnaissance de caractères

## Prérequis 
Ce projet utilise
```
- Poetry
- MyPy
- Node.js
- Uvicorn
```

## Récupérer le projet
Le projet est disponnible sur gitedu.hesge.ch, pour le récupérer localement il faut cloner le projet avec la commande suivante:
```
git clone ssh://git@ssh.hesge.ch:10572/visnum_jour_2021_labo_3/gustavo-pertuzati.git
```

## Installer les dépendances
Pour installer les dépendances du projet, il faut se rendre dans le dossier gustavo-pertuzati/ocr_project et utiliser la commande:
```
poetry install
```

## Lancer le serveur uvicorn
Pour démarrer le serveur uvicorn, il faut se rendre dans le dossier gustavo-pertuzati/ocr_project/ocr_project/backend/py et utiliser la commande:
```
poetry run uvicorn main:app --reload
```
À noter que le port 8000 ne doit pas être sous écoute

## Lancer le serveur node.js
Pour démarrer le serveur node.js, dans un autre terminal, il faut se rendre dans le dossier gustavo-pertuzati/ocr_project/ocr_project/backend et utiliser la commande:
```
poetry run npm install && npm start
```
À noter que le port 3306 ne doit pas être sous écoute

Vous pouvez ensuite vous rendre à l'adresse http://127.0.0.1:3306/index.html et tester le programme.

Il peut y a voir des erreurs de Cross-origin resource sharing sur certains moteurs de recherche (notamment Chrome et Firefox). Pour régler cela, il suffit d'installer une extension et de l'activer.\\
Pour Chrome: https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf\\
Pour Firefox: https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/
### Auteur
* Gustavo Pertuzati (gustavo.pertuzati@etu.hesge.ch)

