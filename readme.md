# Caen-Line
Application sur la visualisation de donnée des lignes de transports à Caen
l'application est combiné :
- d'une base de donnée non traditionnelle fournissant du json
- d'un serveur nodejs avec socket.io pour servir les données
- d'une visualisation de données générée côté client avec D3.js

# Vidéo
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/WRVSQk1M_RE/0.jpg)](https://www.youtube.com/watch?v=WRVSQk1M_RE)

# Lancement
- Instaler un serveur mongodb en local. ( si différent de localhost, modifier son adresse dans le fichier framework/server.js )
- creer une base dbMongo et une table twistoLine
- Importer crawler/twisto.json dans twistoLine
- Installer les dépendances de l'application avec la commande : npm install
- Lancer le serveur avec la commande : node framework/server.js

# Auteur
- ABDOU Abdoul-Hafarou
- BARRY Mamadou Dara