# iim-a3-cordova-ionic
Starter for Ionic &amp; Cordova class — IIM A3


Pré-requis

sudo npm i -g cordova ionic ios-sim ios-deploy

Testing

sudo cordova platform add android
gulp -r android

sudo cordova platform add ios
gulp -b ios
ionic run ios --device

1 Prendre une photo 

http://learn.ionicframework.com/formulas/cordova-camera/

2. Enregistrer la photo en local

http://learn.ionicframework.com/formulas/localstorage/

3. Enregistrer localisation photo

http://ngcordova.com/docs/plugins/geolocation/

=> getCurrentPosition

4. Convertir long/lat en adresse en utilisant l'API google Maps

https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding

5. Enregistrer la date à laquelle la photo à été prise (format Timeago)

https://github.com/yaru22/angular-timeago

6. Long press déclenche la possibilité de share sur Facebook / Twitter / Sms

http://ionicframework.com/docs/api/directive/onHold/
http://ngcordova.com/docs/plugins/socialSharing/


Pour aller plus loin

7. Tap sur un element de la liste ouvre une nouvelle page (details/:id) sur laquelle d'autres informations peuvent être ajoutées à l'item:
	- Type d'endroit (restaurant, bar, musée...)
	- Note (entre 0 et 5 étoiles)
	- Description

8. Modal de filtres : Système de filtre permetant de trier par type d'element, note etc...

9. La page détail affiche la distance et le temps de trajet pour aller à l'endroit sélectionné 

https://developers.google.com/maps/documentation/directions/intro#DirectionsRequests

9. La page détail affiche la distance et le temps de trajet pour aller à l'endroit sélectionné 

Même chose que précédemment, avec le paramêtre transit
