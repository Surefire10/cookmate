

import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()
export async function POST(req : Request){

    
    const body = await req.json()
    try{
    const newRecipe = await prisma.recipes.create({

        data:{

        
            name:body.recipeTitle,
            published_by: "Jack",
            heading: body.recipeHeading,
            ingredients: body.recipeIngredients,
            directions: body.recipeSteps,
            additional: body.recipeNotes,
            rating: 0
            
        },
    });

    console.log(newRecipe.ingredients)
    return Response.json(newRecipe,{status:200});

    }catch(error){
        console.log(error)
        return Response.json({message: "Error adding a recipe", status: 500, error: error})
    }


}


export async function GET(req:Request){
    
    try{
        const recipes = await prisma.recipes.findMany();
        return Response.json(recipes)


    }catch(error){

        return Response.json({message: "OOPS",status: 500})

    }
}


export async function DELETE(req:Request){

    try{

        const recipes = await prisma.recipes.deleteMany({});


    }catch(error){

        return Response.json({message: "OOPS",status: 500})

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

      console.log("yes")
      return Response.json({updateRecipe ,status: 200})

    
    }catch{
        
        return Response.json({message: "OOPS",status: 500})

    }
    

}




























