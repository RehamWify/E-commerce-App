/*
    token => localstorage => client

    token  cookie

    next auth => token cookies  http only secret key

*/
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { email, json, object } from "zod";
import { jwtDecode } from "jwt-decode";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "text" },
      },

      // login
      authorize: async function (credentials) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const payload = await response.json();

        console.log(payload);

        if (payload.message === "success") {
          const { id }: { id: string } = jwtDecode(payload.token);

          return {
            id: id,
            user: payload.user,
            token: payload.token,
          };
        }

        throw new Error(
          payload.message || "failed to login email or password incorrect"
        );
      },
    }),
  ],

  callbacks: {

    // server token

    async jwt({ token, user }) {

        if(user){
            token.user = user?.user
            token.token = user?.token

        }


      return token;
    },

    async session({ session, token }) {

        if(token){
            session.user = token?.user
        }
      return session
    },
  },
};

/*

next js => framework based on react  =>  fullstack => route handlers

backend => route handlers

api 

www.hamada.com/users

http://localhost:3000/api/users
*/
