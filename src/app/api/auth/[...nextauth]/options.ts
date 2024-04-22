import axios from "axios";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const nextAuthSecret = process.env.NEXTAUTH_SECRET || 'default_secret_value';

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials) {
                const endpoint = 'https://leonardosibuya.pythonanywhere.com/users'
                try {
                    const response = await axios.get(endpoint)
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
    secret: nextAuthSecret,
    debug: true,
    pages: {
        signIn: '/',
        signOut: '/',
        newUser: '/homepage'
    },
}