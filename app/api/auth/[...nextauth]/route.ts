import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const registerOrLoginUrl = process.env.API_BASE_URL
  ? `${process.env.API_BASE_URL}/register-or-login`
  : "http://localhost:8080/register-or-login";
let jwtToken 
export const authOptions = {
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
      async authorize(credentials) {
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

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Authentication failed");
          }

          return {
            id: data.userId, // Access id from data.user
            email: credentials.email,
            token: data.token,
          };
        } catch (error) {
          console.error("Authentication failed:", error.message);
          throw new Error(error.message || "Internal server error");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          const response = await fetch(registerOrLoginUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: profile.given_name || user.name.split(" ")[0],
              lastName: profile.family_name || user.name.split(" ").slice(1).join(" "),
              email: user.email,
              password: "random-placeholder-password",
              provider: account.provider,
            }),
          });
          const data = await response.json();

          if (!response.ok) throw new Error(data.message);

          console.log("User registered or logged in successfully.");
          console.log("google login data", data);
          jwtToken = data.token
          return {
            id: "safdsafsd", // Access id from data.user
            email: user.email,
            token: data.token,
          };
        } catch (error) {
          console.error("Error in Google sign-in:", error.message);
          return false;
        }
      }
        // For credentials login or other providers, return true
  return true;
    },
    async jwt({ token, user }) {
      console.log("user", user);
      console.log("token", jwtToken);
      if (user) {
        token.id = user.id; // user.id should be available here
        token.email = user.email;
        token.jwt  = user.token;
      }
      console.log("JWT token:", token); // Logs enriched token

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        jwt: token.jwt,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };