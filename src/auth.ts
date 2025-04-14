import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';

export const { handle } = SvelteKitAuth({
        providers: [
                GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })
        ],
        // Optional callbacks
        // callbacks: {
        //     async jwt({ token, account }) {
        //         if (account) token.accessToken = account.access_token;
        //         return token;
        //     },
        //     async session({ session, token }) {
        //         //@ts-ignore
        //         session.access_token = token.accessToken;
        //         return session;
        //     }
        // }
});
