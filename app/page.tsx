"use client"
import ReactLoading from 'react-loading';
import {useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronUp, Edit2,AlertTriangle} from "react-feather";
import { Recipes } from "@prisma/client";
import './globals.css'

import { Accents, Header, Stars } from './components/subcomponents/components';









 function MainArea(){

    const[recipes, setRecipes] = useState<Recipes[]>([])
    const [isLoading, setLoading] = useState(true)
    const [isConnected, setConnected] = useState(true)
    const router = useRouter()



    useEffect(()=>{

        const getData = async () =>{
                const url = "/api/recipeController"
            try{

                const response = await fetch(url)
                let data = await response.json() as Recipes[]
                setLoading(false)
                setRecipes(data)
                if(response.status === 500){

                    setConnected(false)

                }
            }catch(error){

                throw error
            }
            
        }

        getData()
        
    },[])
        if(isLoading){
            return(

                <div className ="flex flex-row justify-center h-screen w-full align-middle items-center bg-slate-50">
                    <ReactLoading className='fill-black' 
                    type='bubbles' color= "black" width={100}></ReactLoading>
                </div> 

            )

        }else{
            return(

        <div className='flex flex-col flex-wrap items-center w-full shadow-lg '>
            <div className='flex flex-col text-center flex-wrap items-center p-3 mt-10 text-black shadow-lg bg-slate-50 w-10/12'>
                <h1 className='text-2xl font-semibold md:text-3xl '>Are you a foodie?</h1>
                <p className='text-lg font-medium'>Find, share and discover recipes from
                all over the world.</p>
            </div>

            <div className ="flex flex-col items-center gap-2 p-6 bg-slate-50 mt-8 w-10/12
                            sm:grid
                            sm:auto-col-fr
                            sm:grid-cols-2
                            sm:grid-row-2
                            sm:gap-5
                            sm:p-5
                            lg:grid-cols-3
                            ">
                {isConnected?            
                    recipes.map((item)=>{
                        return(
                            <div className=" flex flex-col mb-10 justify-between text-black items-center h-full" key={item.id}>
                                <div className="text-2xl text-black sm:mt-5">
                                    <div className='cursor-pointer overflow-hidden mt-0 mb-0 ml-auto mr-auto'
                                    onClick={()=>{router.push("/components/recipe/" + item.id)}}
                                    >   
                                    <div className=''>
                                        <img className= "object-cover lg:w-96 md:h-80 h-60 w-80"  src={item.picture!} alt={item.name}/>
                                    </div>
                                    
                                        <h2 className='md:text-xl font-bold cursor-pointer hover:underline hover:decoration-yellow-500 hover:decoration-2 hover:underline-offset-8'>
                                            {item.name}
                                        </h2>
                                        <div className='flex flex-row mt-2 text-yellow-500'>
                                            <Stars id = {item.id} number = {item.rating} isChangeable = {false}></Stars>
                                            <h2 className="text-sm text-black">({item.rating})</h2>

                                        </div>
                                    </div>
                                </div> 
                            </div>
                        )
                    }):
                <div className='text-black font-semibold bg-green  flex flex-row  gap-5 h-screen p-10'>
                    <div>
                    <AlertTriangle></AlertTriangle>
                    </div>
                    <div>
                        <p>No Internet Connection.</p>
                        <p>Please check your network.</p>
                    </div>
                
                    </div>}
                
            </div>
    </div>

    )
 }}  


 


export default function HomePage(){


   

    return(
        
        <div className="flex flex-col bg-slate-200  ">
            <Header/>
            <div className='flex flex-col items-center justify-center flex-grow align-middle'>
                <MainArea/>
            </div>
            <Accents/>
        </div>
        
    )
}


