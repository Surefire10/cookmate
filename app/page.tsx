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
            <div className='flex flex-col flex-wrap items-center p-3 mt-10 text-black shadow-lg bg-slate-50 w-10/12'>
                <h1 className='text-2xl font-semibold md:text-3xl '>Are you a foodie?</h1>
                <p className='text-lg font-medium'>Find, share and discover recipes from
                all over the world.</p>
            </div>

            <div className ="flex flex-col items-center gap-2 p-5 bg-slate-50 mt-8 w-10/12
                            md:grid
                            md:grid-cols-2
                            md:gap-5
                            md:p-10
                            ">
                {isConnected?            
                    recipes.map((item)=>{
                        return(
                            <div className=" flex flex-col mb-10 justify-between text-black items-center" key={item.id}>
                                <div className="text-2xl text-black ">
                                    <div className='cursor-pointer overflow-hidden mt-0 mb-0 ml-auto mr-auto'
                                    onClick={()=>{router.push("/components/recipe/" + item.id)}}
                                    >   
                                    <div className='max-w-sm max-h-sm'>
                                        <img className= "object-cover h-60 w-full "  src={item.picture!} alt={item.name}/>
                                    </div>
                                    
                                        <h2 className='font-bold cursor-pointer hover:underline hover:decoration-yellow-500 hover:decoration-2 hover:underline-offset-8'>
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
        
        <div className="flex flex-col bg-slate-200 h-fityy ">
            <Header/>
            <div className='flex flex-col items-center justify-center align-middle'>
                <MainArea/>
               <Accents/>
            </div>
        </div>
        
    )
}


