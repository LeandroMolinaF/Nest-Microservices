export interface User {
    id: number;
    username: string;
    password: string;
    mail: string;
}

export interface UserRegister {
    username: string;
    password: string;
    mail: string;
}

export interface Login {
    username: string;
    password: string;
}