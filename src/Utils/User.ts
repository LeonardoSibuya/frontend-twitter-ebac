type TweetType = {
    id: number
    name: string
    text: string
    created_at: Date
}

export type MessagesInterface = {
    sender: number
    receiver: number
    message: string
    timestamp: Date
}

type Receiver = {
    id: number
    name: string
}

export interface UserMessagesInterface {
    user1: number,
    user2: Receiver,
    messages: MessagesInterface[],
}

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    confirmPassword?: string
    tweets?: TweetType[];
    follows?: User[];
    followers?: User[];
}