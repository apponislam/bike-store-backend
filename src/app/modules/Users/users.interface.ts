export type TUser = {
    name: string;
    email: string;
    password: string;
    photo: string;
    role: "admin" | "customer";
};
