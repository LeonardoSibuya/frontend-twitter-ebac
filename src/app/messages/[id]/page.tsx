"use client"
import { useEffect, useState, useRef } from "react";
import { formatDistanceToNow } from 'date-fns';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';

import * as S from './styles'

import { useUser } from "../../contexts/UserContext";
import LoadingScreen from "@/components/LoadingScreen";
import { MessagesInterface } from '@/Utils/User';

import profile from '../../../../public/profile.png'
import messageImg from '../../../../public/message.png'

import { CloseIcon, TriangleUpIcon, ArrowRightIcon, HamburgerIcon } from '@chakra-ui/icons';


const Messages = () => {
    const { data: session, status } = useSession()
    const { users, fetchUsers, fetchtUserMessages, usersMessages, userSendMessage, fetchNewMessages } = useUser()
    const router = useRouter()

    const [isLoaded, setIsLoaded] = useState(false)
    const [someChatOpen, setSomeChatOpen] = useState(false)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [usernameCurrentChat, setUsernameCurrentChat] = useState('')
    const [messageContent, setMessageContent] = useState('')
    const [searchUser, setSearchUser] = useState('')
    const [currentUserId, setCurrentUserId] = useState(Number)
    const [messagesCurrentChat, setMessagesCurrentChat] = useState<MessagesInterface[]>([]);
    const [sendMessage, setSendMessage] = useState<MessagesInterface>()

    const listRef = useRef<HTMLUListElement>(null);

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
        }
    }, [status, session, router]);

    
    if (!session) {
        router.replace('/homepage')
        return;
    }

    useEffect(() => {
        if (profileLoged) {
            fetchtUserMessages(profileLoged!.id!);
        }
    }, [profileLoged, fetchtUserMessages]);

    useEffect(() => {
        fetchUsers();
        fetchtUserMessages(profileLoged?.id!)
    }, [fetchUsers, fetchtUserMessages]);

    useEffect(() => {
        const POLLING_INTERVAL = 1000

        // Execute a função fetchNewMessages imediatamente e, em seguida, a cada X segundos
        fetchNewMessages(profileLoged!.id!);

        const intervalId = setInterval(() => {
            fetchtUserMessages(profileLoged!.id!); // Passando o userId a cada intervalo de polling
        }, POLLING_INTERVAL);

        return () => {
            // Limpe o intervalo quando o componente for desmontado
            clearInterval(intervalId);
        };
    }, []);

    // Atualize as mensagens atuais sempre que usersMessages mudar
    useEffect(() => {
        // Encontre as mensagens correspondentes ao usuário atual
        const currentUserMessages = usersMessages.find(
            (userMessage) => userMessage.user2.id === currentUserId
        );

        if (currentUserMessages) {
            // Se encontrou as mensagens, atualize o estado local
            setMessagesCurrentChat(currentUserMessages.messages);
        } else {
            // Se não houver mensagens para o usuário atual, limpe o estado local
            setMessagesCurrentChat([]);
        }
    }, [usersMessages, currentUserId]);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messagesCurrentChat]);

    const handleUsernameClick = (userName: string) => {
        setUsernameCurrentChat(userName);
        setSomeChatOpen(true)
        setIsSideBarOpen(false)

        const user = usersMessages.find(user => user.user2.name === userName);

        if (user) {
            setMessagesCurrentChat(user.messages);
            setCurrentUserId(user.user2.id)
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

        const userfounded = {
            user1: profileLoged!.id!,
            user2: { id: userSearched!.id!, name: userSearched!.name! },
            messages: [
                {
                    sender: profileLoged!.id!,
                    receiver: userSearched!.id!,
                    message: '',
                    timestamp: new Date()
                }
            ]
        }

        setIsSideBarOpen(false)
        setCurrentUserId(userfounded.user2.id)
        usersMessages.push(userfounded)
        setSomeChatOpen(true)
        setMessagesCurrentChat(userfounded.messages)
        setUsernameCurrentChat(userSearched.name)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchingUser();
        }
    };

    const handleSendMessage = async () => {
        if (!messageContent.trim()) return; // Verifica se a mensagem está vazia

        const newMessage: MessagesInterface = {
            sender: profileLoged!.id!,
            receiver: currentUserId!,
            message: messageContent.trim(),
            timestamp: new Date()
        };

        // Adiciona a nova mensagem ao estado local antes mesmo de receber uma resposta do servidor
        setMessagesCurrentChat(prevMessages => [...prevMessages, newMessage]);
        setMessageContent('');

        try {
            await userSendMessage(
                newMessage.sender!,
                newMessage.receiver!,
                newMessage.message!
            );

            // Atualiza as mensagens do chat após o envio bem-sucedido
            fetchtUserMessages(profileLoged!.id!);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
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
                    <HamburgerIcon
                        className="isCellphone"
                        color="#fff"
                        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                    />

                    <S.Aside className={isSideBarOpen ? 'isOpen' : ''}>
                        <h3>Mensagens recentes:</h3>
                        <ul>
                            {listUsersMessages?.map((user, index) => (
                                <li
                                    key={index}
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
                                <TriangleUpIcon width='18px' />
                                {profileLoged?.name}
                            </Link>
                        </S.ListLinks>
                    </S.Aside>

                    <S.ChatContainer
                        className={isSideBarOpen ? '' : 'chatIsOpen'}
                    >
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

                                <S.ListMessages ref={listRef}>
                                    {messagesCurrentChat.map((message, index) => (
                                        <li
                                            key={index}
                                            className={message.sender === profileLoged!.id ? 'sender' : 'receiver'}
                                        >
                                            <div>
                                                <span>
                                                    {formatCreatedAt(message.timestamp.toString() || new Date().toString())}
                                                </span>
                                                <span>
                                                    {message.sender === profileLoged!.id ? `@${profileLoged!.name}` : `@${usernameCurrentChat}`}
                                                </span>
                                            </div>
                                            {message.message}
                                        </li>
                                    ))}
                                </S.ListMessages>

                                <S.TextAreaContainer>
                                    <S.TextArea
                                        onChange={(e) => {
                                            setSendMessage({
                                                sender: profileLoged!.id!,
                                                receiver: currentUserId,
                                                message: messageContent,
                                                timestamp: new Date()
                                            });
                                            setMessageContent(e.target.value)
                                        }}
                                        value={messageContent}
                                        placeholder='Escreva sua mensagem'
                                    />

                                    <button onClick={handleSendMessage}>
                                        <ArrowRightIcon />
                                    </button>
                                </S.TextAreaContainer>
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