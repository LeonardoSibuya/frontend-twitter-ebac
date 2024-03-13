export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    confirmPassword?: string
    tweets?: string[];
    follows?: User[]; // Array de usuários que este usuário segue
    followers?: User[]; // Array de usuários que seguem este usuário

    constructor(id: string, name: string, email: string, password: string, tweets: string[] = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.tweets = tweets;
        this.follows = [];
        this.followers = [];
    }

    addTweet(tweet: string) {
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
            const UserArray = module.default;
            const follower = UserArray.find((user) => user.id === user.id);

            if (follower) {
                follower.addFollower(this);
            }
        });
    }

    addFollower(user: Omit<User, 'password'>) {
        if (user.id !== this.id && !this.followers?.some((u) => u.id === user.id)) {
            const { id, name, email, tweets } = user;
            this.followers?.push(new User(id, name, email, '', tweets || []));
        }
    }
}

export const updateUserArray = (users: User[]): void => {
    UserArray.push(...users);
};

const user1 = new User("1", "Jade", "jade@j.com", "Leo123@");
const user2 = new User("2", "Leonardo", "leo@l.com", "Leo123!");
const user3 = new User("3", "Laercio", "laercio@t.com", "Leo123!");

user1.follow([user2]);
user2.follow([user1]);

// Adicionando tweets para ambos os usuários
user1.addTweet("Tweet inicial da jade");

user2.addTweet("Tweet inicial do leonardo");

user3.addTweet("Tweet inicial do laercio");

const UserArray: User[] = [user1, user2, user3];

console.log('UserArray:', UserArray)

export default UserArray