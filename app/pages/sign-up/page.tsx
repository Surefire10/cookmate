"use client"

import { Field,Form,Formik  } from "formik"
import {FormControl,Input,FormErrorMessage, Button, Container} from "@chakra-ui/react"
import classes from "./sign-up.module.css"
import * as Yup from "yup"
import { useRouter } from "next/navigation";

import Link from "next/link"
import { useEffect, useState } from "react"


const style = {
  border: "1px solid white"
};

const styleError = {
  border: "1px solid red"
};


const validationSchema = Yup.object({
  
  username: Yup.string()
  .required("Please enter your username")
  .min(3,"Username is too short!"),
  email: Yup.string()
  .required("Please enter your email")
  .email("Your Email is Invalid"),
  password: Yup.string()
  .required("Please enter your password")
  .min(8,"Password is too short!"),
  confirmPassword: Yup.string().required("Please enter your password again")
  .oneOf([Yup.ref("password")], "Passwords must match")
   })


function SignUpForm(){


  const router = useRouter()

    const submitUser = async (values: any) =>{
      const body = {values}

      try{

        const response = await fetch("/api/auth/register",{

          method: "POST",
          headers: {"Content-Type": "application/json"},
          body:JSON.stringify(body)
    
        })
        if(response.status !== 200){

          console.log("user not registered")
          return(body)
        }else{

          console.log("user registered")
          router.push("../")


        }


      }catch(error){

        console.log("user not registered")


      }
   
    
  }


  return (
  <Container>
   <Formik 
    initialValues={{
      username: "",
      email: "",
      password:"",
      confirmPassword: ""

    }}
    validationSchema={validationSchema}
    onSubmit={(userValues)=>{}}
    >
      {(props) => (
         <Form className={classes["sign-up-form"]}>
         <Field name='username'>
          {({ field, form }:any) => (
            <FormControl isInvalid={form.errors.username && form.touched.username}>
              <Input className= {classes.input}
              style={form.errors.username && form.touched.username? styleError : style } 
              {...field} placeholder='Username'/>
              <FormErrorMessage className= {classes["error-message"]}
              >{form.errors.username}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <br></br>
        <Field name='email'>
          {({ field, form }:any) => (
            <FormControl isInvalid={form.errors.email && form.touched.email}>
              <Input  style={form.errors.email && form.touched.email? styleError : style }  
              {...field} placeholder='Email' />
              <FormErrorMessage className= {classes["error-message"]}>{form.errors.email}</FormErrorMessage>
            </FormControl>
            
          )}
  
        </Field>
        <br></br>

        <Field name='password'>
          {({ field, form }:any) => (
            <FormControl isInvalid={form.errors.password && form.touched.password}>
              <Input {...field} 
              style={form.errors.password && form.touched.password? styleError : style } 
              placeholder='Password' type="password" />
              <FormErrorMessage className= {classes["error-message"]}>{form.errors.password}</FormErrorMessage>
            </FormControl>
            
          )}
          

        </Field>
        <br></br>

        <Field name='confirmPassword'>
          {({ field, form }:any) => (
            <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
              <Input 
              style={form.errors.confirmPassword && form.touched.confirmPassword? styleError : style } 
              {...field} placeholder='confirm password' type="password"/>
              <FormErrorMessage className= {classes["error-message"]}>{form.errors.confirmPassword}</FormErrorMessage>
            </FormControl>
            
          )}
        </Field>
        <br></br>
      <div className={classes.submit}>
      <Button 
          mt={5}
          colorScheme='teal'
          isLoading={props.isSubmitting}
          type='submit'
          onClick={(userValues)=>{submitUser(userValues)}}
          >
          Submit
      </Button>
      </div>
       
        
      </Form>

      )}
    </Formik>
    </Container>
  )

          }
   
  


export default function SignUpPage() {


 

  return(

  <div className = {classes.box} >
    <div className={classes["title-box"]}>
      <h1>New to  
      <span className = {classes.highlight}>
        {" "} CookMate?
        </span></h1>
        <p >Already have an account? <span className={classes["span-highlight"]}>
        <Link href="../pages/log-in"> Log in here!</Link> </span></p>
    </div>
    <div className={classes["sign-up-box"]}>
      <h1>Create a new Account!</h1>
      <p >Share your love for cooking, discover new recipes and more!</p>
      <div>
        <SignUpForm/>
      </div>
    </div>
  </div>
  
  
  )
}
