"use client"

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

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

    const { users, fetchUsers } = useUser()

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

    const loggedInUser = users.find(user => user.email === session?.user?.email);

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
                const response = await axios.post(`http://127.0.0.1:8000/users/${loggedInUser.id}/tweet/`, {
                    text: newTweet
                });

                setTweets([...tweets!, response.data]);
                setNewTweet('');
                updateTweets();
            } catch (error) {
                console.log(error);
            }

        } else {
            console.log('Usuário não logado ou método addTweet não disponível');
        }
    };

    const updateTweets = async () => {
        if (session?.user?.email && loggedInUser) {
            try {
                const UserLogedTweetsPromises = await axios.get(`http://127.0.0.1:8000/users/${loggedInUser.id}/`);

                const userLogedTweets = UserLogedTweetsPromises.data.tweets.map((tweet: any) => ({
                    id: tweet.id,
                    text: tweet.text,
                    name: tweet.name,
                    createdAt: tweet.created_at,
                }));

                // Obter os tweets dos usuários que o usuário logado segue
                const followedUsersTweetsPromises = loggedInUser!.follows!.map(async user => {
                    const userResponse = await axios.get(`http://127.0.0.1:8000/users/${user.id}/`);

                    return userResponse.data.tweets.map((tweet: any) => ({
                        id: tweet.id,
                        text: tweet.text,
                        name: tweet.name,
                        createdAt: tweet.created_at,
                    }));
                });

                const followedUsersTweets = await Promise.all(followedUsersTweetsPromises);
                const UsersTweets = await Promise.all(userLogedTweets);

                const allTweets = [...UsersTweets.flat(), ...followedUsersTweets.flat()];

                const sortedTweets = allTweets.sort();

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