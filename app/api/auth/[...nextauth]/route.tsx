import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"
import CredentialProvider from 'next-auth/providers/credentials';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()

export const authOptions:NextAuthOptions = {
    
    providers: [
    CredentialProvider({

      // we don't need this we have our own in place  
      name: 'credintials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        if(!credentials?.username || !credentials?.password){

            return null
        }


        const loggedInUser = await prisma.users.findUnique({
    
            where:{
                username:  credentials.username.toLowerCase()  
            }
        })
        
        if(!loggedInUser){

            return null
        }

        
        const isMatching = await compare(credentials.password,
          loggedInUser!.password)


        
        if(!isMatching){

          return null
    
        }

        console.log(loggedInUser)
       
        return {
          //these property names are predefined 
          //and we have to use them
          //so something like 
          //username:loggedInUser would make the object empty

          id:loggedInUser.id.toString(),
          email:loggedInUser.email,
          name:loggedInUser.username,
          createdAt:loggedInUser.createdAt

          
        }
      }
    
  })  
  ],
  session:{
    strategy:"jwt"
  },

  pages:{

    signIn: "/auth/log-in",
    signOut: "/auth/sign-out"

  }
};

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}