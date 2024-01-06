"use client"
import { Field,Form,Formik } from "formik"
import Link from 'next/link';
import {FormControl,Input,FormErrorMessage, Button, Container} from "@chakra-ui/react"
import * as Yup from "yup"
import {useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";



const style = {
  border: "1px solid white"
};

const styleError = {
  border: "1px solid red"
};

const styleErrorMessage = {
  fontSize: "0.9rem",
  color:"red"
};




const validationSchema = Yup.object({
  
  username: Yup.string()
  .required("Please enter your username.")
  .min(3,"Username is too short!")
  .trim()
  .lowercase()
  .test("username","This user doesn't exist.",(value)=>{
    return new Promise(async (resolve)=>{
      const response = await fetch("/api/auth/match",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({
          username: value
          
        })
      })
      response.status === 200 ? resolve(true): resolve(false)

    })
  }).trim()
  ,
  
  password: Yup.string()
  .required("Please enter your password.")
  .min(8,"Password is too short!")
  .trim()   
  })
  
function LogInForm(){

  const router = useRouter()
  const submitUser = async (values:{
    username: string;
    password: string;
}, onSubmitProps:any)=>{
    try{
    const response = await signIn("credentials",{
      redirect: false,
      username: values.username,
      password: values.password,
      })

      if(response?.ok){
        
        router.push("/")

      }else{

        onSubmitProps.setErrors({password: "password is incorrect!"})

      }
    }catch(error){

      throw error
    }
      
    }
      return (
      <Container className="">
        <Formik 
          initialValues={{
            username: "",
            password:""

          }}
          validationSchema={validationSchema}
          onSubmit={(userValues,onSubmitProps) => submitUser(userValues,onSubmitProps)}
          >
            {(props)  => (

              <Form className="flex flex-col gap-3 items-center ">
                <Field name='username' >
                  {({ field, form }:any) => (
                    <FormControl isInvalid={form.errors.username && form.touched.username}>
                      <Input style={form.errors.username && form.touched.username? styleError: style} {...field} placeholder='Username' />
                      <FormErrorMessage style={styleErrorMessage}>{form.errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='password'>
                  {({ field, form }:any) => (
                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                      <Input style={form.errors.password && form.touched.password? styleError: style} 
                      {...field} placeholder='Password' type="password" />
                      <FormErrorMessage style={styleErrorMessage}>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                    
                  )}

                </Field>
                <div className="text-center">
                  <Button className={`p-2 bg-white rounded-lg text-sm 
                  hover: cursor-pointer 
                  hover:shadow-xl`}
                      mt={5}
                      type='submit'
                      isLoading={props.isSubmitting}
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


export default function LogInPage() {


 

  return(
          
          <div className={`h-screen flex flex-col items-center justify-center bg-slate-200 text-black  
           sm:flex sm:flex-row sm:justify-evenly`}>
            <div className={`m-9`}>
              <div className={`text-3xl mb-2 sm:text-4xl `}>
                <h1>Welcome to {" "}
                  <span className = "text-yellow-500 font-semibold ">
                    CookMate!
                  </span>
                </h1>
              </div>
              <div className={`text-lg font-semibold  `}>  
                <p>Share your love for cooking, discover new recipes and more!</p>
              </div>
          </div> 
          <div>
          <div className=" bg-yellow-500 rounded p-5 m-2">
            <div>
              <LogInForm/>
            </div>
          </div>
          <div className={`mt-4 md:text-xl `}>
                <p>Don&apos;t have an account? <span className=" hover:text-yellow-500">
                    <Link href="/auth/sign-up" className="font-semibold">Sign up here!</Link> </span>
                </p>
          </div>
          </div>
        </div>
  
  )
}

