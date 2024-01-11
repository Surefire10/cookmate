"use client"
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Recipes } from "@prisma/client";
import {Accents, Header, Stars} from "../subcomponents/components"


 function MainArea(){

    const[recipes, setRecipes] = useState<Recipes[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const searchParams = useSearchParams()
    const router = useRouter()
    const searchQuery = searchParams.get("q")

    
    useEffect(()=>{

        const getData = async () =>{
                const url = "/api/search?q="+searchQuery
            try{
                const response = await fetch(url)
                
                let data = await response.json() as Recipes[]
                setRecipes(data)
                setLoading(false)
                console.log(data)
    
                
            }catch(error){

                console.log(error)
            }
            
        }

        getData()
        
    },[searchQuery])
    
        if(isLoading){
            return(

                <div className ="flex flex-row justify-center h-screen w-full bg-slate-200 align-middle items-center ">
                    <ReactLoading type='bubbles' color= "black" width={100}/>
                </div> 

            )

        }else{
            return(

            <div className='flex flex-col items-center w-11/12'>

                <div className='flex flex-col p-3 m-5 text-black shadow gap-3 w-full bg-slate-50 '>
                    <h1 className='text-lg font-semibold'>Search Results For { searchQuery?.toLowerCase()}</h1>
                </div> 
                <div className ="flex flex-col items-center gap-1 w-11/12 bg-slate-50 m-5 h-fit flex-grow p-3
                  lg:grid
                  lg:auto-col-fr
                  lg:grid-cols-2
                  lg:grid-row-2
                  lg:gap-5
                  lg:p-5
                
                ">
                        
                    {recipes.length? 
                    recipes.map((item)=>{
                        return(
                            <div className=" flex flex-col m-2 w-11/12 sm:w-full justify-between text-black  border-b-2  " key={item.id}>
                                <div className="text-2xl text-black">
                                    <div className='flex flex-row w-full  rounded gap-3 cursor-pointer sm:p-2 hover:bg-slate-100'
                                    onClick={()=>{router.push("/components/recipe/" + item.id)}}>   
                                        <div className='max-w-44 lg:max-w-44  max-h-md rounded'>
                                            <img className= "object-cover sm:h-48 sm:w-60  "  src={item.picture!} alt={item.name}/>
                                        </div>
                                    
                                        <div className=' flex flex-col gap-5'>
                                            <h2 className='font-bold cursor-pointer hover:underline hover:decoration-yellow-500 hover:decoration-2 hover:underline-offset-8 mt-3'>
                                                {item.name}
                                            </h2>
                                            <div className='flex flex-row mt-2 text-yellow-500'>
                                                <Stars id = {item.id} number = {item.rating} isChangeable = {false}></Stars>
                                                <h2 className="text-sm text-black">({item.rating})</h2>

                                            </div>
                                        </div>
                                    
                                    </div>
                                </div> 
                                
                            
                            </div>
                        )
                    }) : <div className='text-black font-semibold'>No search results</div>}
                
            </div>
        </div>
    
    )


    }

 }


export default function HomePage() {



    return(
        <div className="flex flex-col bg-slate-200 h-screen">
            <Header/>
            <div className='flex flex-col items-center justify-center flex-grow  bg-slate-200'>
                <MainArea/>
            </div>
            <Accents></Accents>
        </div>
    )
}