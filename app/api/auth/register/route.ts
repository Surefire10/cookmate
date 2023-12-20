import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(req : Request){


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

                    username:  body.username,  
                    email:  body.email,    
                    password: hashedPassword
                    
                },

            })

            return Response.json(newUser, {status: 200})


        }catch(error){
            console.log(error)
            return Response.json({message: "Error adding a user", status: 500, error: error})
        }

    }
}9