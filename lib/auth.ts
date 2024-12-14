import { NextResponse } from "next/server";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { Session, User, Account, Profile } from "next-auth";
import { JWT } from "next-auth/jwt";

const registerOrLoginUrl = process.env.API_BASE_URL
  ? `${process.env.API_BASE_URL}/register-or-login`
  : "http://localhost:8080/register-or-login";

const revokeTokenUrl = `${process.env.API_BASE_URL}`
  ? `${process.env.API_BASE_URL}/sign-out`
  : "http://localhost:8080/sign-out";

// Define the User type
interface CustomUser extends User {
  id: string;
  email: string;
  token: string;
}

interface CustomProfile extends Profile {
  given_name: string;
  family_name: string;
  first_name: string;
  last_name: string;
}

// Extend the Session type to include id and token
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      token: string;
    };
  }
}


// Define the auth options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User | null> {

        if (!credentials) {
          return null;
        }
        try {
          const response = await fetch(registerOrLoginUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
              provider: "credentials",
            }),
          });
          console.log("authOptions", credentials);

          const data = await response.json();
          console.log("resposne is here", response);
          console.log("data", data);

          if (response.ok) {
            // Return a User object
            return {
              id: data.id,
              email: data.email,
              token: data.token,
            } as CustomUser;
          } else {
            // Return null if login failed
            NextResponse.json({ message: "Login failed", success: false });
            return null;
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error("Authentication failed:", error.message);
            NextResponse.json({ message: "Login failed", success: false });

            return null;
          } else {
            console.error("Authentication failed:", error);
            NextResponse.json({ message: "Login failed", success: false });

            return null;
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const, // Ensure this is a valid SessionStrategy value
    maxAge: 48 * 60 * 60,
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT;
      user?: CustomUser | User;
      account?: Account | null;
      profile?: Profile;
      isNewUser?: boolean | undefined;
    }) {
      if (account && profile) {
        const customProfile = profile as CustomProfile;

        try {
          const body = {
            firstName: "",
            lastName: "",
            password: "",
            email: profile.email,
            provider: account.provider,
          };

          // Add provider-specific logic
          if (account.provider === "google") {
            body.firstName = customProfile.given_name || "Google";
            body.lastName = customProfile.family_name || "User";
            body.password = `google-${profile.email}-${Date.now()}`; // Placeholder password
          } else if (account.provider === "facebook") {
            body.firstName = customProfile.first_name || "Facebook";
            body.lastName = customProfile.last_name || "User";
            body.password = `facebook-${profile.email}-${Date.now()}`; // Placeholder password
          } else if (account.provider === "github") {
            body.firstName = customProfile.name?.split(" ")[0] || "Github";
            body.lastName = customProfile.name?.split(" ")[1] || "User";
            body.password = `github-${profile.email}-${Date.now()}`; // Placeholder password
          } else {
            throw new Error(`Unsupported provider: ${account.provider}`);
          }

          // Send the request to your backend
          const response = await fetch(registerOrLoginUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          const data = await response.json();

          if (!response.ok)
            throw new Error(data.message || "Social login failed");

          // Enrich the token with backend data
          token.id = data.userId; // Backend user ID
          token.email = profile.email;
          token.token = data.token; // JWT from backend
        } catch (error) {
          if (error instanceof Error) {
            console.error(`Error in ${account.provider} login:`, error.message);
          } else {
            console.error(`Error in ${account.provider} login:`, error);
          }
        }
      } else if (user) {
        // For credentials or non-social logins
        token.id = user.id;
        token.email = user.email;
        if ('token' in user) {
            token.token = (user as CustomUser).token;
          }
      }

      console.log("Final JWT token:", token); // Debugging
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
   
    }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        token: token.token as string,
      };
      return session;
    },
  },
  events: {
    async signOut({ token }: { token: JWT }) {
      // Revoke backend token when signing out
      try {
        const response = await fetch(revokeTokenUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token.token }),
        });

        if (!response.ok) {
          console.error(
            "Failed to revoke token on backend:",
            await response.json()
          );
        } else {
          console.log("Backend token revoked successfully");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error revoking token:", error.message);
        } else {
          console.error("Error revoking token:", error);
        }
      }
    },
  },
};
