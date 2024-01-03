"use client"
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import classes from './search.module.css';
import { Home, User, BookOpen, AlertTriangle } from "react-feather";
import { Recipes } from "@prisma/client";
import Link from 'next/link';

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
      
    }   

    return(

        <header className={classes.header}>
            <div className={classes.title}>
            <h1><Link href ="/">CookMate</Link></h1>
            </div>
            <div className={classes.search}>
                    <div
                        placeholder="Search Recipes Now!"
                        onKeyUp={(e)=>{onSearch(e)}}>
                    
                    </div>
                </div>   
        </header>

    )
}

function Navbar(){

    const[active , setActive] = useState("Home")
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
            <div>
                Log out
            </div>
            <div>
                Create an Account
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
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get("q")
    console.log(searchQuery)

    
    useEffect(()=>{

        const getData = async () =>{
                const url = "/api/search?q="+searchQuery
            try{

                const response = await fetch(url)
                
                let data = await response.json() as Recipes[]
                setLoading(false)
                console.log(data)
                setRecipes(data)
            }catch(error){

                console.log(error)
            }
            
        }

        getData()
        
    },[searchQuery])
    return(
        <div  className={classes["main-area"]}>
        <div>
            {isLoading?       
            <div className = {classes.loader}>
            <ReactLoading 
            type='balls' ></ReactLoading>
            </div>  
            : recipes.length !== 0? recipes.map((item)=>{
                
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

            }) : <div className={classes.empty}>
                    <AlertTriangle></AlertTriangle>
                  <p>No Recipes Match This Search Currently. Try Another Search</p>  
                </div>}
            
        
        </div>
    </div>
    )


}




export default function HomePage() {

    return(
        <>
        <Header/>
        <div className={classes.container}>
            <Navbar/>
            <MainArea/>
        </div>
        </>
    )
}