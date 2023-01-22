# Adresse email 
`philippefaisandier@gmail.com`

# Site de production
[Voir le site](https://rick.pfaisand.fr)

# Installation
## Prérequis
- Firebase
  - Créer un projet
  - Activer l'authentification par email et mot de passe
  - Activer une base de données en temps réel

```bash
cd /path/to/project
npm i
cp src/firebase/config.example.js src/firebase/config.js
# Ajoutez votre configuration dans le fichier src/firebase/config.js
npm run start
```

# Sujet du projet

Afin de reprendre tous les concepts abordés jusqu’à maintenant, réalisez seul le projet suivant. Il sera noté et à rendre pour le **6 janvier 2023**.

Les données de notre site viendront de l’API [https://rickandmortyapi.com/documentation](https://rickandmortyapi.com/documentation)

Vous utiliserez Bootstrap ou Tailwindcss pour mettre votre site en forme, libre à vous de créer un design sympa tant que le site est responsive. [https://react-bootstrap.github.io/getting-started/introduction](https://react-bootstrap.github.io/getting-started/introduction)

Le but est de réaliser un blog sur la série Rick et Morty, nous aurons des pages dédiées aux épisodes, aux personnages et un espace favoris

La notation sera sur 10 points, un deuxième partie sera réalisée plus tard :

| Responsive / Design | 1 points |
|---------------------|----------|
| Accueil             | 2 points |
| Épisode             | 2 points |
| Personnage          | 2 points |
| Favoris             | 3 points |

### Page d’accueil

- Menu en haut de page (présent sur tout le site)
    - Favoris
    - Épisodes
- Liste des 5 personnages aléatoires
    - Nom
    - Miniature
    - Lien sur la fiche
    - Bouton favoris (enregistrement en cookie)
        - Icône 🤍 vide si pas en favoris / Icône ❤️ si déjà en favoris
        - Le clic sur le bouton change le statut favori du personnage
- Si des favoris sont enregistrés en cookies
    - Liste des 5 favoris les plus récents
        - Nom
        - Miniature
        - Lien sur la fiche
        - Bouton favoris (enregistrement en cookie)
            - Icône 🤍 vide si pas en favoris / Icône ❤️ si déjà en favoris
            - Le clic sur le bouton change le statut favori du personnage

### Page épisode

- Nom
- Code
- Date
- Liste des personnages
    - Nom
    - Miniature
    - Lien sur la fiche
    - Bouton favoris (enregistrement en cookie)
        - Icône 🤍 vide si pas en favoris / Icône ❤️ si déjà en favoris
        - Le clic sur le bouton change le statut favori du personnage

### Page personnage

- Nom
- Statut
- Sexe
- Type
- Origine (Location)
    - Nom
    - Image (en tout petit)
- Image
- Liste des épisodes (Sous forme de tableau)
    - Code
    - Nom
    - Date
    - Lien sur la fiche
- Bouton favoris (enregistrement en cookie)
    - Icône 🤍 vide si pas en favoris / Icône ❤️ si déjà en favoris
    - Le clic sur le bouton change le statut favori du personnage

### Page favoris

- Liste des personnages en favoris
    - Nom
    - Miniature
    - Lien sur la fiche
    - Bouton favoris (enregistrement en cookie)
        - Icône 🤍 vide si pas en favoris / Icône ❤️ si déjà en favoris
        - Le clic sur le bouton change le statut favori du personnage
- Si aucun favoris, message “Aucun favoris” + Lien sur la liste des épisodes

# TP 2

En utilisant le projet fait dans le TP1, ajoutez les fonctionnalités suivantes :

- Page d’inscription
    - Formulaire avec email (validation par regex), mot de passe (min 8 caractères)
- Page de connexion
    - Vérification de l’utilisateur dans la bdd (firebase ou nodejs)
- Page favoris
    - Cette page ne doit être accessible que si l’utilisateur est connecté.
    - Le bouton d’ajout en favoris ne doit être visible que si l’utilisateur est connecté
    - Le stockage des favoris doit se faire en bdd
- Tests
    - À l’aide de la librairie de test Jest, créez un test qui vérifie le bon fonctionnement du formulaire d’inscription. Le test doit vérifier qu’on ne peut pas envoyer le formulaire si les asserts ne sont pas validés

| Inscription | 2,5 points |
|-------------|------------|
| Connexion   | 2,5 points |
| Favoris     | 3 points   |
| Tests       | 2 points   |