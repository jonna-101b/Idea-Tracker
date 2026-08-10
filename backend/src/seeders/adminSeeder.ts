import validator from "validator";
import type { IUser } from "../models/user/userSchema.js";
import { hashPassword } from "../utils/auth.js";
import mongoose from "mongoose";
import { config } from "../config/environments.js";
import { User } from "../models/user/userModel.js";


const adminUsers: Pick<IUser, "name" | "email" | "password" | "role">[] = [
  {
    name: "Jonna",
    email: "yonazyonaz8@gmail.com",
    password: "4321@Native",
    role: "admin"
  }
];

async function seedAdmins() {
    console.log("Starting user seeder...\n");

    for (const admin of adminUsers) {
        const exists = await User.findOne({ email: admin.email });

        if (exists) {
            console.log(`Admin user ${admin.name} is already signed up!`);
            continue;
        }

        if (!validator.isStrongPassword(admin.password)) {
            console.log("Password not strong enough!");
            continue;
        }

        const hashed = await hashPassword(admin.password, 10);

        await User.create({ ...admin, password: hashed });

        console.log(`Created user "${admin.name}" (${admin.email})`);
    }

    console.log("\nSeeding complete.");
};

async function main(): Promise<void> {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("MongoDB connected\n");
        await seedAdmins();
    } catch (error) {
        console.error("Error during seeding:", error instanceof Error ? error.message : error);
        process.exitCode = 1;
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log("\nMongoDB disconnected");
        }
    }
}

void main();
