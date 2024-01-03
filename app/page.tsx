"use client"
import ReactLoading from 'react-loading';
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, User, BookOpen,Menu, X, Star,ChevronUp, ChevronDown, Search,LogOut, LogIn,AlertTriangle} from "react-feather";
import { Recipes } from "@prisma/client";
import Link from 'next/link';
import './globals.css'
import { signIn, signOut, useSession } from 'next-auth/react';
import { Session } from 'inspector';
import img from 'next/image';
import { Header, Stars } from './components/subcomponents/components';









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

                <div className ="flex flex-row justify-center h-screen align-middle items-center ">
                    <ReactLoading className='fill-black' 
                    type='bubbles' color= "black" width={100}></ReactLoading>
                </div> 

            )

        }else{
            return(

        <div className ="flex flex-col items-center gap-2 w-10/12 bg-slate-50 m-10">
            <div className='flex flex-col items-center p-3 m-5 text-black shadow gap-3 w-full '>
                <h1 className='text-4xl font-semibold'>Are you a foodie?</h1>
                <p className='text-xl font-medium'>Find, share and discover recipes from
                all over the world.</p>
            </div>

            {isConnected?            
                recipes.map((item)=>{
                    return(
                        <div className=" flex flex-col mb-10 justify-between text-black items-center" key={item.id}>
                            <div className="text-2xl text-black ">
                                <div className='cursor-pointer w-5/6 overflow-hidden mt-0 mb-0 ml-auto mr-auto'
                                onClick={()=>{router.push("/components/recipe/" + item.id)}}
                                >   
                                <div className='max-w-md max-h-md'>
                                    <img className= "object-cover"  src={item.picture!} alt={item.name}/>
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

    )
 }}  



export default function HomePage(){


    const handlClick = ()=>{

        window.scrollTo(0,0)
    }


    return(
        
        <div className="flex flex-col bg-slate-200 ">
            <Header/>
            <div className='flex flex-col items-center justify-center align-middle'>
                <MainArea/>
                <div onClick={handlClick} 
                className='fixed bg-yellow-500 bottom-0 right-0 rounded m-2 p-3 cursor-pointer'>
                   <ChevronUp/>
                </div>
            </div>
        </div>
        
    )
}


