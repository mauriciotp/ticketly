import z from 'zod'

export const AuthModel = {
  signUpBody: z.object({
    name: z.string(),
    email: z.email(),
    password: z
      .string()
      .min(8, 'Your password needs to be at least 8 characters'),
    role: z.enum(['attendee', 'organizer']).optional(),
  }),
  signInBody: z.object({
    email: z.email(),
    password: z.string(),
  }),
}

export type AuthModel = {
  [k in keyof typeof AuthModel]: z.infer<(typeof AuthModel)[k]>
}
