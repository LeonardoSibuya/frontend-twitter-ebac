import UserArray, { UserInterface } from "@/Utils/User";;
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
                const users: UserInterface[] = UserArray;

                console.log('Credenciais fornecidas:', credentials);

                const user = users.find(
                    (u) => u.email === credentials?.email && u.password === credentials?.password
                );

                if (user) {
                    // Criar um novo objeto com as propriedades específicas que o NextAuth espera
                    const authenticatedUser = {
                        id: user.id ? user.id.toString() : '', // Converter para string se existir, senão, usar string vazia
                        name: user.name,
                        email: user.email,
                    };
                    console.log('Usuário autenticado:', authenticatedUser);

                    // Retornar uma promessa que resolve o objeto do usuário autenticado
                    return Promise.resolve(authenticatedUser);
                }

                console.log('Usuário não encontrado');
                console.log('Credenciais fornecidas:', credentials?.email, credentials?.password);
                console.log('Array de usuários:', users);

                return Promise.resolve(null);
            }
        })
    ],
    pages: {
        signIn: '/',
        signOut: '/',
        newUser: '/homepage'
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }