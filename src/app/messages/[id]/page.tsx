"use client"
import { useEffect, useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';

import * as S from './styles'

import { useUser } from "../../contexts/UserContext";
import LoadingScreen from "@/components/LoadingScreen";
import { MessagesInterface, UserMessagesInterface } from '@/Utils/User';

import profile from '../../../../public/profile.png'
import messageImg from '../../../../public/message.png'

import { CloseIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { timeStamp } from "console";


const Messages = () => {

    const { data: session, status } = useSession()
    const { name } = useParams();
    const { users, fetchUsers, fetchtUserMessages, usersMessages } = useUser()
    const router = useRouter()

    const [isLoaded, setIsLoaded] = useState(false)
    const [usernameCurrentChat, setUsernameCurrentChat] = useState('')
    const [searchUser, setSearchUser] = useState('')
    const [messagesCurrentChat, setMessagesCurrentChat] = useState<MessagesInterface[]>([]);
    const [someChatOpen, setSomeChatOpen] = useState(false)

    const profileLoged = users.find((u) => u.email === session!.user?.email);

    useEffect(() => {
        if (status === "loading") {
            console.log("loading")
            return;
        }
        if (status === 'authenticated' && session) {
            setTimeout(() => {
                setIsLoaded(true);
            }, 3000)
        } else {
            router.replace("/");
        }
    }, [status, session, router]);

    useEffect(() => {
        fetchUsers();
        fetchtUserMessages(profileLoged?.id!)
    }, [fetchUsers, fetchtUserMessages]);

    if (!session) {
        router.replace('/homepage')
        return;
    }

    const handleUsernameClick = (userName: string) => {
        setUsernameCurrentChat(userName);
        setSomeChatOpen(true)

        const user = usersMessages.find(user => user.user2.name === userName);

        if (user) {
            setMessagesCurrentChat(user.messages);
        } else {
            setMessagesCurrentChat([]);
        }
    };

    const searchingUser = () => {
        const userSearched = users.find((user) => user.name.toLowerCase() === searchUser.toLowerCase())

        if (!userSearched || userSearched.name.toLowerCase() === profileLoged?.name.toLowerCase()) {
            return alert('ERRO: Usuário não encontrado')
        }

        const userSearchedInMessages = usersMessages.find((user) => user.user2.id === userSearched.id);

        if (userSearchedInMessages) {
            return alert('ERRO: Usuário já esta nas conversas recentes')
        }

        const user = {
            user1: profileLoged!.id!,
            user2: {id: userSearched!.id!, name: userSearched!.name!},
            messages: [
                {
                    sender: profileLoged!.id!,
                    receiver: userSearched!.id!,
                    message: '',
                    timestamp: new Date()
                }
            ]
        }
        
        usersMessages.push(user)
        setSomeChatOpen(true)
        setMessagesCurrentChat(user.messages)
        setUsernameCurrentChat(userSearched.name)

    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchingUser();
        }
    };

    const formatCreatedAt = (createdAt: string): string => {
        return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    };

    const listUsersMessages = usersMessages.slice().reverse();

    return (
        <>
            {isLoaded ? (
                <S.Section>
                    <S.Aside>
                        <h3>Mensagens recentes:</h3>
                        <ul>
                            {listUsersMessages?.map((user) => (
                                <li
                                    key={user.user2.id}
                                    onClick={() => handleUsernameClick(user.user2.name)}
                                >
                                    {user.user2.name}
                                </li>
                            ))}
                        </ul>

                        <input
                            type="text"
                            placeholder="Buscar usuário"
                            onChange={(e) => setSearchUser(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        <S.ListLinks>
                            <Link href="/homepage">
                                <TriangleUpIcon width='18px' />
                                Página inicial
                            </Link>

                            <Link href={`/profiles/${profileLoged?.name}`}>
                                @ {profileLoged?.name}
                            </Link>
                        </S.ListLinks>
                    </S.Aside>

                    <S.ChatContainer>
                        {someChatOpen ? (
                            <>
                                <CloseIcon
                                    width='18px'
                                    cursor="pointer"
                                    position="absolute"
                                    top="0"
                                    right="0"
                                    color="#fff"
                                    onClick={() => setSomeChatOpen(false)}
                                />
                                <S.ChatProfile>
                                    <Image src={profile} alt="" />
                                    <span>
                                        {usernameCurrentChat}
                                    </span>
                                </S.ChatProfile>

                                <S.ListMessages>
                                    {messagesCurrentChat.map((message, index) => (
                                        <li
                                            key={index}
                                            className={message.sender === profileLoged!.id ? 'sender' : 'receiver'}
                                        >
                                            <span>
                                                {formatCreatedAt(message.timestamp.toString() || new Date().toString())}
                                            </span>
                                            {message.message}
                                        </li>
                                    ))}
                                </S.ListMessages>

                                <S.TextArea placeholder='Escreva sua mensagem' />
                            </>
                        ) : (
                            <>
                                <Image
                                    className="imageChat"
                                    src={messageImg} alt={"message icon"} />
                            </>
                        )}
                    </S.ChatContainer>
                </S.Section>
            ) : (
                <section>
                    <LoadingScreen />
                </section>
            )}
        </>
    )
}

export default Messages