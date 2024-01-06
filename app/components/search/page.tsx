"use client"
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertTriangle, ChevronUp } from "react-feather";
import { Recipes } from "@prisma/client";
import {Header, Stars} from "../subcomponents/components"


 function MainArea(){

    const[recipes, setRecipes] = useState<Recipes[]>([])
    const [isLoading, setLoading] = useState(true)
    const searchParams = useSearchParams()
    const router = useRouter()
    const searchQuery = searchParams.get("q")

    
    useEffect(()=>{

        const getData = async () =>{
                const url = "/api/search?q="+searchQuery
            try{

                const response = await fetch(url)
                
                let data = await response.json() as Recipes[]

                setTimeout(()=>{

                    setLoading(false)


                },500)

                setRecipes(data)

    
                
                console.log(data)
            }catch(error){

                console.log(error)
            }
            
        }

        getData()
        
    },[searchQuery])
    
        if(isLoading){
            return(

                <div className ="flex flex-row justify-center h-screen w-full bg-slate-50 align-middle items-center ">
                    <ReactLoading className='fill-black' 
                    type='bubbles' color= "black" width={100}></ReactLoading>
                </div> 

            )

        }else{
            return(

        <div className ="flex flex-col items-center gap-2 w-10/12 bg-slate-50 m-10 h-full">
            <div className='flex flex-col p-3 m-5 text-black shadow gap-3 w-full '>
                <h1 className='text-lg font-semibold'>Search Results For { searchQuery?.toLowerCase()}</h1>
            </div>

            {!isLoading?            
                recipes.map((item)=>{
                    return(
                        <div className=" flex flex-col mb-10  w-10/12 justify-between text-black " key={item.id}>
                            <div className="text-2xl text-black">
                                <div className='flex flex-row w-full  rounded gap-3 cursor-pointer p-2 hover:bg-slate-100'
                                onClick={()=>{router.push("/components/recipe/" + item.id)}}>   
                                    <div className='max-w-44 max-h-md rounded'>
                                        <img className= "object-cover"  src={item.picture!} alt={item.name}/>
                                    </div>
                                  
                                    <div className=' flex flex-col gap-3'>
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
                }) : <>
                    <ReactLoading className='fill-black' 
                    type='bubbles' color= "black" width={100}></ReactLoading>                </>}
            
        </div>

    
    )


    }

 }


export default function HomePage() {

    const handlClick = ()=>{

        window.scrollTo(0,0)
    }

    return(
        <div className="flex flex-col bg-slate-200 h-screen">
            <Header/>
            <div className='flex flex-col items-center justify-center  bg-slate-200'>
                <MainArea/>
                <div onClick={handlClick} 
                className='fixed bg-yellow-500 bottom-0 right-0 rounded m-2 p-3 cursor-pointer'>
                   <ChevronUp/>
                </div>
            </div>
        </div>
    )
}