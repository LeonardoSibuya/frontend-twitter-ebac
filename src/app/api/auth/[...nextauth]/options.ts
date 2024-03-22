import axios from "axios";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials) {
                const endpoint = 'http://127.0.0.1:8000/users/'
                try {
                    const response = await axios.get(`${endpoint}`)
                    const users = response.data;

                    const user = users.find((u: any) => u.email === credentials?.email);

                    if (!user || user.password !== credentials?.password) {
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
    },
}