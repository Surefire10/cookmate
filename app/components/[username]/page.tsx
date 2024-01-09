"use client"
import { Recipes } from "@prisma/client"
import { useEffect, useState } from "react"
import {Accents, Header, Stars} from "../subcomponents/components"
import ReactLoading from 'react-loading';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


function ReviewBox({recipe}: {recipe: Recipes}){

    return(

        <div className="p-8 w-2/4 text-xl font-bold align-middle bg-amber-100 ">
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

function RecipeBox({currentUser}: {currentUser:string}){


    const [userRecipes , setUserRecipes] =  useState<Recipes[]>([])
    const [isLoading , setLoading] =  useState(true)

    useEffect(()=>{

        const getData = async () =>{

            const url = "/api/user?username="+currentUser
        try{
    
            const response = await fetch(url)
            let data = await response.json() as Recipes[]
            setLoading(false)
            console.log(data)
            setUserRecipes(data)

    
        }catch(error){

            throw error
        }
        
    }
    
    getData() 
    
     },[])

    if(!isLoading){
        return(

            <div className="flex flex-col items-center justify-center bg-slate-200 w-10/12 flex-grow ">
                
                {!userRecipes.length?
                
                userRecipes.map((recipe)=>{

                    return(

                        <div className="flex flex-col p-5 text-black w-11/12 gap-10 bg-slate-50 sm:w-4/5  border-t-gray-500 border-t " key={recipe.id}>
                            <div className="flex flex-row mt-4 items-center justify-between text-2xl md:text-3xl md:w-11/12">
                                <div>
                                    <h2 className="font-bold">{recipe.name}</h2>
                                </div>
                                <div className="flex felx-row items-center gap-1 text-lg font-medium text-yellow-500">
                                    <Stars id = {recipe.id} number = {recipe.rating} isChangeable = {false}></Stars>
                                    <h2 className="text-sm text-black">({recipe.rating})</h2>

                                </div>
                            </div>
                            <div className="flex flex-col justify-between gap-3  items-center">
                                <div className="m-2 w-3/5 md:w-3/6 lg:w-3/6">
                                    <img src={recipe.picture} alt={recipe.name}/>
                                </div>
                                {recipe.heading?
                                <div className="mt-5 font-semibold md:w-11/12">
                                    <p>{recipe.heading}</p>
                                </div>
                                :<></>}
                            </div>
    
                            <div className="md:ml-5">
                                <div>
                                    <h3 className="text-xl font-bold mt-2 mb-2 md:text-2xl">Ingredients:</h3>
                                    <ul className="font-medium">
                                    {recipe.ingredients.map((ingredient,index)=>{
                                    
                                    return(
                                        <li className="mt-3 ml-2" key = {index}>{ingredient}</li>
                                    )
                                    })}
                                    </ul>
                                </div>
                            </div>
                            <div className="md:ml-5">
                                <h3 className="text-xl font-bold mt-2 mb-2 md:text-2xl">Directions:</h3>
                                <ul className="font-medium">
                                {recipe.directions.map((directions, index)=>{
                                
                                return(
                                    <li className="mt-3 ml-2" key = {index}>{directions}</li>
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
                            <div className="flex justify-center ">
                                <ReviewBox recipe={recipe}></ReviewBox>
                            </div>
                     </div>
                    )
                }): 
                <div className="flex flex-col text-center  h-screen w-11/12 m-2 bg-slate-50 text-black font-semibold">
                    
                    <div className="mt-10">
                        <p className="text-2xl mt-5">You haven't added any recipes yet.</p>
                        <p className="text-lg mt-5">Whenever you add a recipe, it get's displayed here.</p>
                        <p>To add a recipe, <a className="hover:bg-yellow-500 hover:cursor-pointer" href="/components/compose">click here.</a> Or click the yellow pen button at the bottom right.</p>
                    </div>
                  
                </div>
                }
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


export default function Profile({params}:{params:{username:string}}){

    const router = useRouter()
    const currentUser = params.username
    const session = useSession({
        required: true,
        onUnauthenticated() {
            
            router.push("/not-found")

        },})

        return(

            <div className="bg-slate-200">
                <Header/>
                <div className="flex flex-col justify-between items-center  mt-5 flex-grow ">
                    <RecipeBox currentUser={currentUser}/>
                </div>
                    <Accents/>
            </div>
    
           
        )

        




}

    

    



