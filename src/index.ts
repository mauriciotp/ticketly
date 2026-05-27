import openapi from '@elysia/openapi'
import { Elysia } from 'elysia'
import { env } from './env'
import { auth } from './http/routes/auth'
import { events } from './http/routes/events'
import { users } from './http/routes/users'

const app = new Elysia()
  .use(
    openapi({
      documentation: {
        info: {
          version: '1.0.0',
          title: 'Ticketly API',
          description: 'Official documentation of the Ticketly API platform.',
        },
        servers: [
          {
            url: `http://localhost:${env.PORT}`,
            description: 'Local development environment',
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              description:
                'Insert JWT token if interacting with private endpoints.',
            },
          },
        },
      },
    }),
  )
  .use(auth)
  .use(users)
  .use(events)
  .listen({ port: env.PORT })

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
