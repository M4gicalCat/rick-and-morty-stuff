# Adresse email 
`philippefaisandier@gmail.com`


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