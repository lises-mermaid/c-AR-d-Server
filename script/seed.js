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
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/birthday1.png',
      qrX: 1420,
      qrY: 950,
      msgX: 1200,
      msgY: 360
    }),
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Birthday',
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/birthday2.png',
      qrX: 1400,
      qrY: 840,
      msgX: 1220,
      msgY: 220
    }),
    CardTemplate.create({
      orientation: 'V',
      occasion: 'Birthday',
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/birthday3.png',
      qrX: 420,
      qrY: 1750,
      msgX: 250,
      msgY: 1400
    }),
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Birthday',
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/birthday4.png',
      qrX: 1420,
      qrY: 900,
      msgX: 1220,
      msgY: 360
    }),
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Wedding',
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/wedding1.png',
      qrX: 1420,
      qrY: 960,
      msgX: 1220,
      msgY: 400
    }),
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Wedding',
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/wedding2.png',
      qrX: 1420,
      qrY: 900,
      msgX: 1220,
      msgY: 360
    }),
    CardTemplate.create({
      orientation: 'V',
      occasion: 'Wedding',
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/wedding3.png',
      qrX: 600,
      qrY: 1750,
      msgX: 420,
      msgY: 1400
    }),
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Retirement',
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/retirement1.png',
      qrX: 1420,
      qrY: 900,
      msgX: 1220,
      msgY: 360
    }),
    CardTemplate.create({
      orientation: 'V',
      occasion: 'Retirement',
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/retirement2.png',
      qrX: 400,
      qrY: 1750,
      msgX: 220,
      msgY: 1400
    }),
    CardTemplate.create({
      orientation: 'V',
      occasion: 'Baby Shower',
      picture: 'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/baby1.png',
      qrX: 600,
      qrY: 1750,
      msgX: 450,
      msgY: 1400
    }),
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Baby Shower',
      picture: 'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/baby2.png',
      qrX: 1420,
      qrY: 960,
      msgX: 1200,
      msgY: 360
    }),
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Anniversary',
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/anniversary1.png',
      qrX: 1420,
      qrY: 960,
      msgX: 1240,
      msgY: 400
    }),
    CardTemplate.create({
      orientation: 'V',
      occasion: 'Anniversary',
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/anniversary2.png',
      qrX: 420,
      qrY: 1750,
      msgX: 275,
      msgY: 1400
    }),
    CardTemplate.create({
      orientation: 'V',
      occasion: 'Anniversary',
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/anniversary3.png',
      qrX: 600,
      qrY: 1750,
      msgX: 450,
      msgY: 1400
    }),
    CardTemplate.create({
      orientation: 'H',
      occasion: 'Farewell',
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/farewell1.png',
      qrX: 1400,
      qrY: 900,
      msgX: 1200,
      msgY: 360
    }),
    CardTemplate.create({
      orientation: 'V',
      occasion: 'Farewell',
      picture:
        'https://s3.amazonaws.com/c-ar-d-videos/cardTemplates/farewell2.png',
      qrX: 600,
      qrY: 1720,
      msgX: 400,
      msgY: 1400
    })
  ])

  const cards = await Promise.all([
    Card.create({
      uuid: 'd386f874-b032-4849-943c-8bd8728bfcb0',
      senderId: 1,
      receiverId: 2,
      cardTemplateId: 1,
      qrCode: `https://c-ar-d-server.herokuapp.com/api/cards/scan/d386f874-b032-4849-943c-8bd8728bfcb0`,
      video: 'https://s3.amazonaws.com/c-ar-d-videos/videos/do_not_delete.mp4',
      link:
        'https://s3.amazonaws.com/c-ar-d-videos/cards/card-d386f874-b032-4849-943c-8bd8728bfcb0.png',
      message: 'Hello world'
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
