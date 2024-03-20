type TweetType = {
    id: number
    name: string
    text: string
    created_at: Date
}

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    confirmPassword?: string
    tweets?: TweetType[];
    follows?: User[]; // Array de usuários que este usuário segue
    followers?: User[]; // Array de usuários que seguem este usuário

    constructor(id: string, name: string, email: string, password: string, tweets: TweetType[] = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.tweets = tweets;
        this.follows = [];
        this.followers = [];
    }

    addTweet(tweet: TweetType) {
        this.tweets?.push(tweet);
    }

    follow(users: Omit<User, 'password'>[]) {
        users.forEach((user) => {
            if (user.id !== this.id && !this.follows?.some((u) => u.id === user.id)) {
                const { id, name, email, tweets } = user;
                this.follows?.push(new User(id, name, email, '', tweets || []));
                user.addFollower(this);
            }
        });

        import('@/Utils/User').then((module) => {
            const userArray = module.default;
            const follower = userArray.find((user) => user.id === user.id);

            if (follower) {
                follower.addFollower(this);
            }
        });
    }

    unfollow(userToUnfollow: User) {
        // Remove o usuário a ser desseguido dos follows deste usuário
        this.follows = this.follows?.filter(user => user.id !== userToUnfollow.id);

        // Remove este usuário dos followers do usuário a ser desseguido
        userToUnfollow.removeFollower(this);
    }

    addFollower(user: Omit<User, 'password'>) {
        if (user.id !== this.id && !this.followers?.some((u) => u.id === user.id)) {
            const { id, name, email, tweets } = user;
            this.followers?.push(new User(id, name, email, '', tweets || []));
        }
    }

    removeFollower(userToRemove: User) {
        // Remove o usuário dos followers deste usuário
        this.followers = this.followers?.filter(user => user.id !== userToRemove.id);
    }
}

export const updateuserArray = (users: User[]): void => {
    userArray.push(...users);
};

const userArray: User[] = [];

export default userArray