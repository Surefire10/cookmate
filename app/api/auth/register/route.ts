import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { APIResponse } from "../../../lib/types"
import { ErrorMessage } from "formik"
import { NextRequest, NextResponse } from "next/server"


const prisma = new PrismaClient()

export async function POST(req : Request, res: Response ){
    
    const body = await req.json()

    const isUserThere = await prisma.users.findUnique({
        where:{
            username: body.username
        }
    })

    if(!isUserThere){

        try{

            const hashedPassword = await bcrypt.hash(body.password,7)
            const newUser = await prisma.users.create({

                data:{

                    username:  body.username.toLowerCase().trim(),  
                    email:  body.email.toLowerCase().trim(),    
                    password: hashedPassword
                    
                },

            })

            return NextResponse.json({newUser}, {status:200})


        }catch(error){
            return new NextResponse("Error", {status:400})
        }

    }else{

        return NextResponse.json({message:"User already exists"}, {status:400})
    }
}