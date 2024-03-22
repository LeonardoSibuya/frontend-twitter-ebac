"use client"

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { endpoint } from "@/app/contexts/UserContext";

import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { useUser } from '@/app/contexts/UserContext';
import axios from 'axios';

const useHomepage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLogoff, setIsLogoff] = useState(false)
    const [newTweet, setNewTweet] = useState('')
    const [isOpen, setIsOpen] = useState(true)
    const [searchUser, setSearchUser] = useState('')
    const [isSearch, setIsSearch] = useState(false)

    const { data: session, status } = useSession()

    const router = useRouter()

    const [tweets, setTweets] = useState<Array<{ id: number; name: string; text: string; createdAt: Date }> | undefined>([]);

    const { users, fetchUsers, postTweet } = useUser()

    const profileLoged = users.find((u) => u.email === session?.user?.email);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


    const openSideBar = () => {
        setIsOpen(!isOpen)
        setIsSearch(false)
    }

    const searchingUser = () => {
        const userSearched = users.find((user) => user.name.toLowerCase() === searchUser.toLowerCase())

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
        if (status === "loading") {
            console.log("loading")
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

    const handleTweetChange = (event: any) => {
        setNewTweet(event.target.value);
    };

    const handlePostTweet = async (userId: number, text: string) => {
        if (profileLoged) {
            if (newTweet === '' || setNewTweet.length < 1) {
                alert('ERRO: Não é possível postar tweets vazios')
                return;
            }

            try {
                try {
                    await postTweet(userId, text);
                    setNewTweet('');
                    updateTweets();
                } catch (error) {
                    console.error('Error posting tweet:', error);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const updateTweets = async () => {
        if (session?.user?.email && profileLoged) {
            try {
                const UserLogedTweetsPromises = await axios.get(`${endpoint}/${profileLoged.id}/`);

                const userLogedTweets = UserLogedTweetsPromises.data.tweets.map((tweet: any) => ({
                    id: tweet.id,
                    text: tweet.text,
                    name: tweet.name,
                    createdAt: new Date(tweet.created_at),
                }));

                // Obter os tweets dos usuários que o usuário logado segue
                const followedUsersTweetsPromises = profileLoged!.follows!.map(async user => {
                    const userResponse = await axios.get(`${endpoint}/${user.id}/`);

                    return userResponse.data.tweets.map((tweet: any) => ({
                        id: tweet.id,
                        text: tweet.text,
                        name: tweet.name,
                        createdAt: new Date(tweet.created_at),
                    }));
                });

                const followedUsersTweets = await Promise.all(followedUsersTweetsPromises);
                const UsersTweets = await Promise.all(userLogedTweets);

                const allTweets = [...UsersTweets.flat(), ...followedUsersTweets.flat()];

                // Lista de tweets únicos, filtrando os tweets duplicados
                const uniqueTweets = allTweets.filter((tweet, index, self) =>
                    index === self.findIndex((t) => (
                        t.id === tweet.id && t.name === tweet.name && t.text === tweet.text
                    ))
                );

                const sortedTweets = uniqueTweets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

                setTweets(sortedTweets);
            } catch (error) {
                console.error('Erro ao atualizar tweets:', error);
            }
        }
    };

    const formatCreatedAt = (createdAt: string): string => {
        return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    };

    return {
        isLoaded,
        isLogoff,
        session,
        newTweet,
        tweets,
        isOpen,
        isSearch,
        profileLoged,
        logout,
        handlePostTweet,
        handleTweetChange,
        openSideBar,
        setSearchUser,
        searchingUser,
        verifyIsSearch,
        formatCreatedAt,
    }
}

export default useHomepage