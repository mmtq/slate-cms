import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import {admin} from 'better-auth/plugins'
import * as schema from './db/schema/auth-schema'


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        autoSignIn: false,
        requireEmailVerification: false
    },
    session: {
        expiresIn: 60 * 60 * 24 * 30,
    },
    account:{
        accountLinking:{
            enabled: true
        }
    },
    advanced: {
        database:{
            generateId: () => {
                return crypto.randomUUID();
            }
        }
    },
    plugins: [
        admin({
            defaultRole: "user",
            adminRoles: ["admin"]
        }),
    ],
    databaseHooks:{
        user:{
            create: {
                before: async (user) =>{
                    return {
                        data:{
                            ...user,
                            role: "user"
                        }
                    }
                }
            }
        }
    }
});