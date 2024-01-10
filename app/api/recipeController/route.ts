

import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()
export async function POST(req : Request){

    
    const body = await req.json()

    try{
    const newRecipe = await prisma.recipes.create({
        
        data:{

        
            name:body.name,
            published_by: body.published_by,
            heading: body.heading,
            ingredients: Object.values(body.ingredients),
            directions: Object.values(body.directions),
            additional: body.additional,
            rating: body.rating,
            picture:body.picture,
            
            
        },
    });

    return NextResponse.json(newRecipe,{status:200});

    }catch(error){
        return NextResponse.json({error: error}, {status: 500})
    }


}


export async function GET(req:Request){

    
    try{

        
        const recipes = await prisma.recipes.findMany();
        return NextResponse.json(recipes, {status: 200})


    }catch(error){

        return NextResponse.json({message: "Couldn't fetch recipes"},{status: 500})

    }
}


export async function DELETE(req:Request){

    try{

        const recipes = await prisma.recipes.deleteMany({});


    }catch(error){

        return NextResponse.json({message: "Couldn't delete recipe",status: 500})

    }

}


export async function PATCH(req:Request){


    const body = await req.json()

    try{
    const updateRecipe = await prisma.recipes.update({
        where: {
          id: body.id
        },
        data: {
          rating: body.rating
        },
      })

      return NextResponse.json({updateRecipe},{status: 200})

    
    }catch{
        
        return NextResponse.json({message: "Couldn't update recipe"},{status: 500})

    }
    

}




























