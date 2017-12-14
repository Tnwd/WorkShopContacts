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

describe('GET /contacts', () => {
    it('if GET ID0 success show status 200', (done) => {
        request(router).get('/contacts/0')
            .expect(200)
            .then((res) => {
                let contact = res.body
                expect(contact.id).toBe(0)
                expect(contact.name).toBe('Ned Stark')
                expect(contact.email).toBe('ned@winterfell.com')
                expect(contact.phone).toBe('123-456-7890')
                expect(contact.url).toBe('www.google.com')
                expect(contact.notes).toBe('Winter is coming.')
                done()
            })
    })
})