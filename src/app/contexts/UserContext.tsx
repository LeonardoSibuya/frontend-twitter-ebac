"use client"

import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { User } from '@/Utils/User';

// Defina o tipo para o contexto do usuário
interface UserContextType {
    users: User[];
    fetchUsers: () => void;
    deleteUserTweet: (tweetId: number) => Promise<void>;
}

// Crie o contexto do usuário
const UserContext = createContext<UserContextType>({
    users: [],
    fetchUsers: () => { },
    deleteUserTweet: async () => { }
});

const endpoint = 'http://127.0.0.1:8000/users'

// Crie um componente de provedor para envolver os componentes que precisarão acessar o contexto
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);

    // Função para buscar usuários
    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get<User[]>(`${endpoint}/`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, []);

    const deleteUserTweet = async (tweetId: number) => {
        try {
            await axios.delete(`${endpoint}/tweet/${tweetId}/delete/`);

            // Atualiza a lista de usuários após a exclusão
            fetchUsers();
        } catch (error) {
            console.error('Erro ao excluir o tweet:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <UserContext.Provider value={{ users, fetchUsers, deleteUserTweet }}>
            {children}
        </UserContext.Provider>
    );
};

// Crie um hook personalizado para consumir o contexto do usuário
export const useUser = () => useContext(UserContext);