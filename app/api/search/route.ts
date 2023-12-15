import { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(req:NextRequest){
    
    let searchQuery = req.nextUrl.searchParams.get("q")?.toLowerCase()
    try{
        const recipes = await prisma.recipes.findMany({

            where:{
                OR:[
                    {
                        name:{
                            contains: searchQuery,
                            mode:'insensitive'
                        }
                    }
    
                ]
            }
        })
        
        return Response.json(recipes)


    }catch(error){

        return Response.json({message: "OOPS",status: 500})

    }
}