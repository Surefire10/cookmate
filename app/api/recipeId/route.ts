import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient()

export async function GET(req:NextRequest){
    const session = await getServerSession(authOptions)

    let searchParam = req.nextUrl.searchParams.get("id")
    if(searchParam){
    let recipeId = parseInt(searchParam)


    
    try{
        const recipeById = await prisma.recipes.findFirst({

            where:{
                id:recipeId
            }
        });

    if(recipeById){

        return NextResponse.json(recipeById,{status: 200})


    }else{

        // return NextResponse.json({message: "Not found"},{status: 500})
        return NextResponse.json({session:session})

    }


    }catch(error){

        throw error
    }
    }
}