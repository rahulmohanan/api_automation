let supertest = require('supertest')
let expect = require('chai').expect

var app = 'https://jsonplaceholder.typicode.com'

describe('JSON place holder home page', () => {
    it('Home page: should return a 200 response', (done)=> {
        supertest(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200, done)
    })

    it('Validates json response data from /posts/1', (done) => {
        supertest(app)
            .get('/posts/1')
            .end(function(err, res){
                if (err) return done(err)
                expect(res.status).to.equal(200)
                expect(res.body.userId).to.equal(1)
                expect(res.body.id).to.equal(1)
                expect(res.body.title).not.null
                done()
            })
    })

    it('Validates the response from POST method', (done) => {
        supertest(app)
            .post('/posts')
            .send({
                title: 'Test validation',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
                userId: 121
                })
            .set('Content-type', 'application/json; charset=UTF-8')
            .end(function(err, res) {
               // console.log(res.body)
                if (err) return done(err)
                expect(res.status).to.equal(201)
                expect(res.body.id).to.equal(101)
                expect(res.body.title).to.equal('Test validation')
                expect(res.body.userId).to.equal(121)
                done()
            })
    })

    it('Validates response from DELETE method', (done) => {
        supertest(app)
            .delete('/posts/2')
            .end(function(err, res){
                expect(res.status).to.equal(200)
                expect(res.body).to.be.empty
                done()
            })
    })

    it('Validates response from PUT method', (done) => {
        supertest(app)
            .put('/posts/1')
            .send({
                title: 'PUT method validation',
                body: 'Lorem ipsum dolor sit , adipiscing elit, sed do eiusmod',
                userId: 125
                })
            .end(function(err, res){
                if (err) return done(err)
                expect(res.status).to.equal(200)
                expect(res.body.id).to.equal(1)
                expect(res.body.title).to.equal('PUT method validation')
                expect(res.body.userId).to.equal(125)
                done()
            })
    })

    it('Validates value of userId before & after PATCH method', (done) => {
        supertest(app)
            .patch('/posts/1')
            .expect('"userId": 1')
            .send({userId: 202})
            .end(function(err, res){
                expect(res.status).to.equal(200)
                expect(res.body.userId).to.equal(202)
                done()
            })
    })

    it('Validates value of count of users', (done) => {
        supertest(app)
            .get('/users')
            .end(function(err, res){
                expect(res.status).to.equal(200)
                expect(Object.keys(res.body).length).to.equal(10)
                done()
            })
    })
})