
"use client"
import { useDisclosure } from "@mantine/hooks";
import { useState } from 'react';
import { Container, Anchor, Group, Burger, Box, Text, Title } from '@mantine/core';
import classes from './user.module.css';
import { Home, User, BookOpen } from "react-feather";

const links = [

    {link:"./home", label: "Home" ,icon: <Home className={classes.icon}/>},
    {link:"./user", label: "My Profile",icon: <User className={classes.icon}/>},
    {link:"./compose", label: "New Recipe",icon: <BookOpen className={classes.icon}/>},

]


function Header(){

    return(

        <header className={classes.header}>
                <Box className={classes.title}>
                    <Title fw= {700} order={1}>CookMate</Title>
                </Box>
        </header>

    )
}

function Navbar(){

    const[active , setActive] = useState("Home")
    console.log(active)
    const items = links.map((item) =>{

       return( 
        <a 
        href={item.link}
        key={item.label}
        className={classes["nav-link"]}
        data-active={item.label === active || undefined}
        onClick={(event) =>{
            event.preventDefault();
            setActive(item.label)
        }}
        >
           {item.icon} {item.label}
        </a>
       )
    })
    

return(

    <nav className={classes.navbar}>
        <div className={classes.main}>
            {items}
        </div>
        <div className={classes.footer}>
            foooot
        </div>
    </nav>

)


}


function MainArea(){


    return(

        <Container className={classes["main-area"]}>
                <div className={classes["recipe-container"]}>

                </div>
        </Container>
    )


}




export default function UserProfile() {

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