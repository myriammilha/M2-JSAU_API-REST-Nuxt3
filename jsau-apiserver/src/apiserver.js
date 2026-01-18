'use strict'
const express = require('express')
const app = express()
app.use(express.json())
const port = 8081
const fs = require('fs').promises
const path = require('path')
const morgan = require('morgan')
app.use(morgan('dev'))
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})
const {env} = require('node:process')
const repositoryPath = env.JSAU_REPOSITORY_FILE_PATH

if (!repositoryPath) {
    throw new Error('❌ ERROR: La variable d_environnement JSAU_REPOSITORY_FILE_PATH est manquante !')
}

const fileHtml = path.join(repositoryPath, 'html')
const fileJson = path.join(repositoryPath, 'json')
const jsonPath = path.join(fileJson, 'data.json')

// Création automatique de la structure minimale
const createRepositoryStructureIfNeeded = async() => {
    const imagesPath = path.join(fileHtml, 'images')
    try {
        // Créer les dossiers nécessaires en parallèle
        await Promise.all([
            fs.mkdir(imagesPath, {recursive: true}),
            fs.mkdir(fileJson, {recursive: true})
        ])

        // Créer le fichier JSON s’il n’existe pas
        try {
            await fs.access(jsonPath)
        } catch {
            await fs.writeFile(jsonPath, '[]', 'utf-8')
        }
    } catch (err) {
        console.error('❌ Erreur lors de la création automatique de la structure jsau-data :', err)
    }

    // Création de fichiers HTML par défaut
    const defaultFiles = [
        {
            path: path.join(fileHtml, 'Coree_France.html'),
            content: `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Corée - France</title>
        </head>
        <body>
            <h1>Match : Corée vs France</h1>
            <p>Contenu généré automatiquement.</p>
        </body>
    </html>`
        },
        {
            path: path.join(fileHtml, 'Maroc_Albanie.html'),
            content: `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Maroc - Albanie</title>
        </head>
        <body>
            <h1>Match : Maroc vs Albanie</h1>
            <p>Contenu généré automatiquement.</p>
        </body>
    </html>`
        }
    ]
    // eslint-disable-next-line no-await-in-loop
    for (const file of defaultFiles) {
        try {
            await fs.access(file.path)
        } catch {
            await fs.writeFile(file.path, file.content.trim(), 'utf-8')
        }
    }
}
createRepositoryStructureIfNeeded()

app.use('/images', express.static(path.join(fileHtml, 'images')))

app.get('/', (req, res) => {
    res.send('Bienvenue dans cette application')
})
/* la fonction callBack */
app.use('/info', (req, res) => {
    const handleInfo = (callback) => {
        const appInfo = 'jsau-apiserver-1.0.0'
        callback(null, appInfo)
    }
    handleInfo((err, data) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send(data)
        }
    })
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // ✅ Autorise toutes les origines
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

// async-promise-then
app.get('/search', async(req, res) => {
    await createRepositoryStructureIfNeeded()
    const query = req.query.text
    if (!query) {
        return res.sendStatus(400)
    } else {
        const filepath = path.join(fileHtml, '/', query.endsWith('.html') ? query : query + '.html')
        console.log('🔍 Chemin du fichier recherché :', filepath)
        fs.access(filepath)
            .then(() => {
                return res.sendFile(filepath)
            })
            .catch((err) => {
                if (err.code == 'ENOENT') {
                    return res.sendStatus(404)
                } else {
                    return res.sendStatus(500)
                }
            })
    }
})

//async-promise-async-await
app.get('/documents/:filename', async(req, res) => {
    await createRepositoryStructureIfNeeded()
    const filename = req.params.filename
    const filepath = path.join(fileHtml, filename)

    try {
        await fs.access(filepath)
        // 🔹 Vérifie si c'est une image et change le Content-Type
        if (/\.(jpg|jpeg|png|gif|webp|avif)$/i.test(filename)) {
            return res.sendFile(filepath)
        }
        // 🔹 Sinon, c'est un fichier HTML -> on le télécharge
        return res.download(filepath, filename, (err) => {
            if (err) {
                return res.sendStatus(500)
            }
        })
    } catch {
        return res.sendStatus(404)
    }
})

//async-promise-async-await
app.post('/favorites/:filename', async(req, res) => {
    await createRepositoryStructureIfNeeded()
    const filename = req.params.filename
    if (!filename.endsWith('.html') || !filename) {
        return res.sendStatus(400)
    }
    try {
        const filePath = path.join(fileHtml, filename)
        try {
            await fs.access(filePath)
        } catch {
            return res.sendStatus(404)
        }
        let favorites = []
        try {
            const data = await fs.readFile(jsonPath, 'utf-8')
            favorites = JSON.parse(data)
        } catch {

            favorites = []
        }
        if (!favorites.includes(filename)) {
            const newFavorites = {
                filename,
                id:favorites.length + 1
            }
            favorites.push(newFavorites)
            await fs.writeFile(jsonPath, JSON.stringify(favorites, null, 2))
            return res.json({message: `File ${filename} added to favorites`, favorites})
        } else {
            return res.json({message: `File ${filename} is already in favorites`, favorites})
        }
    } catch (error) {
        return res.sendStatus(500)
    }
})
//async-promise-async-await
// Route pour afficher tous les fichiers favoris

app.get('/favorites', async(req, res) => {
    await createRepositoryStructureIfNeeded()
    try {
    // Lire le fichier favorites.json
        let favorites = []
        try {
            const data = await fs.readFile(jsonPath, 'utf8')
            favorites = JSON.parse(data) // Parse les données JSON
        } catch (err) {
            if (err.code === 'ENOENT') {
                // Si le fichier n'existe pas, renvoyer un tableau vide
                favorites = []
            } else {
                throw err // Autres erreurs
            }
        }

        res.json(favorites) // Renvoyer les favoris au frontend
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris :', error)
        res.sendStatus(500) // Erreur interne
    }
})

//async-promise-async-await
app.delete('/favorites/:id', async(req, res) => {
    await createRepositoryStructureIfNeeded()
    const id = parseInt(req.params.id, 10)

    try {
        const data = await fs.readFile(jsonPath, 'utf-8')
        const favorites = JSON.parse(data)

        const favoriteIndex = favorites.findIndex(fav => fav.id === id)
        if (favoriteIndex !== -1) {
            favorites.splice(favoriteIndex, 1)
            await fs.writeFile(jsonPath, JSON.stringify(favorites, null, 2), 'utf-8')
            return res.status(200).send(`File with ID ${id} removed from favorites.\n`)
        } else {
            return res.sendStatus(404)
        }
    } catch (error) {
        return res.sendStatus(500)
    }
})

let server
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

module.exports = {app, server, repositoryPath}

console.log('JSAU_REPOSITORY_FILE_PATH:', repositoryPath)
console.log('Chemin des fichiers HTML:', fileHtml)
