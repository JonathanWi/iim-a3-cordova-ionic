# Places — Your favorite spots.

Nous allons réaliser au cours de cette semaine une application vous permettant d'enregistrer localement vos lieux favoris très simplement (une simple photo), puis en extraire, le lieu et - pour les plus téméraires - nous ajouterons : 

- Géolocalisation
- Partage social (SMS, Facebook, Twitter...)
- Moyen d'accès (métro, bus, etc..)
- Système de notation
- Filtre par type de lieu

Afin de réaliser cette application, nous utiliserons `Ionic` couplé à `cordova`, nous donnant ainsi accès à l'intégralité des fonctionnalités du téléphone.

# Pré-requis

### Genymotion

Genymotion est un emulateur Android. Pour ce cours, nous utiliserons principalement un émulateur pour tester notre application, évitant ainsi les différents problèmes liés à la possession - ou non - d'un smartphone.

Afin d'installer Genymotion, suivez les [instructions détaillées ici.](https://www.genymotion.com/#!/developers/user-guide)

````
/!\ Ceux qui souhaitent tester leur application sur iOS auront des pré-requis plus importants que ceux qui testerons sur Android. Je vous invite donc à travailler avec Genymotion et, dans le cas ou vous aurez assez avancé, je viendrai vous aider à deployer votre application sur iPhone.
````

Une fois Genymotion installé, installez et lancez le device virtuel suivant :  
`Google Nexus 5 — 4.4.4 — API 19 — 1080 x 1920`

### Cordova & Ionic 

Avant toutes choses, nous allons installer `cordova`, `ionic` et `ios-deploy`.

````
$ npm i -g cordova ionic ios-deploy
````

Une fois le repo téléchargé, `cd` **à la racine** et installez les dépendances grâce à  :

````
$ npm install
$ bower install
````

### JAVA & Android SDK

Nous allons maintenant installer le Java Runtime Environment (JRE). Pour ce faire rendez vous sur http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html et téléchargez le `Java SE Development Kit 7u79` pour votre `OS`.  
Une fois téléchargé, lancez le `.dmg` sur Mac ou le `.exe` pour Windows.

Installons maintenant le `SDK Android` qui nous permettra de build nos applications. Rendez- vous sur http://developer.android.com/sdk/index.html#Other et téléchargez le `SDK Tools Only` correspondant à votre `OS` (le `.exe` pour Windows, et le `.zip` pour Mac).

**Uniquement sur Mac :**  
Dézippez l'archive récupérée et déplacez le dossier `android-sdk-macosx` dans votre dossier `Documents`. Lancez ensuite le terminal est faites les commandes suivantes :

````
$ open -a TextEdit ~/.bash_profile
````

Dans le fichier nouvellement ouvert, ajoutez les lignes suivantes (en remplaçant `username` par le username de votre Mac) :

````
export ANDROID_HOME=/Users/username/Documents/android-sdk-macosx
export PATH=$ANDROID_HOME/tools:$PATH
````

Sauvegardez et fermez le fichier puis, dans le terminal, lancez :

````
$ source ~/.bash_profile
````
**Fin de l'étape supplémentaire**



###Pour vérifier que tout à fonctionné 

lancez dans votre terminal la commande :

````
$ android
````

Si une fenêtre contenant différentes version d'Android (*ex : Android 6.0 (API 23)*), vous êtes presque au bout de vos peines : Ouvrez la liste sous `Android 5.1.1 (API22)` et selectionnez `SDK Platform`, `Intel x86 Atom_64 System Image` et `Intel x86 Atom System Image`. Clickez ensuite sur `Install 3 Packages` puis `Accept License` et finalement `Install`.


### Testing

**Pour Android**

*Phase d'initialisation*  
À la racine du dossier, lancez les deux commandes suivantes :

````
$ gulp -b android
$ cordova platform add android
````

Afin de tester votre application - et avec votre téléphone Android branché ou le device Genymotion initialisé - faites ensuite :

````
$ gulp -r android
````

**Pour iOS**

*Phase d'initialisation*  
À la racine du dossier, lancez les deux commandes suivantes :

````
$ gulp -b ios
$ cordova platform add ios
````

À la différence d'Android, chaque fois que vous souhaiterez tester sur votre device iOS vous devrez lancer les deux commandes suivantes :

````
$ gulp -b ios
$ ionic run ios --device
````

Etant donné que l'application nécessite l'utilisation de l'appareil photo, il nous est impossible de faire nos tests en utilisant le simulateur iOS, celui-ci ne pouvant pas émuler un appareil photo (à la différence de Genymotion qui se servira de la webcam de votre ordinateur).

### Debugging

Par chance, grâce à Genymotion et Android, nous allons pouvoir débugger notre application à l'aide d'un outil que vous connaissez bien : La console chrome.

**Sur Genymotion**  
Allez dans `apps > Dev Settings`. Sur cette page activez le `USB debugging`.

**Sur Chrome**  
Tapez `about:inspect` comme url. Une fois votre application lancée, vous verrez apparaitre son nom (ici Places) dans la liste. Clickez alors sur `inspect` pour voir s'afficher la console chrome et les outils de débugging que vous connaissez (console js, mais aussi inspection d'element.)



# Exercice

### 1. Prendre une photo

*Ressource nécessaire pour cette partie.*  
http://learn.ionicframework.com/formulas/cordova-camera/

Dans cette première partie, le but est d'afficher une photo prise avec l'APN de votre smartphone/Genymotion.

**1.1 Créez le service `CameraService`**  
Dans le fichier `CameraService.js` dans le dossier `services`, créez la fonction `getPicture()` identique à celle présente dans le lien fournit ci-dessus. 

**1.2 Injection dans le `placesController`**  
Dans le fichier `placesController.js`, injectez le service `Camera` et créez une fonction `$scope.addPlace` de type :

````
$scope.addPlace = function() {
    Camera
  	.getPicture({ quality: 50, destinationType: Camera.DestinationType.DATA_URL}) // Ceci représentent les options passées à la camera. Il est important de ne pas les modifier.
  	.then(function(imageURI) {
  	    // imageURI contient la photo prise par l'APN en base64
        var img = "data:image/jpeg;base64," + imageURI; 

        // Il est important de faire précéder la photo de son type (base64) afin de l'afficher plus tard.
  	});
}
````

**1.3 Prendre une photo**  
Dans la vue `places.html` (dossier `templates/views/`), faites qu'un tap (voir `on-tap`) déclenche la fonction `$scope.addPlace()`. Si tout fonctionne, la console doit contenir un lien relatif vers la photo nouvellement prise.

**1.4 Afficher la photo prise**

Dans la vue `places.html`, ajoutez le code suivant au sein du `ion-content` :

````
<div class="list">
    <a class="item item-thumbnail-left" ui-sref="#">
      <img ng-src="{{picture}}">
      <h2>Adresse</h2>
      <p>Complément d'adresse</p>
      <p>Date</p>
    </a>
</div>
````

Dans le controller, une fois la photo prise, créez une variable `$scope.picture` qui contiendra la photo prise.
Si tout s'est bien passé, vous devez voir votre photo s'afficher !

### 2. Enregistrer la photo en localstorage

*Ressource nécessaire pour la question.*  
https://github.com/gsklee/ngStorage

````
Par soucis de simplicité, nous allons utiliser l'excellent `ngStorage` déjà inclu dans le projet. 
`ngStorage` stocke les données en `localStorage`, ce qui a pour inconvenient d'être limité à 5Mo. Pour un projet de plus grande ampleur, privilégiez des technologies telles que sqlite ou pouchdb pour cordova.
````

**2.1 Le service `$localStorage`**  
Injectez `$localStorage` dans le `PlacesController` et definissez une variable `$scope.$storage` ayant pour valeur `$localStorage` et prenant comme `$default` : `places: []` 


**2.2 Enregistrer la (les) photos en localStorage**  
Push les photos prisent par l'APN dans l'array `$scope.$storage.places` sous forme d'objet suivant le modèle suivant :

````
{img : '123.png'}
````

*Si tout s'est bien passé, vous ne devriez plus voir de photo dans la vue*

**2.3 Affichez les photos enregistrées**  
À l'aider de `ng-repeat` et de la variable `$scope.$storage.$places`, affichez les photos prisent avec l'APN.

*Bravo, vous avez créé votre première application appareil photo !*

**2.4 Clean le localstorage**  
Étant donné que nous allons régulièrement modifier les place afin de les enrichir de donnée, il est important que nous puissions vider notre `$localStorage` régulièrement. Pour ce faire, ajoutez le bouton suivant dans `places.html` avant le bouton `addPlace()`:
````
<ion-nav-buttons side="primary">
  <button class="button button-icon icon ion-ios-minus-empty" on-tap="clearPlaces()"></button>
</ion-nav-buttons>
````
Il ne nous reste plus qu'à créer la fonction `$scope.clearPlaces()` dans le `PlacesController`. Cette fonction aura pour simple action de remplacer l'objet `places` stocké en `$localStorage` par un array vide :

````
$localStorage.$reset({
  places: [],
  locations : {} // Nécessaire pour la bonne execution de l'application
});
````

### 3. Géolocaliser les photos

Dans cette partie, nous allons Géolocaliser les photos prises à l'aide du GPS du device !

Ajoutez le plugin de geolocalisation de cordova via :

````
$ cordova plugin add cordova-plugin-geolocation
````

**3.1 GeoLocation Service**  
Commençons par créer le `GeoLocationService.js` en copiant le code ci-dessous :

````
'use strict';

/**
 * @ngdoc function
 * @name Places.service:GeoLocation
 * @description
 * # GeoLocation
 */
angular.module('Places')
  // use 
  .factory('GeoLocation', ['$q', function($q) {
  	return {
  		getCurrentPosition: function() {
  			var q = $q.defer();
  			navigator.geolocation .getCurrentPosition(function (position) {
	        q.resolve(position);
	    }, function(err) {
	    	q.reject(err);
	    }, {enableHighAccuracy: true});

  			return q.promise;
  		}
  	}
}]);
````

**3.2 Obtenir la position actuelle**  
Injectez `GeoLocation` dans le `PlacesController` et, une fois la photo prise, récupérez la localisation de l'utilisateur à l'aide de la fonction `getCurrentPosition()` :

````
GeoLocation
.getCurrentPosition()
.then(function (position) {
    // Position nous permet de connaitre la latitude et longitude du device.
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
});
````

**3.3 Ajouter la localisation pour chaque photo**
Modifier la variable `place`, jusqu'alors de type `{img : '123.png'}` afin d'y ajouter la latitude et longitude de la photo : `var place = {img: '123.png', long : 12.09, lat : -8.01}`. Affichez alors, à la place de `adresse` dans la vue les `lat` et `long` relative à l'image.

### 4. Convertir long/lat en adresse en utilisant l'API google Maps

*Ressource nécessaire pour la question.*
https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding

````
Pour cette partie, et par soucis de simplicité, le service Geocoder est déjà créé.
````

**4.1 Récupérer l'addresse grâce à `Geocoder`**  
Injectez `Geocoder` dans le `PlacesController` et appelez la fonction `addressForLatLng()` comme suit :
```
Geocoder
.addressForLatLng(lat, long) // lat et long  étant les données récupérées précédemment.
.then(function(address){
    console.log(address);
});
```
**4.2 Analysez l'objet `address`**  
Le `Geocoder` retourne un objet addresse visible dans votre console. Analysez le afin de comprendre sa structure, et ajoutez alors les clés `street`, `city` et `country` à l'objet `place`. Votre objet doit alors ressembler à :

````
{
    img : "123.png",
    lat : -12.097,
    long : 8.04,
    street : "Rue de Courcelles",
    city : "75017 Paris",
    country : "France" 
}
````

Il ne vous reste plus qu'à afficher ces données dans la vue `places.html`.

*Bravo, vous avez créé une application appareil photo géolocalisé !*

### 5. Enregistrer la date à laquelle la photo à été prise (format Timeago)

*Ressource nécessaire pour la question.*  
https://github.com/yaru22/angular-timeago
https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date/now

```
TimeAgo n'est pas inclus dans le projet, à vous de faire bower install ainsi que d'injecter le module dans le fichier app.js
```

Ajoutez une `date` à l'objet `place`, et affichez là au format `timeAgo` à l'aide de `{{place.date | timeAgo}}`

### 6. Share sur Facebook / Twitter / SMS...

*Ressource nécessaire pour la question.*  
http://ionicframework.com/docs/api/directive/onHold/
http://ngcordova.com/docs/plugins/socialSharing/

**6.1 La fonction share()**  
Créez une fonction `$scope.share()` prenant en paramètre un `index`. À l'aide des ressources ci-dessus, faites en sorte que cette fonction déclenche `$cordovaSocialSharing.share()` avec comme paramètre :

````
message : 'Just discovered an awesome place',
object : place.street,
file: place.img
````

**6.2 On hold & share**  
À l'aide d'`on-hold`, faites en sorte qu'une pression longue sur une `place` déclenche le partage.


Si vous avez réussi à arriver ici, félicitations !  
Les questions suivantes représentent des améliorations possibles de l'application que j'espère vous voir réaliser. Pour ces questions, plus d'aide : **Seulement vous et google !**

# Pour aller plus loin

### 7. La page détail  
Faites en sorte que le `tap` sur un élément redirige vers une nouvelle page `places/:id` (avec `id` l'index de la `place`). 

### 8. Temps de trajet et distance
Sur cette nouvelle page, et grâce à l'API Google Maps (https://developers.google.com/maps/documentation/directions/intro#DirectionsRequests) affichez le chemin et le temps de trajet nécessaire pour se rendre à l'endroit selectionné depuis notre position.

### 9. Metro, bus, vélo...
Toujours grâce à l'API google maps, affichez le chemin le plus cours en transport pour se rendre à l'endroit voulu!

### 10. Plus d'informations
Ajoutez la possibilité d'editer la `place` selectioné et de l'enrichir des informations suivantes : 
- Nom du lieu
- Type d'endroit (restaurant, bar, musée...)
- Note (entre 0 et 5 étoiles)
- Description

### 11. Filtrer la liste
À l'aide d'un `modal` (http://ionicframework.com/docs/api/service/$ionicModal/), créez un système de filtre permetant de trier par type d'element, note, nom etc...

Si vous êtes arrivés jusque là, vous avez bien merité un peu de repos : 
http://candies.aniwey.net/


