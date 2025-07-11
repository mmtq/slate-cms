import { adminClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'


export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!,
    plugins: [
        adminClient({
            
        })
    ]
})

export const { signUp, signIn, signOut, admin, useSession } = authClient