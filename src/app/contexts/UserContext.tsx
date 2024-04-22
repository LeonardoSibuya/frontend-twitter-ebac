"use client"

import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { User, UserMessagesInterface } from '@/Utils/User';

// Defina o tipo para o contexto do usuário
interface UserContextType {
    users: User[];
    usersMessages: UserMessagesInterface[];
    fetchUsers: () => void;
    deleteUserTweet: (tweetId: number) => Promise<void>;
    follow: (followerId: number, targetUserId: number) => void;
    unfollow: (userToUnfollow: number, profileLoged: number) => void;
    postTweet: (userId: number, text: string) => Promise<void>;
    userSendMessage: (senderId: number, receiverId: number, message: string) => void;
    fetchtUserMessages: (userId: number) => void;
    fetchNewMessages: (userId: number) => void
}

// Crie o contexto do usuário
const UserContext = createContext<UserContextType>({
    users: [],
    usersMessages: [],
    fetchUsers: () => { },
    deleteUserTweet: async () => { },
    follow: async () => { },
    unfollow: async () => { },
    postTweet: async () => { },
    userSendMessage: async () => { },
    fetchtUserMessages: async () => { },
    fetchNewMessages: async () => {  },
});

export const endpoint = 'https://leonardosibuya.pythonanywhere.com/users'

// Crie um componente de provedor para envolver os componentes que precisarão acessar o contexto
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [users, setUsers] = useState<User[]>([]);
    const [usersMessages, setUsersMessages] = useState<UserMessagesInterface[]>([]);

    // Função para buscar usuários
    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get<User[]>(`${endpoint}`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, []);

    const fetchtUserMessages = useCallback(async (userId: number) => {
        try {
            const response = await axios.get(`${endpoint}/${userId}/user_messages/`);
            setUsersMessages(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, []);

    const fetchNewMessages = async (userId: number) => {
        try {
            const response = await axios.get(`${endpoint}/${userId}/user_messages/`);

            // Atualize o estado local das mensagens com as novas mensagens recebidas
            setUsersMessages(response.data);
        } catch (error) {
            console.error('Error fetching new messages:', error);
        }
    };

    const userSendMessage = async (senderId: number, receiverId: number, message: string) => {
        try {
            await axios.post(`${endpoint}/${senderId}/send_message/${receiverId}/`, {
                message: message
            })
        } catch (error) {

        }
    }

    const deleteUserTweet = async (tweetId: number) => {
        try {
            await axios.delete(`${endpoint}/tweet/${tweetId}/delete/`);
            fetchUsers()
        } catch (error) {
            console.error('Erro ao excluir o tweet:', error);
            throw error;
        }
    };

    const follow = async (profileLoged: number, targetUser: number) => {
        try {
            // Chama a API para seguir o usuário
            await axios.post(`${endpoint}/${profileLoged}/follow/${targetUser}`);
            fetchUsers();
        } catch (error) {
            console.error('Erro ao seguir o usuário:', error);
            throw error;
        }
    };

    const unfollow = async (profileLoged: number, targetUser: number) => {
        try {
            // Chama a API para deixar de seguir o usuário
            await axios.post(`${endpoint}/${profileLoged}/unfollow/${targetUser}`);

            fetchUsers();
        } catch (error) {
            console.error('Erro ao deixar de seguir o usuário:', error);
            throw error;
        }
    };

    const postTweet = async (userId: number, text: string) => {
        try {
            await axios.post(`${endpoint}/${userId}/tweet/`, {
                text: text
            });
            fetchUsers();
        } catch (error) {
            console.error('Error posting tweet:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <UserContext.Provider value={
            {
                users, 
                usersMessages, 
                fetchUsers, 
                deleteUserTweet, 
                follow, 
                unfollow, 
                postTweet,
                userSendMessage, 
                fetchtUserMessages,
                fetchNewMessages
            }
        }>
            {children}
        </UserContext.Provider>
    );
};

// Crie um hook personalizado para consumir o contexto do usuário
export const useUser = () => useContext(UserContext);