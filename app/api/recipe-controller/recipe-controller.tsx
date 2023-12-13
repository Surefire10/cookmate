

import { PrismaClient } from "@prisma/client";
import { NextApiRequest,NextApiResponse } from "next";


const prisma = new PrismaClient()
 async function addRecipe(req : NextApiRequest, res : NextApiResponse){


    const body = req.body;
    try{
    const newRecipe = await prisma.recipe.create({

        data:{

            name:body.name,
            published_by: body.published_by,  
            content: body.content,
            rating: body.rating
            
        },
    });
    
    return res.status(200).json(newRecipe);

    }catch(error){

        res.status(500).json({message: "Error adding a recipe"})
    }


}


async function getAllRecipes(req : NextApiRequest, res : NextApiResponse){
    
    try{
        const recipes = prisma.recipe.findMany();
        return res.status(200).json(recipes)


    }catch(error){

        return res.status(500).json({message: "error getting recipes"})

    }
}



export default async function handler(req: NextApiRequest, res: NextApiResponse){

    console.log(req.body)
    if (req.method === "POST"){

        return await addRecipe(req,res)

    }else if(req.method === "GET"){

        return await getAllRecipes(req,res)
    }else{

    return res.json({message: "no"})
    }
}



























