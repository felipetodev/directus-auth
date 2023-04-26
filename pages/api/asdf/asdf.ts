import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import { directus } from '@/lib/directus'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials, req) {

        const { email, password } = credentials!

        if (!email || !password) {
          throw new Error('Email and password are required')
        }
        console.log('🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢')
        const auth = await directus.auth.login({
          email,
          password
        }).catch(e => console.error(e)) // { access_token, refresh_token, expires }

        console.log('🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢')
        console.log(auth)

        const userData = await directus.users.me.read()
          .catch(e => console.error(e)) as any

        if (!auth || !userData) {
          throw new Error('Invalid credentials')
        }

        const user = {
          ...auth,
          ...userData
        }
        // console.log(user)

        return user
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // token: {
      //   name: undefined,
      //   email: 'test3@judini.ai',
      //   picture: undefined,
      //   sub: '9fde02c2-e9e7-423f-ad5d-7e16e9c3fa3d'
      // },
     
      if (user) token.user = user

      return token
    },
    session: async ({ session, token }) => {
      const user = token.user
      session.user = user as any
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)
