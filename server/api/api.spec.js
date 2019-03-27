/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Card = db.model('card')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    const codysPassword = '123'

    beforeEach(() => {
      return User.create({
        password: codysPassword,
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an(error)
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

// describe('Product routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/products/', () => {
//     let testProduct

//     beforeEach(() => {
//       // return Product.create(testProduct)
//       testProduct = Product.build({
//         name: 'mexican fencepost',
//         description:
//           'tall but inexpensive. typically found in your local grocery store.',
//         price: 3,
//         imageUrl: 'https://cdn140.picsart.com/246583441023202.jpg?c256x256',
//         stock: 100
//       })
//     })

//     //empty the tables after each spec
//     afterEach(() => {
//       return Promise.all([Product.truncate({cascade: true})])
//     })

//     it('GET /api/products sends all products', async () => {
//       testProduct.save()
//       const res = await request(app)
//         .get('/api/products')
//         .expect(200)

//       expect(res.body).to.be.an('array')
//       expect(res.body[0].name).to.be.equal(testProduct.name)
//     })

//     it('fails when model definitions are violated', async () => {
//       testProduct.name = null
//       let result, error
//       try {
//         result = await testProduct.validate()
//       } catch (err) {
//         error = err
//       }

//       if (result) throw Error('validation should fail!')
//       expect(error).to.be.an.instanceOf(Error)
//     })
//   }) // end describe ('/api/products')
// }) // end describe('Product routes')

// describe('loading express', function () {
//   var server;
//   beforeEach(function () {
//     server = require('../');
//   });
//   afterEach(function () {
//     server = require('../');
//   });
//   it('responds to /', function testSlash(done) {
//   request(server)
//     .get('/')
//     .expect(200, done);
//   });
//   // it('404 everything else', function testPath(done) {
//   //   request(server)
//   //     .get('/random')
//   //     .expect(404, done);
//   // }); still working on getting this to properly run
// });
