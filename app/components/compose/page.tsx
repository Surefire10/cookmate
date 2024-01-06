
"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {Field, Formik, Form} from "formik"

import {Header} from "../subcomponents/components"
import * as Yup from "yup"
import { Button } from '@chakra-ui/react';
import { UploadButton } from '../../utils/uploadthing';
import { UploadFileResponse } from 'uploadthing/client';

const errorMessage={

    color:"red",
    fontWeight:"bold"

}




function MainArea(){


    const starterArraySteps = [

        <Field key = {0}></Field>
    ]

    const starterArrayingredients = [

        <Field key = {0}></Field>
    ]

    
    



    const[imageObject ,setImageObject] = useState<UploadFileResponse<{uploadedBy: any}>>()
    const[imageUploadError ,setImageUploadError] = useState("")


    const [ingredientArray, setNumberOfIngredients] = useState(starterArrayingredients)
    const [stepsArray, setNumberOfSteps] = useState(starterArraySteps)

    const [recipeIngredients ,setIngredients] = useState<string[]>([])
    const [recipeSteps ,setSteps] = useState<string[]>([])


    const router = useRouter()
    const handleAddIngredients= () =>{
        let counter = 1
        setNumberOfIngredients(existing =>{

            return [
                ...existing,<Field as= "text" key= {counter}></Field>

            ]
        })
        counter++

    }
    const handleSubtractIngredients = (index :number) =>{
        
        if(index > 0){
            const list= [...ingredientArray]
            list.splice(index,1)
            setNumberOfIngredients(list)
            delete recipeIngredients[index]

        }
    }

    const handleAddSteps = () =>{
        let counter = 1

        setNumberOfSteps(existing =>{

            return [
                ...existing,<Field key = {counter}></Field>
            ]
        })

        counter++
    }

    const handleSubtractSteps = (index :number) =>{
        
        if(index > 0){

            const list = [...stepsArray]
            list.splice(index,1)
            setNumberOfSteps(list)
            delete recipeSteps[index]

            
        }
    }

    const handleIngredientsChange = (index :number, e:React.ChangeEvent<HTMLInputElement>) =>{

        setIngredients(current => {return{
            //the square brackets is to indicte that index is a variable
            ...current,
            [index] :e.target.value
    }})

        
    }

    const handleStepsChange = (index :number, e:React.ChangeEvent<HTMLInputElement>) =>{

        setSteps(current => {return{
            ...current,
            [index]: e.target.value
        }})    
    }

    const session = useSession()



    const handleSubmit = async(values: {

        title: string;
        header: string;
        notes: string;

    }) =>{

        if(imageObject){
            const body = {

                name: values.title,
                published_by: session.data?.user.name,
                heading: values.header,
                ingredients: recipeIngredients,
                directions:  recipeSteps,
                additional:   values.notes,
                rating:       0,
                picture:        imageObject.url
            }

            console.log(body)

            try{
            const response = await fetch("/api/recipeController",{

                method: "POST",
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify(body),

            })

            const res = await response.json()

            console.log(res)

            if(response.status !== 200){

                console.log("yo idk")
            }else{
                setTimeout(()=>{
                    router.push("/")
                },1000)

            }}catch(error){

            }

        }else{

            console.log("upload an image")
        }

    }

    const validationSchema = Yup.object({

        title: Yup.string()
        .required("Please add a title to your recipe.")
        .min(3, "Recipe title is too short!"),


        header: Yup.string()
        .required("Please add a short description of your recipe.")
        ,

        
        
        
        
    })
    
    return(

        <div className="flex flex-col w-10/12 text-black bg-slate-200 sm:w-4/6  gap-5 m-5">
            <div className="flex flex-col gap-3 p-8 ">
                <h2 className='text-3xl font-semibold mt-4'>Submit a new Recipe?</h2>
                <p className='text-xl font-semibold'>Fill in the fields below!</p>
            </div>

            <div className = "flex flex-row justify-center">
                <Formik
                    
                    initialValues={{title: "",
                        header: "",
                        ingredients :[],
                        steps: [],
                        notes: "" 
                    }}
                    onSubmit={(values)=>handleSubmit(values)}
                    validationSchema={validationSchema}>

                    {({errors, touched})  => (
                            <Form className='flex flex-col gap-5 w-10/12 '>

                                <p className='font-medium text-lg mb-2 mt-2 sm:text-xl'>What is your recipe called?</p>
                                <Field as = "textarea"  name="title" className="p-2"/>
                                {errors.title && touched.title? (
                                    <div style={errorMessage}>{errors.title}</div>
                                ) : null}
                                
                                <div className='flex flex-col gap-5'>
                                    <p className='font-medium text-lg sm:text-xl'>Upload a picture showing your finished dish.</p>
                                    <UploadButton
                                    endpoint='imageUploader'
                                    className='-p-5 text-black'
                                    onClientUploadComplete={async (response)=>{
                                        setImageObject(response[0])
                                    }}
                                    onUploadError={(error)=>{
                                        setImageUploadError(error.message)
                                    }}
                                    />

                                    {imageObject?
                                    <div className='text-center font-semibold'>
                                        <p>Image Uploaded: {imageObject.name}</p>
                                    </div>
                                   
                                    : <div className='text-center font-semibold text-red-600'>
                                    <p>{imageUploadError}</p>
                                    </div>
                                    }
                                    
                                </div>
                                <p className='font-medium text-lg mb-2 mt-2 sm:text-xl'>Write a short description for your recipe.</p>
                                <Field name="header"  className="p-2"/>
                                {errors.header && touched.header ? (
                                    <div style={errorMessage}>{errors.header}</div>
                                ) : null}

                                <div>
                                    <div className='flex flex-row items-center'>
                                        <p className='font-medium text-lg mb-4 mt-4 sm:text-xl'>What ingredients are in your recipe? Add as many fields as your ingredients.
                                        </p>
                                        <div>
                                            <Button  className={`p-5 m-3 w-5 h-5 bg-white rounded text-xl 
                                            hover: cursor-pointer 
                                            hover:shadow-xl`}
                                            onClick={handleAddIngredients}>+</Button>
                                        </div>
                                    </div>
                                   
                                    <div className='flex flex-row items-center justify-evenly lg:justify-normal'>
                                        <div className='flex flex-col'>
                                        {ingredientArray.map((item,index) =>{
                                            return(
                                             <div className='flex flex-row gap-2 items-center justify-center' key = {index}>
                                                <input  className="p-2 m-2"  
                                                onBlur = {(e)=>{handleIngredientsChange(index,e)}}
                                                
                                                />
                                                <Button className={`p-5 w-5 h-5 bg-white rounded text-xl 
                                                hover: cursor-pointer 
                                                hover:shadow-xl`}
                                                
                                                onClick={()=>{handleSubtractIngredients(index)}}>-</Button>
                                             </div>   
                                            
                                            )
                                            
                                        })}
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center '>
                                        <p className=' font-medium text-lg mb-2 mt-2 sm:text-xl'>Give clear steps to follow to make your recipe. Use as many fields as you want.
                                        </p>
                                        <div>
                                            <Button  className={`p-5 m-3 bg-white rounded text-xl 
                                            w-5 h-5 
                                            hover: cursor-pointer 
                                            hover:shadow-xl`}
                                            onClick={handleAddSteps}>+</Button>
                                        </div>
                                    </div>

                                    <div className='flex flex-row items-center justify-evenly lg:justify-normal'>
                                        <div className='flex flex-col'>
                                        {stepsArray.map((item,index) =>{
                                            return(
                                             <div className='flex flex-row gap-2 items-center'key = {index}>
                                                <input  className="p-2 m-2" 
                                                onBlur = {(e)=>{handleStepsChange(index,e)}}
                                                
                                                />
                                                <Button className={`p-5 bg-white rounded text-xl w-5 h-5
                                                hover: cursor-pointer 
                                                hover:shadow-xl`}
                                                onClick={()=>{handleSubtractSteps(index)}}>-</Button>
                                             </div>   
                                            
                                            )
                                            
                                        })}
                                        </div>
                                      
                                    </div>
                                    <div className='flex flex-col  mt-5 justify-evenly sm:justify-normal'>
                                    <p className=' font-medium text-lg mb-2 mt-2 sm:text-xl'>Chef&apos;s notes:
                                        </p>
                                        <Field name = "notes" as = "textarea"></Field>
                                        {errors.notes && touched.notes ? (
                                        <div style={errorMessage}>{errors.notes}</div>
                                    ) : null}
                                    </div>
                                    <div className='flex flex-row justify-center m-5'>
                                        <Button className = "bg-yellow-500 w-36 p-3 rounded text-white hover:shadow-lg " 
                                        type="submit"
                                        onClick={()=>{handleSubmit}}
                                        >Submit</Button>
                                    </div>
                                </div>
                              
                               
                            </Form>
                    
                    )}
                </Formik>
        </div>
    </div>
    )


   


}




export default function Compose(){

    const session = useSession()
    const router = useRouter()

    const  handleClick = (e :React.MouseEvent)=>{

        console.log(e.currentTarget.id)

        if(e.currentTarget.id === "go back"){

            router.push("../")


        }else{

        router.push("/auth/sign-up")
        }

    }

    if(session.data?.user){

        return(
            <div className='bg-slate-50 '>
                <Header/>
                <div className="flex felx- justify-center bg-slate-50 ">
                    <MainArea/>
                </div>
            </div>
           
        )

          

    }else{

    return(

        <div className=" bg-slate-200 ">
            <Header/>
            <div className=' flex flex-row items-center justify-center'>
                <div className='flex flex-col gap-10 justify-between items-center p-10 rounded-xl  mt-40 bg-slate-50 '>
                    <h2 className='text-black text-xl sm:text-2xl text-center font-semibold'>You need to be signed in to create a new recipe.</h2>

                    <div className='flex flex-row justify-between w-4/5 sm:w-4/6  md:w-4/6 lg:w-10/12 m-2 p-3 text-sm font-semibold'>

                        <button id ="go back" className = "text-lg  bg-yellow-500 rounded p-1 hover:shadow-lg sm:p-2" 
                        onClick={(e)=>{handleClick(e)}}>Go Back</button>

                        <button id ="account" className= "text-lg  bg-yellow-500 rounded p-1 hover:shadow-lg  sm:p-2"
                        onClick={(e)=>{handleClick(e)}}>Create an Account.
                        </button>

                    </div>
                
                </div>
            </div>   
           
        </div>

    )
    }
    
}