import { Schema, model } from "mongoose";
import { TUser } from "./users.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
    {
        name: { type: String, required: [true, "Name is required"] },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },
        password: { type: String, required: [true, "Password is required"] },
        photo: { type: String, default: "" },
        role: {
            type: String,
            enum: ["admin", "customer"],
            required: [true, "Role is required"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    if (user.role === "admin") {
        user.role = "customer";
    }
    next();
});

userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});

export const userModel = model<TUser>("user", userSchema);
