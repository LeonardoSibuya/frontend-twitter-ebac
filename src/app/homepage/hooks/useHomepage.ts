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

    const [isOpen, setIsOpen] = useState(true)

    const [searchUser, setSearchUser] = useState('')
    const [isSearch, setIsSearch] = useState(false)

    const [tweets, setTweets] = useState<Array<{ text: string; user: { name: string }; createdAt: Date }> | undefined>([]);

    const router = useRouter()

    const openSideBar = () => {
        setIsOpen(!isOpen)
        setIsSearch(false)
    }

    const searchingUser = () => {
        const userSearched = UserArray.find((user) => user.name.toLowerCase() === searchUser.toLowerCase())

        if (!userSearched) {
            return alert('ERRO: Usuário não encontrado')
        }

        return router.replace(`/profiles/${searchUser}`);
    }

    const verifyIsSearch = (username: string) => {
        if (username.length >= 1) {
            setIsSearch(true)
        } else {
            setIsSearch(false)
        }
        return;
    }

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

            if (newTweet === '' || setNewTweet.length < 1) {
                alert('ERRO: Não é possível postar tweets vazios')
                return;
            }

            try {
                const newTweetObject = {
                    user: { name: loggedInUser.name },
                    createdAt: new Date(), // Usar a data e hora atual
                    text: newTweet,
                };


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
                createdAt: new Date(),
                text: tweet,
            }));

            // Obter os tweets dos usuários que o usuário logado segue
            const followedUsersTweets = loggedInUser?.follows?.flatMap(user =>
                user?.tweets?.map(tweet => ({
                    user: { name: user.name },
                    createdAt: new Date(),
                    text: tweet,
                }))
            );

            // Combinar os tweets do usuário logado com os tweets dos usuários seguidos
            const userTweetsFiltered = userTweets?.filter(tweet => tweet !== undefined) as Array<{ text: string; user: { name: string }; createdAt: Date }> | undefined;
            const followedUsersTweetsFiltered = followedUsersTweets?.filter(tweet => tweet !== undefined) as Array<{ text: string; user: { name: string }; createdAt: Date }> | undefined;

            let combinedTweets = [...userTweetsFiltered!, ...followedUsersTweetsFiltered!];

            if (!combinedTweets) {
                return;
            }

            // Ordenar os tweets por ordem do mais novo para o mais velho
            const sortedTweets = combinedTweets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

            setTweets(sortedTweets);
        }
    };

    return {
        isLoaded,
        isLogoff,
        session,
        newTweet,
        tweets,
        isOpen,
        isSearch,
        logout,
        handlePostTweet,
        handleTweetChange,
        openSideBar,
        setSearchUser,
        searchingUser,
        verifyIsSearch,
    }
}

export default useHomepage