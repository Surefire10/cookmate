
"use client"
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from 'react';
import { Container, Box,Button, Text, Textarea, Title } from '@mantine/core';
import classes from './compose.module.css';
import { Home, User, BookOpen } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/navigation";

const links = [

    {link:"./home", label: "Home" ,icon: <Home className={classes.icon}/>},
    {link:"./user", label: "My Profile",icon: <User className={classes.icon}/>},
    {link:"./compose", label: "New Recipe",icon: <BookOpen className={classes.icon}/>},

]


function Header(){

    return(

        <header className={classes.header}>
                <Box className={classes.title}>
                    <Title fw= {700} order={1}><Link href ="../">CookMate</Link></Title>
                </Box>
        </header>

    )
}




function MainArea(){

    const starterArray1 = [

        <Textarea></Textarea>
    ]

    const starterArray2 = [

        <Textarea></Textarea>
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
                ...existing, <Textarea></Textarea>
            ]
        })


    }

    const handleAddSteps = () =>{

        setNumberOfSteps(existing =>{

            return [
                ...existing, <Textarea></Textarea>
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

        <Container className={classes["main-area"]}>
            <div className={classes.prompt}>
                <Title>Submit a new Recipe?</Title>
                <Text size="lg">Fill in the fields below!</Text>
            </div>
            <Textarea size={"xl"} required  onChange = {(e)=>setTitle(e.target.value)} label={"What's your recipe called?"}></Textarea>
            <Textarea size={"xl"} onChange = {(e)=>setHeading(e.target.value)} label={"Write a small intro for your recipe"}></Textarea>
           
            <div className={classes.ingredients}>
                <div className={classes["title-and-button"]}>
                    <Text size={"xl"}>Ingredients</Text>
                    <Button className = {classes.add} onClick={handleAdd}>+</Button>
                </div>
                {ingredientArray.map((item, index)=>{

                    return(

                        <Textarea className={classes["dynamic-field"]} onChange = {(e)=>setIngredients(current => [...current, e.target.value])}></Textarea>
                    )
                })
                }
            </div>    
            <div className={classes.steps}>
                <div className={classes["title-and-button"]}>
                <Text size={"xl"}>Steps</Text>
                <Button className = {classes.add} onClick={handleAddSteps}>+</Button>
                </div>
                {stepsArray.map((item, index)=>{

                    return(

                        <Textarea className={classes["dynamic-field"]} onChange = {(e)=>setSteps(current => [...current, e.target.value])}></Textarea>
                    )
                })
                }
                </div>
            <Textarea size={"xl"} onChange = {(e)=>setNotes(e.target.value)} label={"Any additional notes?"}></Textarea>
            <div className={classes.buttons}>
                <Button onClick={handleSubmit}>Share Recipe</Button>
            </div>
        </Container>
    )


   


}




export default function Compose() {

    return(
        <>
        <Header/>
        <div className={classes.container}>
            <MainArea/>
        </div>
        </>
    )
}