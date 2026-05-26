import z from 'zod'

export const UsersModel = {
  getProfileResponse: z.object({
    user: z.object({
      id: z.uuidv7(),
      name: z.string(),
      email: z.email(),
      createdAt: z.iso.datetime(),
    }),
  }),
}

export type UsersModel = {
  [k in keyof typeof UsersModel]: z.infer<(typeof UsersModel)[k]>
}
