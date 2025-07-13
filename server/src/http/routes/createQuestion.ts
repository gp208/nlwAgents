import {and, eq, sql} from 'drizzle-orm'
import {z} from 'zod'
import type {FastifyPluginCallbackZod} from 'fastify-type-provider-zod'
import {db} from '../../db/connection.ts'
import {generateEmbeddings} from '../../services/gemini.ts'
import {schema} from '../../db/schema/index.ts'

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({roomId: z.string()}),
        body: z.object({question: z.string().min(1)})
      }
    },
    async (request, reply) => {
      const {roomId} = request.params
      const {question} = request.body

      const embeddings = await generateEmbeddings(question)
      const embeddingsAsString = `[${embeddings.join(',')}]`
      const chunks = await db
        .select({
          id: schema.audioChunks.id,
          transcription: schema.audioChunks.transcription,
          similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`
        })
        .from(schema.audioChunks)
        .where(and(
          eq(schema.audioChunks.roomId, roomId),
          sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > 0.7`
        ))
        .orderBy(sql`${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector`)
        .limit(3)
      
      return chunks

      /* const result = await db.insert(schema.questions).values({roomId, question}).returning()
      if (!result[0]) throw new Error('Failed to create new question.')
      return reply.status(201).send({questionId: result[0].id}) */
    })
}