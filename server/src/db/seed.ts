import {reset, seed} from 'drizzle-seed'
import {client, db} from './connection.ts'
import {schema} from './schema/index.ts'

await reset(db, schema)
await seed(db, schema).refine(f => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum()
      },
      with: {questions: 4}
    }
  }
})
await client.end()

console.log('Database seeded')