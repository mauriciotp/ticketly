import z from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string(),
})

const parseResult = envSchema.safeParse(process.env)

if (!parseResult.success) {
  console.error(
    'Please, provide a valid environment variables!',
    z.treeifyError(parseResult.error),
  )
  throw new Error('Invalid environment variables!')
}

export const env = parseResult.data
