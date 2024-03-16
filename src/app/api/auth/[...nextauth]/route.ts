import UserArray, { User } from "@/Utils/User";;
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
                const users: User[] = UserArray;

                const name = credentials?.email.split('@')[0] || '';

                const newUser: User = {
                    id: (users.length + 1).toString(),
                    name: name || '',
                    email: credentials?.email || '',
                    password: credentials?.password || '',
                    addTweet: function (tweet: string): void {
                        throw new Error("Function not implemented.");
                    },
                    follow: function (users: User[]): void {
                        throw new Error("Function not implemented.");
                    },
                    addFollower: function (user: User): void {
                        throw new Error("Function not implemented.");
                    },
                    unfollow: function (userToUnfollow: User): void {
                        throw new Error("Function not implemented.");
                    },
                    removeFollower: function (userToRemove: User): void {
                        throw new Error("Function not implemented.");
                    }
                };

                users.push(newUser);

                const user = users.find((u) => u.email === credentials?.email);

                if (!user || user.password !== credentials?.password) {
                    return null;
                }

                return Promise.resolve(user);
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
            const newUser: User = {
                id: message.user.id,
                name: message.user.name || '',
                email: message.user.email || '',
                password: '',
                addTweet: function (tweet: string): void {
                    throw new Error("Function not implemented.");
                },
                follow: function (users: User[]): void {
                    throw new Error("Function not implemented.");
                },
                addFollower: function (user: User): void {
                    throw new Error("Function not implemented.");
                },
                unfollow: function (userToUnfollow: User): void {
                    throw new Error("Function not implemented.");
                },
                removeFollower: function (userToRemove: User): void {
                    throw new Error("Function not implemented.");
                }
            };


            UserArray.push(newUser);
        },
        signIn: async (message) => {

            if (message.isNewUser) {

                const newUser = {
                    name: message.user.name || '',
                    email: message.user.email || '',
                };

                console.log('Novo usuário criado:', newUser);
            }
        },
    },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }