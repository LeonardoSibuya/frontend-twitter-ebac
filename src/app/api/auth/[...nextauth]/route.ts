import { User } from "@/Utils/User";
import axios from "axios";
;
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

                try {
                    const endpoint = 'http://127.0.0.1:8000/users/';

                    const response = await axios.get(endpoint)
                    const users = response.data;

                    // const newUser: User = {
                    // };

                    // users.push(newUser);

                    const user = users.find((u: any) => u.email === credentials?.email);

                    if (!user || user.password !== credentials?.password) {
                        console.log('ERROR: Usuario invalido, ou senha incorreta')
                        return null;
                    }

                    return Promise.resolve(user);
                } catch (error) {
                    console.error('Error authorizing user:', error)
                    return Promise.reject(new Error('An error occurred while authorizing'));
                }
            }
        })
    ],
    pages: {
        signIn: '/',
        signOut: '/',
        newUser: '/homepage'
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
    },
    events: {
        createUser: async (message) => {
            // const newUser: User = {
                
            // };


            // userArray.push(newUser);
        },
        signIn: async (message) => {

            // if (message.isNewUser) {

            //     const newUser = {
            //         name: message.user.name || '',
            //         email: message.user.email || '',
            //     };

            //     console.log('Novo usuário criado:', newUser);
            // }
        },
    },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }