"use client"
import { Recipes } from "@prisma/client"
import { useEffect, useState } from "react"
import {Accents, Header, Stars} from "../../subcomponents/components"
import ReactLoading from 'react-loading';
import img from "next/image";


function ReviewBox({recipe}: {recipe: Recipes}){

    return(

        <div className="p-9 w-3/5 sm:w-2/4 md:w-2/5 lg:w-1/5 text-xl font-bold align-middle bg-amber-100 rounded ">
            <div className="flex flex-col items-center gap-3">
                <p>
                    Have you tried this recipe?
                    Share your experience with others!
                </p>
                <div className="flex flex-row  items-center text-yellow-500">
                    <Stars id = {recipe.id} number = {0} isChangeable = {true}></Stars>
                    <h2 className="text-sm text-black">({recipe.rating})</h2>

                </div>
            </div>
        </div>
    )
}


// the type of any prop is an object of that prop and its type

function RecipeBox({recipeId}: {recipeId: number}){


    const [recipe , setRecipe] =  useState<Recipes>()

    useEffect(()=>{

        const getData = async () =>{

            const url = "/api/recipeId?id="+recipeId
        try{
    
            const response = await fetch(url)
            let data = await response.json() as Recipes
            setRecipe(data)

    
        }catch(error){

            throw error
        }
        
    }
    
    getData() 
    
     })
    
    if(recipe){

    return(
        <div className="flex flex-col  p-5 text-black  gap-10 bg-slate-50 md:w-4/5 w-10/12 ">
            <div className="flex flex-row  mt-4 items-center justify-between text-xl sm:text-2xl w-11/12">
                <div>
                    <h2 className="font-bold">{recipe.name}</h2>
                </div>
                <div className="flex felx-row items-center gap-1 text-lg font-medium text-yellow-500">
                    <Stars id = {recipe.id} number = {recipe.rating} isChangeable = {false}></Stars>
                    <h2 className="text-sm text-black">({recipe.rating})</h2>

                </div>
            </div>
            <div className="flex flex-col justify-between gap-3 items-center ">
                <div className="m-2 w-4/6 sm:w-3/6 md:2/6 lg:w-3/5">
                    <img className="w-full" src={recipe.picture} alt ={recipe.name}/>
                </div>
                {recipe.heading?
                <div className="mt-5 font-semibold md:w-11/12">
                    <p>{recipe.heading}</p>
                </div>
                : <></>}
            </div>
    
            <div className="">
                <div>
                    <h3 className="text-xl font-bold mt-2 mb-2 md:text-2xl">Ingredients:</h3>
                    <ul className="font-medium">
                    {recipe.ingredients.map((ingredient, index)=>{
                    
                    return(
                        <li className="mt-3 ml-2" key={index}>{ingredient}</li>
                    )
                    })}
                    </ul>
                </div>
            </div>
            <div className="">
                <h3 className="text-xl font-bold mt-2 mb-2 md:text-2xl">Directions:</h3>
                <ul className="font-medium">
                {recipe.directions.map((directions, index)=>{
                
                return(
                    <li className="mt-3 ml-2" key={index}>{directions}</li>
                )
                })}
                </ul>
            </div>
            {recipe.additional?
            <div>
                <h2 className="text-xl font-bold mt-2 mb-2 md:text-2xl">Chef&apos;s Notes:</h2>
                <p className="font-medium text-lg">{recipe.additional}</p>
            </div>
            :<></>}
            <div className="flex justify-center">
                <ReviewBox recipe={recipe}></ReviewBox>
            </div>
        </div>
    )
    }else{

        return(

            <div className ="flex flex-row justify-center h-screen w-full align-middle items-center bg-slate-50">
                    <ReactLoading 
                    type='bubbles' color="black" width={100}></ReactLoading>
            </div> 
        )
    }
    
}


export default function RecipePage({params}:{params:{id:number}}){

    let recipeId = params.id.valueOf()


    return(

        <div className="bg-slate-200 shadow-lg ">
            <Header/>
            <div className="flex flex-col justify-between bg-slate-200 items-center flex-grow mt-5">
                <RecipeBox recipeId={recipeId}/>
            </div>
            <Accents/>
        </div>        

       
    )
}