# Caen-Line
Application sur la visualisation de donn�e des lignes de transports � Caen
l'application est combin� :
- d'une base de donn�e non traditionnelle fournissant du json
- d'un serveur nodejs avec socket.io pour servir les donn�es
- d'une visualisation de donn�es g�n�r�e c�t� client avec D3.js

# Vid�o
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/WRVSQk1M_RE/0.jpg)](https://www.youtube.com/watch?v=WRVSQk1M_RE)

# Lancement
- Instaler un serveur mongodb en local. ( si diff�rent de localhost, modifier son adresse dans le fichier framework/server.js )
- creer une base dbMongo et une table twistoLine
- Importer crawler/twisto.json dans twistoLine
- Installer les d�pendances de l'application avec la commande : npm install
- Lancer le serveur avec la commande : node framework/server.js

# Auteur
- ABDOU Abdoul-Hafarou
- BARRY Mamadou Dara