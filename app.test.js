const app = require('./server.js');
const request = require('supertest');


describe('/sign-up', () => {
    test('should create an employee in the database', async () => {
        await request(app).post('/sign-up').send({
            first_name: 'john',
            last_name: 'doe',
            auth_hash: 'aehf890u903iklfno928hdkvb3i2hf9023u'
        })
        let myRequest = await request(app).get('/lastEmployee')
        JSON.stringify(myRequest)
        expect(myRequest.first_name).toEqual('john')
        expect(myRequest.first_name).toEqual('doe')
        expect(myRequest.auth_hash).toEqual('aehf890u903iklfno928hdkvb3i2hf9023u')
    })
});