import assert from 'node:assert/strict'
import { test } from 'node:test'

import { type MongoClient, ObjectId } from 'mongodb'
import { buildApp } from '../src/app.js'

function createMongoClient(posts: object[]) {
  let collectionName: string | undefined
  let databaseName: string | undefined
  let insertedPost: object | undefined
  let closed = false
  const insertedId = new ObjectId()

  const client = {
    async connect() {},
    db(name: string) {
      databaseName = name
      return {
        collection(name: string) {
          collectionName = name
          return {
            aggregate() {
              return {
                async toArray() {
                  return posts
                }
              }
            },
            async insertOne(post: object) {
              insertedPost = post
              return { acknowledged: true, insertedId }
            }
          }
        }
      }
    },
    async close() {
      closed = true
    }
  } as unknown as MongoClient

  return {
    client,
    insertedId,
    state: () => ({ collectionName, databaseName, insertedPost, closed })
  }
}

test('GET /posts returns posts from MongoDB', async () => {
  const posts = [
    { _id: 'post-1', title: 'First post' },
    { _id: 'post-2', title: 'Second post' }
  ]
  const mongo = createMongoClient(posts)
  const app = await buildApp({ logger: false, mongoClient: mongo.client })

  const response = await app.inject({ method: 'GET', url: '/posts' })

  assert.equal(response.statusCode, 200)
  assert.deepEqual(response.json(), posts)
  assert.equal(mongo.state().databaseName, 'posts')
  assert.equal(mongo.state().collectionName, 'Posts')

  await app.close()
  assert.equal(mongo.state().closed, true)
})

test('POST /posts creates and returns a post', async () => {
  const mongo = createMongoClient([])
  const app = await buildApp({ logger: false, mongoClient: mongo.client })
  const body = {
    title: 'Laws of UX',
    slug: 'laws-of-ux',
    authorId: '1',
    short_description: 'Psychological principles behind interfaces',
    html: '<p>Post content</p>',
    created_at: '2026-09-18T12:00:00.000Z'
  }

  const response = await app.inject({
    method: 'POST',
    url: '/posts',
    payload: body
  })

  assert.equal(response.statusCode, 201)
  assert.deepEqual(response.json(), {
    _id: mongo.insertedId.toHexString(),
    ...body
  })
  assert.deepEqual(mongo.state().insertedPost, {
    ...body,
    created_at: new Date(body.created_at)
  })
  assert.equal(mongo.state().collectionName, 'Posts')

  await app.close()
})

test('POST /posts validates its body', async () => {
  const mongo = createMongoClient([])
  const app = await buildApp({ logger: false, mongoClient: mongo.client })

  const response = await app.inject({
    method: 'POST',
    url: '/posts',
    payload: { title: 'Incomplete post' }
  })

  assert.equal(response.statusCode, 400)
  assert.equal(mongo.state().insertedPost, undefined)

  await app.close()
})
