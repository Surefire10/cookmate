import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient

export async function GET(req:NextRequest){

    let username = req.nextUrl.searchParams.get("username")

    console.log(username + " on serve")

    if(username){

        try{

        
            const recipes = await prisma.recipes.findMany({
    
                where:{
    
                    published_by:username
                }

            })

            return NextResponse.json(recipes, {status: 200})
    
    
        }catch(error){
    
            return NextResponse.json({message: "Couldn't fetch recipes"},{status: 500})
    
        }


    }


    
  
}