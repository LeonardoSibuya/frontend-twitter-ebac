export interface UserInterface {
    id: string;
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    userGitHub?: string;
}

const UserArray: UserInterface[] = [
    {
        id: '1',
        email: 'leo@leo.com',
        name: 'leonardo',
        password: 'Leo123@',
    },
]

export default UserArray