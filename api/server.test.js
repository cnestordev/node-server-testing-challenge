const server = require('./server')

const supertest = require('supertest')

describe('manage resources from db', () => {
    describe('GET /', () => {
        it('should return status code 200', () => {
            return supertest(server).get('/').then(res => {
                expect(res.status).toBe(200)
            })
        })

        it('should NOT return status code 500', () => {
            return supertest(server).get('/').then(res => {
                expect(res.status).not.toBe(500)
            })
        })

        it('should return JSON', async () => {
            const res = await supertest(server).get('/')
            expect(res.type).toMatch(/json/i)
        })

        it('should expect body to have an api prop with up value', async () => {
            const res = await supertest(server).get('/')
            expect(res.body.api).toBe('up')
        })
    })

    describe('POST /', () => {

        // beforeEach(async () => {
        //     await db('users').truncate()
        // })

        it('should return status code 201 when passed correct data', () => {
            return supertest(server)
                .post('/')
                .send({ name: "Nestor" })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })

        it('should return JSON type', async () => {
            const res = await supertest(server)
                .post('/')
                .send({ name: "Ralph" })

            expect(res.type).toMatch(/json/i)
        })

        it('should fail with status code 400 for incorrect data', async () => {
            const res = await supertest(server).post('/').send({ age: 28 })
            expect(res.status).toBe(400)
        })

        it('should return the inserted user', async () => {
            const res = await supertest(server)
                .post('/')
                .send({ name: "Michelle" })
            expect(res.body.name).toBe("Michelle")
        })
    })

    describe('DELETE /id', () => {

        //define id here so that both it-methods can access it.
        //first time it will use ID to delete existing user
        //second time, if pass, ID will return 404 because user no longer exists
        const id = 12

        it('should return status code 201', async () => {
            const res = await supertest(server).delete(`/${id}`)

            expect(res.status).toBe(201)
        })

        it('should return status code 404', async () => {
            const res = await supertest(server).delete(`/${id}`)

            expect(res.status).toBe(404)
        })

    })
})