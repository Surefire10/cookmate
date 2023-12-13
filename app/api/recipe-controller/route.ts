

import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()
export async function POST(req : Request){


    const body = await req.json()
    try{
    const newRecipe = await prisma.recipe.create({

        data:{

            name:body.name,
            published_by: body.published_by,  
            content: body.content,
            rating: body.rating
            
        },
    });
    
    return Response.json(newRecipe,{status:200});

    }catch(error){

        Response.json({message: "Error adding a recipe", status: 500})
    }


}


export async function GET(req:Request){
    
    try{
        const recipes = prisma.recipe.findMany();
        return Response.json(recipes,{status: 200})


    }catch(error){

        return Response.json({message: "OOPS",status: 200})

    }
}































