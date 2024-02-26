import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials) {
                const user = { id: '1', name: 'Leo', email: 'teste@teste.com', password: 'Leo123@' }

                if (user &&
                    user?.email === credentials?.email &&
                    user?.password === credentials?.password) {
                    return user
                }

                return null
            }
        })
    ],
    pages: {
        signIn: '/',
        // signOut: '/auth/signout',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        // newUser: '/auth/new-user'
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }