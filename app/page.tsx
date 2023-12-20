"use client"
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import classes from './page.module.css';
import { Home, User, BookOpen, } from "react-feather";
import { Recipes } from "@prisma/client";
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { AppProps } from 'next/app';

const links = [

    {link:"../pages/home", label: "Home" ,icon: <Home className={classes.icon}/>},
    {link:"../pages/user", label: "My Profile",icon: <User className={classes.icon}/>},
    {link:"../pages/compose", label: "New Recipe",icon: <BookOpen className={classes.icon}/>},

]




function Header(){


    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()


    const onSearch = (event: any) =>{

        if(event.key === "Enter"){
        const encodedSearchQuery = encodeURI(searchQuery)
        console.log(encodedSearchQuery)

        router.push("/pages/search?q="+encodedSearchQuery)
        }
        else{
            return
        }

    }   

    return(

        <header className={classes.header}>
            <div className={classes.title}>
            <h1><Link href ="../">CookMate</Link></h1>
            </div>
            <div className={classes.search}>
                    {/* <Autocomplete
                        placeholder="Search Recipes Now!"
                        data={['Chicken', 'Beef', 'Noodles', 'Pizza']}
                        onChange={(value)=>{setSearchQuery(value)}}
                        onKeyUp={(e)=>{onSearch(e)}}>
                    
                    </Autocomplete> */}
                </div>   
        </header>

    )
}

function Navbar(){

    const[active , setActive] = useState("Home")
    console.log(active)
    const items = links.map((item) =>{

       return( 
        <div className={classes["nav-link"]} >
            <a 
            href={item.link}
            key={item.label}
            data-active={item.label === active || undefined}
            onClick={(event) =>{
                setActive(item.label)
            }}
            >
            {item.icon} {item.label}
            </a>
        </div>
       )
    })
    

return(

    <nav className={classes.navbar}>
        <div className={classes.main}>
            {items}
        </div>
        <div className={classes.footer}>
            <div className={classes.links}>
                <Link href={"pages/log-in"}>Log in</Link>
                <Link href={"pages/sign-up"}>Create an account</Link>
            </div>
        </div>
    </nav>

)


}


function Stars({number, id}: any){
    
    const [rating, setRating] = useState(number)
    const handleRating = async (rating:number) =>{
        
        setRating(rating)
        const body = {
            id: id,
            rating : rating
        }

        const response = await fetch("/api/recipe-controller",{

            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(body),

        })

        if(response.status !== 200){

            console.log("yo idk")
        }else{
            console.log("rating updated")

        }

        
    }
   
    return(

        <div>stars</div>
    )
   



}

 function MainArea(){

    const[recipes, setRecipes] = useState<Recipes[]>([])
    const [isLoading, setLoading] = useState(true)

    useEffect(()=>{

        const getData = async () =>{
                const url = "/api/recipe-controller"
            try{

                const response = await fetch(url)
                console.log(response.status)
                let data = await response.json() as Recipes[]
                setLoading(false)
                setRecipes(data)
            }catch(error){

                console.log(error)
            }
            
        }

        getData()
        
    },[])
    return(
        <div  className={classes["main-area"]}>
        <div>
            {isLoading?   
            <div className = {classes.loader}>
            <ReactLoading 
            type='balls' ></ReactLoading>
            </div>    
            
            :

            recipes.map((item)=>{
                
                return(
                    <div className={classes["recipe-container"]}>
                        <div className={classes["recipe-title"]}>
                            <h2>{item.name}</h2>
                            <div className={classes["recipe-rating"]}>
                                <Stars id = {item.id} number = {item.rating}></Stars>
                            </div>
                        </div>
                        <div className={classes["recipe-heading"]}>
                            <p>{item.heading}</p>
                        </div>
                        <div className={classes["recipe-ingredients"]}>
                             <h3>Ingredients:</h3>
                             <ul>
                             {item.ingredients.map((ingredient)=>{
                                
                                return(
                                    <li>{ingredient}</li>
                                )
                             })}
                            </ul>

                        </div>

                        <div className={classes["recipe-directions"]}>
                             <h3>Directions:</h3>
                             <ul>
                             {item.directions.map((directions)=>{
                                
                                return(
                                    <li>{directions}</li>
                                )
                             })}
                            </ul>

                        </div>

                        <div className={classes["recipe-additional"]}>
                            <p>{item.additional}</p>
                        </div>

                        
                    </div>



                )

            })}
            
        
        </div>
    </div>
    )


}




export default function HomePage()

 {

    return(
        
        <SessionProvider>
        <Header/>
        <div className={classes.container}>
            <Navbar/>
            <MainArea/>
        </div>
        </SessionProvider>
        
    )
}