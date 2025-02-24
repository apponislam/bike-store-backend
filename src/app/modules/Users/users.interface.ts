export type TUser = {
    name: string;
    email: string;
    password: string;
    photo: string;
    status?: "active" | "blocked";
    role: "admin" | "customer";
};

export type TUserLogin = {
    email: string;
    password: string;
};
