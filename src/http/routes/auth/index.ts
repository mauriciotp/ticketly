import Elysia from 'elysia'
import { signIn } from './sign-in'
import { signUp } from './sign-up'

export const auth = new Elysia().use(signUp).use(signIn)
