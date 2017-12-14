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

describe('POST /contacts', () => {
    it('test 12 and status 201', (done) => {
        request(router).post('/contacts')
            .send([
                { id: 12, name: 'PSPS', email: 'psps@gamil.com', phone: '0617598888', url: 'www.google.com', notes: 'mickeymouse' },

            ])
            .expect(201)
            .then((res) => {
                let contact = res.body
                let contactbody = contact[0]
                expect(contact).toBeDefined()
                expect(contactbody.id).toBe(12)
                expect(contactbody.name).toBe('PSPS')
                expect(contactbody.email).toBe('psps@gamil.com')
                expect(contactbody.phone).toBe('0617598888')
                expect(contactbody.url).toBe('www.google.com')
                expect(contactbody.notes).toBe('mickeymouse')
                done()
            })
    })
})

describe('PUT /contacts', () => {
    it('ID 12 Move to ID 6', (done) => {
        request(router).put('/contacts/6')
            .send({ id: 12, name: "PSPS", email: 'psps@gamil.com', phone: '0617598888', url: 'www.google.com', notes: 'mickeymouse' })
            .expect(200)
            .then((res) => {
                request(router).get('/contacts/6')
                    .then((res) => {
                        let contact = res.body
                        expect(contact).toBeDefined()
                        expect(contact.id).toBe(12)
                        expect(contact.name).toBe("PSPS")
                        expect(contact.email).toBe('psps@gamil.com')
                        expect(contact.phone).toBe('0617598888')
                        expect(contact.url).toBe('www.google.com')
                        expect(contact.notes).toBe('mickeymouse')
                    })
                done()
            })
    })
})

describe('DELETE /contacts', () => {
    it('Delete Data ID 6', (done) => {
        request(router).delete('/contacts/6')
            .expect(204)
            .then((res) => {
                request(router).get('/contacts/6')
                    .then((res) => {
                        let contact = res.body
                        expect(contact).toBeDefined()
                        expect(contact.id).not.toBe(6)
                    })
                done()
            })
    })
})