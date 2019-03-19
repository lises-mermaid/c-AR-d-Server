'use strict'

const db = require('../server/db')
const {User, CardTemplate, Card} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      username: 'Cody',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      username: 'Murphy',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      username: 'Lisa',
      email: 'lisa@email.com',
      password: '123'
    }),
    User.create({
      username: 'Jordyn',
      email: 'jordyn@email.com',
      password: '123'
    }),
    User.create({
      username: 'Rachel',
      email: 'rachel@email.com',
      password: '123'
    }),
    User.create({
      username: 'Bell',
      email: 'bell@email.com',
      password: '123'
    })
  ])

  const cardTemplates = await Promise.all([
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Birthday',
      picture: 'example.com'
    }),
    CardTemplate.create({
      orientation: 'V',
      occasion: 'Birthday',
      picture: 'example.com'
    }),
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Wedding',
      picture: 'example.com'
    }),
    CardTemplate.create({
      orientation: 'V',
      occasion: 'Wedding',
      picture: 'example.com'
    }),
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Retirment',
      picture: 'example.com'
    }),
    CardTemplate.create({
      orientation: 'V',
      occasion: 'Retirment',
      picture: 'example.com'
    }),
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Baby Shower',
      picture: 'example.com'
    }),
    CardTemplate.create({
      orientation: 'V',
      occasion: 'Baby Shower',
      picture: 'example.com'
    }),
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Anniversary',
      picture: 'example.com'
    }),
    CardTemplate.create({
      orientation: 'V',
      occasion: 'Anniversary',
      picture: 'example.com'
    }),
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Farewell',
      picture: 'example.com'
    }),
    CardTemplate.create({
      orientation: 'V',
      occasion: 'Farewell',
      picture: 'example.com'
    })
  ])

  const cards = await Promise.all([
    Card.create({
      senderId: 1,
      receiverId: 2,
      cardTemplateId: 1,
      qrCode: 'placeholder',
      video: 'example.com'
    }),
    Card.create({
      senderId: 2,
      receiverId: 3,
      cardTemplateId: 2,
      qrCode: 'placeholder',
      video: 'example.com'
    }),
    Card.create({
      senderId: 3,
      receiverId: 4,
      cardTemplateId: 3,
      qrCode: 'placeholder',
      video: 'example.com'
    }),
    Card.create({
      senderId: 4,
      receiverId: 5,
      cardTemplateId: 4,
      qrCode: 'placeholder',
      video: 'example.com'
    }),
    Card.create({
      senderId: 5,
      receiverId: 6,
      cardTemplateId: 5,
      qrCode: 'placeholder',
      video: 'example.com'
    }),
    Card.create({
      senderId: 6,
      receiverId: 1,
      cardTemplateId: 6,
      qrCode: 'placeholder',
      video: 'example.com'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${cardTemplates.length} cardTemplates`)
  console.log(`seeded ${cards.length} cards`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
