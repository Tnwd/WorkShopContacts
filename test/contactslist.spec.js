const request = require('supertest');
const router = require('../server');


describe('GET /contacts', () => {
    it('if GET success show status 200', (done) => {
        request(router).get('/contacts')
            .expect(200)
            .then((res) => {
                let contacts = res.body
                let contact = contacts[0]
                expect(contacts instanceof Array).toBeTruthy()
                expect(contact.id).toBeDefined()
                expect(contact.name).toBeDefined()
                expect(contact.phone).toBeDefined()
                expect(contact.email).toBeDefined()
                expect(contact.url).toBeDefined()
                expect(contact.notes).toBeDefined()
                done()
            })
    })
})
