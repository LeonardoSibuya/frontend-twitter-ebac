"use client"

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

import UserArray, { User } from '@/Utils/User';

const useHomepage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLogoff, setIsLogoff] = useState(false)

    const { data: session, status } = useSession()

    const [newTweet, setNewTweet] = useState('')

    const [tweets, setTweets] = useState<Array<{ text: string; user: { name: string }; createdAt: string }> | undefined>(undefined);

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, 3000)
    }, [])

    useEffect(() => {
        if (status === 'loading') {
            console.log('A sessão ainda está carregando, aguarde...');
            return;
        }
        if (status === 'authenticated' && session) {
            setIsLoaded(true);
            updateTweets();
        } else {
            router.replace("/");
        }
    }, [status, session, router]);

    const logout = async () => {
        setIsLogoff(true);

        try {
            await signOut({
                redirect: false,
            });
            router.replace('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const loggedInUser = UserArray.find(user => user.email === session?.user?.email);

    const handleTweetChange = (event: any) => {
        setNewTweet(event.target.value);
    };

    const handlePostTweet = async () => {
        if (loggedInUser) {

            if (newTweet === '') {
                alert('ERRO: Não é possível postar tweets vazios')
                return;
            }

            try {
                await loggedInUser.addTweet(newTweet);
                setNewTweet('');
                updateTweets();
            } catch (error) {
                console.log(error);
            }

        } else {
            console.log('Usuário não logado ou método addTweet não disponível');
        }
    };

    const updateTweets = () => {
        if (session?.user?.email && loggedInUser) {

            // Obter os tweets do usuário logado
            const userTweets = loggedInUser?.tweets?.map(tweet => ({
                user: { name: loggedInUser.name },
                createdAt: new Date().toISOString(),
                text: tweet,
            }));

            // Obter os tweets dos usuários que o usuário logado segue
            const followedUsersTweets = loggedInUser?.follows?.flatMap(user =>
                user?.tweets?.map(tweet => ({
                    user: { name: user.name },
                    createdAt: new Date().toISOString(),
                    text: tweet,
                }))
            );

            // Combinar os tweets do usuário logado com os tweets dos usuários seguidos
            const combinedTweets = [...userTweets!, ...followedUsersTweets!];

            if (combinedTweets) {
                setTweets(combinedTweets.filter(tweet => tweet !== undefined) as Array<{ text: string; user: { name: string }; createdAt: string }>);
            }
        }
    };

    return {
        isLoaded,
        isLogoff,
        session,
        status,
        newTweet,
        tweets,
        logout,
        handlePostTweet,
        handleTweetChange,
    }
}

export default useHomepage