import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"


const prisma = new PrismaClient()

export async function POST(req : NextRequest){


    const body = await req.json()

        const loggedInUser = await prisma.users.findUnique({
            where:{
                username: body.username.toLowerCase()
            }
        })
    
        if(loggedInUser){
    
            return NextResponse.json(loggedInUser, {status:200})
    
        }else{
    
            return new NextResponse("User not found", {status:400})
        }

    }



