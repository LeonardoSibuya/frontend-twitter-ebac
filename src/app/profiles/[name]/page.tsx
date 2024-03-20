"use client"

import * as S from './styles'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useParams, useRouter } from "next/navigation"
import { formatDistanceToNow } from 'date-fns';
import Image from "next/image"

import { Container } from "@/styles"

import profileImg from '../../../../public/profile.png'
import Tweets from "@/components/Tweets"

import LoadingScreen from "@/components/LoadingScreen"
import { TriangleUpIcon } from '@chakra-ui/icons'
import ModalFollows from '@/components/ModalFollows'
import { useUser } from '@/app/contexts/UserContext'

const Profiles = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { name } = useParams();

    const { users, fetchUsers, deleteUserTweet } = useUser()

    const userFound = users.find((u) => u.name.toLowerCase() === name.toString().toLowerCase())

    const [isLoaded, setIsLoaded] = useState(false)
    const [tweetDeleted, setTweetDeleted] = useState(false)
    const [followersCount, setFollowersCount] = useState(userFound?.followers?.length || 0);
    const [followingCount, setFollowingCount] = useState(userFound?.follows?.length || 0);

    useEffect(() => {
        setFollowersCount(userFound?.followers?.length || 0);
        setFollowingCount(userFound?.follows?.length || 0);
    }, [userFound]);

    useEffect(() => {
        if (status === 'loading') {
            console.log('A sessão ainda está carregando, aguarde...');
            return;
        }
        if (status === 'authenticated' && session) {
            setTimeout(() => {
                setIsLoaded(true)
            }, 3000)
        } else {
            router.replace("/");
        }
    }, [status, session, router]);

    useEffect(() => {
        setTimeout(() => {
            setTweetDeleted(false)
        }, 3000);
    }, [tweetDeleted])

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const bakcHomepage = () => {
        setIsLoaded(false)
        setTimeout(() => {
            setIsLoaded(true)
        }, 3000)
        setTimeout(() => {
            router.replace("/homepage")
        }, 3000);
    }


    if (!session || !userFound) {
        router.replace("/");
        return;
    }

    const alreadyFollowing = userFound!.followers?.some((u) => u.email === session!.user?.email);

    const userIsLoged = userFound!.name === session?.user?.name ? true : false

    const profileLoged = users.find((u) => u.email === session!.user?.email);

    const updateUser = () => {
        setFollowersCount(userFound?.followers?.length || 0);
        setFollowingCount(profileLoged?.follows?.length || 0);
    }

    const unfollowUser = () => {
        // Verifica se o usuário logado já segue o usuário encontrado
        if (userFound) {
            // Se estiver seguindo, deixa de seguir o usuário encontrado
            if (profileLoged) {
                const followingIndex = profileLoged.follows!.findIndex(u => u.email === userFound.email);

                if (followingIndex !== -1) {

                    // Remove o usuário dos follows do usuário logado
                    profileLoged.unfollow(userFound);

                    // Remove o usuário logado dos followers do usuário encontrado
                    userFound.removeFollower(profileLoged);

                    updateUser()
                } else {
                    console.log("Você não segue este usuário.");
                }
            }
        }
    };

    const followUser = () => {
        // Verifica se o usuário logado já segue o usuário encontrado
        if (userFound) {
            // Se não estiver seguindo, segue o usuário encontrado
            if (!alreadyFollowing) {

                // Adiciona o usuário logado aos seguidores do usuário encontrado
                if (profileLoged) {
                    userFound.addFollower(profileLoged);
                }

                // Adiciona o usuário encontrado aos seguidos pelo usuário logado
                if (profileLoged) {
                    profileLoged.follow([userFound]);
                }

                updateUser()
            } else {
                unfollowUser()
            }
        }
    }

    const handleDeleteTweet = async (tweetId: number) => {
        try {
            await deleteUserTweet(tweetId)
            console.log('Tweet deletado com sucesso', 'tweet ID:', tweetId)
            fetchUsers()
            setTweetDeleted(true)
        } catch (error) {
            console.error('Erro ao excluir o tweet:', error, tweetId)
        }
    }

    return (
        <>
            {isLoaded ? (
                <>
                    <S.Section>
                        <S.ButtonHome
                            type='button'
                            onClick={bakcHomepage}
                        >
                            Página inicial
                            <TriangleUpIcon width='18px' />
                        </S.ButtonHome>
                        <Container>
                            {userFound ? (
                                <>
                                    <S.ProfileContainer>
                                        <S.ProfileName>
                                            <Image src={profileImg} alt="" />
                                            <h4>
                                                @{userFound?.name}
                                            </h4>
                                            <h5>
                                                {userFound.email}
                                            </h5>
                                        </S.ProfileName>
                                        {tweetDeleted ? (
                                            <>
                                                <S.MessageDelete>
                                                    Tweet deletado com sucesso!
                                                </S.MessageDelete>
                                            </>
                                        ) : (
                                            <>
                                                <S.ListTweets>
                                                    <li>
                                                        <span className='tweets'>
                                                            {userFound.tweets?.length}
                                                        </span>
                                                        Tweets
                                                    </li>
                                                    <li>
                                                        <span>
                                                            {userFound.follows?.length}
                                                        </span>
                                                        <ModalFollows
                                                            title={'Seguindo'}
                                                            username={userFound!.follows!.map((user) => user.name)}
                                                        />
                                                    </li>
                                                    <li>
                                                        <span>
                                                            {userFound.followers?.length}
                                                        </span>
                                                        <ModalFollows
                                                            title={'Seguidores'}
                                                            username={userFound!.followers!.map((user) => user.name)}
                                                        />
                                                    </li>

                                                    {userIsLoged ?
                                                        ('') : (
                                                            <S.ButtonFollow
                                                                className={
                                                                    alreadyFollowing
                                                                        ? 'unfollow'
                                                                        : 'follow'}
                                                                onClick={followUser}
                                                            >
                                                                {alreadyFollowing ? 'seguindo' : 'seguir'}
                                                            </S.ButtonFollow>
                                                        )}
                                                </S.ListTweets>
                                            </>
                                        )}
                                    </S.ProfileContainer>

                                    <S.Line />

                                    <S.TweetsContainer>
                                        {userFound.tweets?.map((tweet, index) => (
                                            <li key={index}>
                                                <Tweets
                                                    id={tweet.id}
                                                    isHomepage={false}
                                                    name={tweet.name}
                                                    created_at={formatDistanceToNow(tweet.created_at.toString())}
                                                    tweet={tweet.text}
                                                    deleteButton={handleDeleteTweet}
                                                    isUserLogedPage={userIsLoged ? true : false}
                                                />
                                            </li>
                                        ))}
                                    </S.TweetsContainer>
                                </>
                            ) : (
                                <section>
                                    <h2>Usuario não encontrado</h2>
                                </section>
                            )}
                        </Container>
                    </S.Section>
                </>
            ) : (
                <>
                    <LoadingScreen />
                </>
            )
            }
        </>
    )
}

export default Profiles