import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"


const prisma = new PrismaClient()

export async function POST(req : NextRequest){

    let validator = req.nextUrl.searchParams.get("v")

    const body = await req.json()
    if(validator === "username"){

        const isUserThere = await prisma.users.findUnique({
            where:{
                username: body.username.toLowerCase()
            }
        })
    
        if(!isUserThere){
    
            return new NextResponse("Username is available.", {status:200})
    
        }else{
    
            return new NextResponse("User already exists.", {status:400})
        }

    }else if(validator === "email"){


        const isEmailThere = await prisma.users.findUnique({
            where:{
                email: body.email.toLowerCase()
            }
        })
    
        if(!isEmailThere){
    
            return new NextResponse("Email is available.", {status:200})
    
        }else{
    
            return new NextResponse("Email already in user.", {status:400})
        }

  
    }
}


