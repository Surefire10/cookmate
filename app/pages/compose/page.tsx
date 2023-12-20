
"use client"
import { useState } from 'react';
import classes from './compose.module.css';
import { Home, User, BookOpen } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import { Session } from 'next-auth';

const links = [

    {link:"./home", label: "Home" ,icon: <Home className={classes.icon}/>},
    {link:"./user", label: "My Profile",icon: <User className={classes.icon}/>},
    {link:"./compose", label: "New Recipe",icon: <BookOpen className={classes.icon}/>},

]


function Header(){

    return(

        <header className={classes.header}>
                <div className={classes.title}>
                    <h1><Link href ="../">CookMate</Link></h1>
                </div>
        </header>

    )
}




function MainArea(){

    const starterArray1 = [

        <input></input>
    ]

    const starterArray2 = [

        <input></input>
    ]

    const [recipeTitle ,setTitle] = useState("")
    const [recipeHeading ,setHeading] = useState("")
    const [recipeIngredients ,setIngredients] = useState<string[]>([])
    const [recipeSteps ,setSteps] = useState<string[]>([])
    const [recipeNotes ,setNotes] = useState("")

    const [ingredientArray, setNumber] = useState(starterArray1)
    const [stepsArray, setNumberOfSteps] = useState(starterArray2)

    const router = useRouter()


    const handleAdd = () =>{

        setNumber(existing =>{

            return [
                ...existing,<input></input>

            ]
        })


    }

    const handleAddSteps = () =>{

        setNumberOfSteps(existing =>{

            return [
                ...existing,<input></input>
            ]
        })


    }
   

    const handleSubmit = async(e: any) =>{

        e.preventDefault()
        

        const body = {recipeTitle,
            recipeHeading,
            recipeIngredients,
            recipeSteps,
            recipeNotes}

        const response = await fetch("/api/recipe-controller",{

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(body),

        })

        if(response.status !== 200){

            console.log("yo idk")
        }else{
            setTimeout(()=>{
                router.push("../")
            },1000)
            


        }

   

    }
    


   


    return(

        <div className={classes["main-area"]}>
            <div className={classes.prompt}>
                <h2>Submit a new Recipe?</h2>
                <p>Fill in the fields below!</p>
            </div>
            <textarea required  onChange = {(e)=>setTitle(e.target.value)}></textarea>
            <textarea  onChange = {(e)=>setHeading(e.target.value)}></textarea>
           
            <div className={classes.ingredients}>
                <div className={classes["title-and-button"]}>
                    <p >Ingredients</p>
                    <button className = {classes.add} onClick={handleAdd}>+</button>
                </div>
                {ingredientArray.map((item, index)=>{

                    return(

                        <textarea className={classes["dynamic-field"]} onChange = {(e)=>setIngredients(current => [...current, e.target.value])}></textarea>
                    )
                })
                }
            </div>    
            <div className={classes.steps}>
                <div className={classes["title-and-button"]}>
                <p>Steps</p>
                <button className = {classes.add} onClick={handleAddSteps}>+</button>
                </div>
                {stepsArray.map((item, index)=>{

                    return(

                        <textarea className={classes["dynamic-field"]} onChange = {(e)=>setSteps(current => [...current, e.target.value])}></textarea>
                    )
                })
                }
                </div>
            <textarea  onChange = {(e)=>setNotes(e.target.value)}></textarea>
            <div className={classes.buttons}>
                <button onClick={handleSubmit}>Share Recipe</button>
            </div>
        </div>
    )


   


}




export default  function Compose({
    Component,
    pageProps,
  }: AppProps<{
    session: Session;
  }>){

    const session = useSession()
    const router = useRouter()

    function goHome(){

        router.push("../")

    }
    console.log(session)

    if(session){

        return(
            <SessionProvider>
            <Header/>
            <div className={classes.container}>
                <MainArea/>
            </div>
            </SessionProvider>
        )

    }

    return(

        <div className={classes.unauthorized}>
            <h2 >You need to be signed in to CookMate to create a new recipe.</h2>
            <div  className={classes.links}>
                <button onClick={(e)=> {goHome()}}>Go Back</button>

            </div>
        </div>

    )

    
}