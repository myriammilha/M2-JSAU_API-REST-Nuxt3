'use strict'
const request = require('supertest')
const {app, server, repositoryPath} = require('../src/apiserver')
const fs = require('fs').promises
const path = require('path')

describe('Tests du serveur API', () => {
    afterAll(() => {
        if (server) {
            server.close()
        }
    })

    test('GET / doit retourner un message de bienvenue', async() => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
        expect(res.text).toBe('Bienvenue dans cette application')
    })

    test('GET /info doit retourner les informations de l\'application', async() => {
        const res = await request(app).get('/info')
        expect(res.status).toBe(200)
        expect(res.text).toBe('jsau-apiserver-1.0.0')
    })

    test('GET /search avec une requête valide doit retourner un fichier', async() => {
        const query = 'test'
        const filepath = path.join(repositoryPath, 'html', `${query}.html`)
        await fs.writeFile(filepath, '<html>Fichier de test</html>', 'utf-8')
        console.log('✅ Fichier créé :', filepath)
        const res = await request(app).get(`/search?text=${query}`)
        expect(res.status).toBe(200)
        await fs.unlink(filepath)
    })

    test('GET /search avec une requête invalide doit retourner 404', async() => {
        const res = await request(app).get('/search?text=inexistant')
        expect(res.status).toBe(404)
    })

    test('GET /documents/:filename doit permettre de télécharger un fichier', async() => {
        const filename = 'test.html'
        const filepath = path.join(repositoryPath, 'html', filename)
        await fs.writeFile(filepath, '<html>Fichier téléchargeable</html>', 'utf-8')
        const res = await request(app).get(`/documents/${filename}`)
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toContain('text/html')
        await fs.unlink(filepath)
    })

    test('POST /favorites/:filename doit ajouter un fichier aux favoris', async() => {
        const filename = 'favori.html'
        const filepath = path.join(repositoryPath, 'html', filename)
        await fs.writeFile(filepath, '<html>Fichier favori</html>', 'utf-8')
        const res = await request(app).post(`/favorites/${filename}`)
        expect(res.status).toBe(200)
        expect(res.body.message).toContain(`File ${filename} added to favorites`)
        await fs.unlink(filepath)
    })

    test('DELETE /favorites/:id doit supprimer un fichier des favoris', async() => {
        const filename = 'supprimer.html'
        const filepath = path.join(repositoryPath, 'html', filename)
        const jsonPath = path.join(repositoryPath, 'json', 'data.json')
        await fs.writeFile(filepath, '<html>Fichier à supprimer</html>', 'utf-8')

        const favorites = [{id: 1, filename}]
        await fs.writeFile(jsonPath, JSON.stringify(favorites, null, 2), 'utf-8')

        const res = await request(app).delete('/favorites/1')
        expect(res.status).toBe(200)
        expect(res.text).toContain('removed from favorites')
        await fs.unlink(filepath)
    })
})
