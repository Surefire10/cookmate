import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

import { BookOpen, ChevronDown, ChevronUp, Edit2, Home, LogIn, LogOut, Menu, Search, Star, User, X } from "react-feather"
import { eventNames } from "process"

function SearchBar(){

    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [isFocused, setFocued] = useState(false)
    const searchTerms = ["Chicken" , "Beef", "Fish", "Stuff"]


    const handleClick = (e:React.MouseEvent<HTMLLIElement>, item:string) =>{
        
        

        if(e.currentTarget.id === "autocomplete"){

            setSearchQuery(item)
            setFocued(false)
        }

    }

    const onSearch = (event: any) =>{

        console.log(event.key)

        if(event.key === "Enter"){
            const encodedSearchQuery = encodeURI(searchQuery)
            router.push("/components/search?q="+encodedSearchQuery)
        }
        
    }   

    return(
        
         
            <div className={`relative flex row items-center justify-center bg-white w-45`}>
                <input className='focus:ring-transparent text-black text-sm p-0.5 w-full'
                    placeholder="Search Recipes"
                    onChange={(e)=>{setSearchQuery(e.target.value)}}
                    onKeyUp={(e)=>{onSearch(e)}}
                    onFocus={()=> setFocued(true)}
                    value={searchQuery}
                    >
                </input>
                <div className='p-1 hover:shadow cursor-pointer' 
                    onClick={(e)=>{onSearch(e)}} >
                    <Search className='stroke-yellow-500'/>
                 </div>
                {isFocused?
                <div className={`absolute top-8 left-0 w-full bg-slate-100`}>
                    <ul>
                        {searchTerms.filter(item =>{

                            const searchTerm = searchQuery.toLowerCase()
                            const itemToLowerCase = item.toLowerCase()
                            return  itemToLowerCase.startsWith(searchTerm) 
                            && itemToLowerCase 
                            !== searchTerm
                            
                        }).
                        map((item,index) =>{
                            return(
                                <li key={index} id = "autocomplete"
                                className={`text-black hover:cursor-pointer
                                 hover:bg-gray-200 w-full`}
                                onClick={(e)=>{handleClick(e,item)}}
                                >
                                    {item}
                                </li>
                            )
                        })
                        
                        }
                    </ul> 
                </div>:<></>}

             </div>
        
    )
}



export function Header(){

    const router = useRouter()
    const {data: session} = useSession()
    const [dropDown, setDrop] = useState(false)
    const [hover, setHover] = useState(false)


    const signInHandler = () =>{

        signIn()
    }

    const signOutHandler = () =>{

        signOut({callbackUrl:""})
        
    }

  

  
    return(

        <header className={`bg-slate-200 flex flex-row 
        items-center justify-between p-3 z-10 shadow-lg`}>
            <div 
            className={`relative flex flex-row w-fit gap-3 justify-between bg-slate-50 p-2 
            rounded items-center cursor-pointer 
            hover:shadow-lg 
            sm:p-2`}
            onMouseEnter={(e)=>{setHover(true)}}
            onMouseLeave={()=>{setHover(false)}}

        

            >
                {/* drop down menu */}
            {hover?
                <div className='absolute top-12  text-black  font-normal min-w-max  h-fit shadow rounded'>
                    {session?
                    <ul className='p-2 bg-slate-50'>
                        <li className='p-2'>
                            <div className='flex flex-row gap-2'>
                                <User></User> Signed in as: {session?.user.name}
                            </div>
                        </li>
                    </ul>
                    :null
                    }
                </div>          

            :<></>}


            <div className='flex flex-row items-center'>
                <div className='rounded-full bg-yellow-500 p-2'>
                    <User className='stroke-black'/> 
                </div>
                {session?
                <div onClick={()=>{signOutHandler()}} 
                className='hidden text-black text-baseline p-2 md:block font-medium'>
                    <p>Log out</p>
                </div> 
                :
                <div onClick={()=>{signInHandler()}} 
                className='hidden text-black text-baseline p-2 md:block font-medium'>
                    <p>Log in</p>
                </div>}
                
                {hover?
                <div 
                className='absolute top-11 bg-slate-50 md:hidden text-black font-normal min-w-max  h-fit shadow rounded'>
                   {session?.user?
                    <ul className='p-2'>
                        <li className='p-2'>
                            <div className='flex flex-row gap-2'>
                                <User></User> Signed in as: {session?.user.name}
                            </div>
                        </li>
                        <li className='p-2 hover:bg-slate-200'>
                            <div className='flex flex-row gap-2'>
                                <LogOut></LogOut>
                                <button onClick={()=>signOutHandler()}>Log out</button>
                            </div>
                        </li>
                    </ul>
                    :
                    <ul className='p-2'>
                        <li className='p-2 hover:bg-slate-200'>
                            <div className='flex flex-row gap-2 '>
                                <LogIn></LogIn>
                                <button onClick={()=>signInHandler()}>
                                    Log in
                                </button>
                            </div>
                        </li>
                    </ul>
                    }
                
                </div>
                :<></>
                }
                <div className='relative md:hidden'
                onClick={()=> setDrop(current =>!current)}>
                    <ChevronDown fill='black' size={34}></ChevronDown>
                </div> 
            </div>
            </div>
            
            <div className='bg-yellow-500 p-2 m-2 rounded sm:p-3'>
                <h1 className='text-2xl no-underline sm:text-4xl'><Link href ="/">CookMate</Link></h1>
            </div>
            <div className='flex flex-row items-center justify-between'>
                <div className={`hidden sm:block`}>
                    <SearchBar/>
                </div>
                <Navbar/>
            </div>

        </header>

    )
}

 function Navbar(){

    const session = useSession()
    const currentUser = session.data?.user
    const [hover ,setHover] = useState(false)
    const[active , setActive] = useState("Home")
    const[open, setOpen] = useState(false)

    let links = []

    if(currentUser){

        links = [ 
            
            {link:"/components/" +  currentUser.name, label: 
            "My Profile",icon: 
            <User 
             className=" stroke-black hover:stroke-yellow-500"/>},
    
        ]
    }else{

        links = [ 
            
            {link:"", label: "",icon: ""},
    
        ]


    }
  
   

  

    const items = links.map((item,index) =>{


        return( 
            <div className="inline-block m-1" key={index}
            
            >
                <a 
                href={item.link}
                key={item.label}
                data-active={item.label === active || undefined}
                onClick={(event) =>{
                    setActive(item.label)
                }}
            
                >
                    {item.icon}
                </a>

            </div>
            )
        }
      
    )

    const handleMenuClick = () =>{

            setOpen(current => !current)
    }
        return(
            <div className=''>

             {/* overlay    */}
            {open?  
              <div className='absolute top-0 left-0 bg-slate-200 h-1/2 w-full sm:block '>
                  <div className='cursor-pointer float-right p-1'>
                        <X className='m-5 stroke-black hover:stroke-yellow-500' onClick={handleMenuClick}></X>
                  </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col m-5'>
                        <SearchBar/>
                        {links.map((item,index)=>{
                            return(
                                <div className='' key={index}>
                                    <a 
                                    className='m-2'
                                    href={item.link}
                                    key={item.label}

                                    data-active={item.label === active || undefined}
                                    onClick={() =>{
                                        setActive(item.label)
                                    }}
                                    >
                                    {
                                        <div className='flex flex-row  gap-1 text-black text-base hover:text-yellow-500'>{item.icon} {item.label}</div>
                                    }
                                    </a>
                                </div>

                        )
                        })}
                        </div>
                    </div>
                </div>
                : 
                <div className="inline-block m-1 cursor-pointer ">
                    <Menu onClick={handleMenuClick} className=" stroke-black hover:stroke-yellow-500 sm:hidden"></Menu>
                    <div className='hidden sm:block'>
                        {items}
                    </div>
                </div>

            
            }


            </div>
        
        )
    }   

function Footer(){


    return(

        <div className='flex flex-col  w-full  text-black font-semibold text-xlborder-t-black '>
            <div className='flex flex-row items-center justify-center m-5 bg-yellow-500 p-3 w-40 rounded text-white text-center '>
                    Cookmate
            </div>
            <div className='flex flex-row text-lg font-normal gap-5 text-center  p-2 justify-center'>
                <ul className='flex flex-row gap-5 '>
                    <li>Contact us</li>
                    <li>Careers</li>
                    <li>Advertise</li>
                    <li>Terms of Service</li>
                </ul>
            </div>
    
        </div>
    )
    }    
  
export function Accents(){
    
    const router = useRouter()
    const handlClick = ()=>{

        window.scrollTo(0,0)
    }

    

    return(

        <div>
            <Footer/>
                    <div onClick={handlClick} 
                    className='fixed bg-yellow-500 bottom-0 right-0 rounded m-2 p-3 cursor-pointer'>
                        <ChevronUp/>
                    </div>
                    <div onClick={() => router.push("/components/compose")} 
                    className='fixed bg-yellow-500 bottom-16 right-0 rounded m-2 p-3 cursor-pointer'>
                        <Edit2/>
                    </div>
        </div>
    )
}





export function Stars({number, id, isChangeable} :{number: number , id:number , isChangeable:boolean}){
    
    
    const starArray = [1,2,3,4,5]
    const [rating, setRating] = useState(number)
    const [hover, setHover] = useState(0)

    const handleRating = async (rating:number) =>{
        setRating(rating)
        const body = {
            id: id,
            rating : rating
        }

        const response = await fetch("/api/recipeController",{

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


        <div className='flex flex-row'>
            {isChangeable? 
            starArray.map((index) =>{
                return(
                    <label key={index}>
                        <input 
                        className='hidden'
                        type = "checkbox" 
                        onClick={()=>{handleRating(index)}}
                        />
                        <Star className={`
                            hover:fill-yellow-500 
                            hover:cursor-pointer`}
                            fill={index <= (hover || rating)? "#f4cd32" : "transparent"}
                            strokeWidth={1}
                            onMouseEnter={()=>setHover(index)}
                            onMouseLeave={()=>setHover(0)}
                        ></Star>
                    </label>
                )
            })
                
            : 
        <div className='flex flex-row'>
             {starArray.map((index) =>{
                return(
                    <label key={index}>
                        <input 
                        className='hidden'
                        type = "checkbox" 
                        />
                        <Star
                            fill={index <= (rating)? "#f4cd32" : "transparent"} 
                            strokeWidth={1}
                        ></Star>
                    </label>
                    )
                })}     
            </div>
            }
        </div>
        
    )
   



}