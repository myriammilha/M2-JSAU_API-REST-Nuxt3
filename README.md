# Projet : Web App Nuxt 3 avec API Express - M2 JSAU

## Présentation du projet

Ce projet a été réalisé dans le cadre du cours **JSAU** à l’Université Sorbonne Paris Nord.
Il consiste à développer une **application web avec Nuxt 3** consommant une **API Express (`jsau-apiserver`)** via la **Fetch API**.

L’objectif est de démontrer la maîtrise des notions vues en cours :
architecture frontend / backend, requêtes HTTP, tests automatisés et CI/CD.

---

## Architecture du projet

Le projet est composé de **deux parties distinctes** :

### 🔹 Backend – `jsau-apiserver`

* API développée avec **Node.js + Express**
* Sert des fichiers HTML stockés localement
* Gère la recherche, l’affichage, le téléchargement et les favoris
* Tests automatisés avec **Jest** et **Supertest**
* Journalisation des requêtes avec **Morgan**

### 🔹 Frontend – `jsau-webhybrid-nuxt`

* Application web développée avec **Nuxt 3 (Vue.js)**
* Interagit avec l’API via la **Fetch API**
* Deux pages fonctionnelles :

  * `page1.vue` : recherche et affichage d’un fichier HTML
  * `page2.vue` : récupération et affichage d’un fichier HTML
* Tests automatisés avec **Jest**
* Pipeline **CI/CD GitLab**

---

## Installation et lancement

### 🔹 Lancer le backend (API Express)

#### Sans Makefile

```bash
cd jsau-apiserver
rm -rf node_modules package-lock.json coverage
npm install
export JSAU_REPOSITORY_FILE_PATH=./jsau-data
npm run start
```

L’API démarre sur :
👉 `http://localhost:8081`

#### Avec Makefile (recommandé)

Depuis la racine du projet :

```bash
make install-backend
make start-backend
make test-backend
```

---

### 🔹 Tester l’API avec curl (dans un autre terminal)

```bash
curl http://localhost:8081/
curl http://localhost:8081/info
curl "http://localhost:8081/search?text=Coree_France"
curl http://localhost:8081/documents/France.html
```

---

### 🔹 Lancer le frontend (Nuxt 3) dans un autre terminal

#### Sans Makefile

```bash
cd jsau-webhybrid-nuxt
rm -rf node_modules package-lock.json .nuxt .output coverage
npm install
npm run dev
```

#### Avec Makefile

```bash
make install-frontend
make start-frontend
```

L’application est accessible sur :
👉 `http://localhost:3000`

---

### 🔹 Nettoyage du projet

Depuis la racine :

```bash
make clean
```

---

## Fonctionnalités principales

### Backend (API)

| Méthode | Route                  | Description                        |
| ------- | ---------------------- | ---------------------------------- |
| GET     | `/`                    | Message de bienvenue               |
| GET     | `/info`                | Informations de l’application      |
| GET     | `/search?text=nom`     | Recherche d’un fichier HTML        |
| GET     | `/documents/:filename` | Téléchargement d’un fichier HTML   |
| POST    | `/favorites/:filename` | Ajout d’un fichier aux favoris     |
| DELETE  | `/favorites/:id`       | Suppression d’un favori par son ID |

### Frontend (Nuxt)

* Recherche de fichiers HTML
* Affichage dynamique du contenu HTML
* Téléchargement de fichiers HTML
* Gestion des erreurs (404, serveur indisponible)

---

## Tests et CI/CD

* Tests unitaires avec **Jest**
* Linting avec **ESLint**
* Pipeline **GitLab CI/CD** :

  * `install` → installation des dépendances
  * `test` → exécution des tests
  * `build` → compilation du projet

---

## Technologies utilisées

* **Backend** : Node.js, Express, Morgan
* **Frontend** : Nuxt 3, Vue.js, Fetch API
* **Tests** : Jest, Supertest
* **CI/CD** : GitLab CI
* **Outils** : npm, ESLint, Babel

---

## Objectif pédagogique

Ce projet vise à valider :

* la compréhension des architectures frontend / backend
* l’utilisation des API HTTP
* l’intégration d’un frontend Nuxt avec une API Express
* la mise en place de tests automatisés et d’une CI/CD fonctionnelle

---

## Auteure

Projet réalisé par **Myriam Milha**
Dans le cadre du cours **JSAU – Université Sorbonne Paris Nord**
