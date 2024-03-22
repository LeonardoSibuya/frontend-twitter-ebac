type TweetType = {
    id: number
    name: string
    text: string
    created_at: Date
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