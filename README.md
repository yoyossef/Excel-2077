# Excel 2077

Projet M2 SIL: Visualisation  & traitement de données en VR

#Sommaire

* [Prérequis](#prérequis)
* [Installation du projet](#installation-du-projet)
* [Lancement](#lancement)
* [Utilisation](#utilisation)

## Prérequis
* Node
* Gestionnaire de paquets npm
* L'URL d'une instance accessible de notre API RServer (https://git.unistra.fr/projet-master/rserver)
* SteamVR (si l'accès est fait depuis un PC)
* Navigateur compatible avec la WebXR Device API

## Compatibilités
Casques et manettes compatibles avec le framework A-frame utilisé :
![compatible_headsets.png](./readme_images/compatible_headsets.png)
(source: https://aframe.io/docs/1.1.0/introduction/vr-headsets-and-webvr-browsers.html)

La technologie utilise la WebXR Device API, le navigateur web utilisé doit être compatible avec cette dernière. Nous conseillons une version récente de Mozilla Firefox ou Google Chrome sous Windows (**WebXR n'est pas supporté sous système Linux**).

## Installation du projet

### Installation des dépendances
Lancez la commande :
```bash
npm install
```

### Configuration
Compléter le fichier ./src/.env.js afin qu'il corresponde à la configuration voulue :
```js
export const config = {
    RSERVER_URL:"http://localhost:3000/", // !! Must contain the final '/'
    DATASET:"custom_dataset.csv" //Server will load file "[...]/rserver/{DATASET}"
};
```
* La variable **RSERVER_URL** correspond à l'url de l'instance du RServer, cette url **doit comporter le '/' final** afin de garantir le bon fonctionnement.
* La variable **DATASET** correspond au chemin du fichier présent dans le RServer que l'on souhaite charger, **ce chemin est à définir par rapport à la racine du projet RServer**. Par exemple :
    * `DATASET:"custom_dataset.csv"` chargera `rserver/custom_dataset.csv`
    * `DATASET:"my_datasets/another_dataset.csv"` chargera `rserver/my_datasets/another_dataset.csv`

## Lancement
Lancez la commande :
```bash
npm start
```
Une fois terminé, le site est accessible à l'adresse `http://localhost:9000/`

## Utilisation
//TODO
