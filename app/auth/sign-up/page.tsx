"use client"

import { Field,Form,Formik  } from "formik"
import {FormControl,Input,FormErrorMessage, Button, Container} from "@chakra-ui/react"
import * as Yup from "yup"
import Link from "next/link"
import { useRouter } from 'next/navigation';


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
  .required("Please enter your username")
  .min(3,"Username is too short!")
  .trim()
  .lowercase()
  .test("username","Username already exists.",(value)=>{
    return new Promise(async (resolve)=>{
      const response = await fetch("/api/auth/validate?v=username",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({
          username: value
        })
      })
      response.status === 200 ? resolve(true): resolve(false)

    })
  }),
  email: Yup.string()
  .required("Please enter your email")
  .email("Your email is invalid")
  .trim()
  .lowercase()
  .test("email","This email is in use.",(value)=>{
    return new Promise(async (resolve)=>{
      const response = await fetch("/api/auth/validate?v=email",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({
          email: value
        })
      })
      response.status === 200 ? resolve(true): resolve(false)

    })
  }),
  password: Yup.string()
  .required("Please enter your password")
  .min(8,"Password is too short!")
  .trim(),
  confirmPassword: Yup.string()
  .required("Please retype your password")
  .trim()
  .oneOf([Yup.ref("password")], "Passwords must match")
})


function SignUpForm(){

  const router = useRouter()

    const submitUser = async (values :{
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
  }) =>{

      
      try{
        const response = await fetch("/api/auth/register",{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body:JSON.stringify({
            username: values.username.replaceAll(/\s/g,''),            
            email: values.email.replaceAll(/\s/g,''),
            password:values.password.replaceAll(/\s/g,'')

          }) 
        })  

        if(response.status !== 200){
          
          
          return new Promise((resolve)=>{
            resolve(false)
          })
        }else{
          return new Promise((resolve)=>{
            resolve(true)
            router.push("/auth/log-in")
          })
        }

      }catch(error){

        console.log(error)
        
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
    onSubmit={(userValues)=>{submitUser(userValues)}}
    >
      {(props) => (
         <Form className="flex flex-col gap-3 ">
         <Field name='username'>
          {({ field, form }:any) => (
            <FormControl isInvalid={form.errors.username && form.touched.username}>
              <Input className=" text-sm w-full p-1"
              style={form.errors.username && form.touched.username? styleError : style } 
              {...field} placeholder='Username'/>
              <FormErrorMessage style={styleErrorMessage}
              >{form.errors.username}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name='email'>
          {({ field, form }:any) => (
            <FormControl isInvalid={form.errors.email && form.touched.email}>
              <Input  className=" text-sm w-full p-1"
              style={form.errors.email && form.touched.email? styleError : style }  
              {...field} placeholder='Email' />
              <FormErrorMessage style={styleErrorMessage}>{form.errors.email}</FormErrorMessage>
            </FormControl>
            
          )}
  
        </Field>
        <Field name='password'>
          {({ field, form }:any) => (
            <FormControl isInvalid={form.errors.password && form.touched.password}>
              <Input className=" text-sm w-full p-1"
              {...field} 
              style={form.errors.password && form.touched.password? styleError : style } 
              placeholder='Password' type="password" />
              <FormErrorMessage style={styleErrorMessage}>{form.errors.password}</FormErrorMessage>
            </FormControl>
            
          )}
          

        </Field>
        <Field name='confirmPassword'>
          {({ field, form }:any) => (
            <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
              <Input className=" text-sm w-full p-1"
              style={form.errors.confirmPassword && form.touched.confirmPassword? styleError : style } 
              {...field} placeholder='Confirm Password' type="password"/>
              <FormErrorMessage style={styleErrorMessage}>{form.errors.confirmPassword}</FormErrorMessage>
            </FormControl>
            
          )}
        </Field>
        <div className="text-center">
          <Button className={`p-2 bg-white rounded-lg text-sm 
          hover: cursor-pointer 
          hover:shadow-xl`}
              mt={5}
              isLoading={props.isSubmitting}
              type='submit'
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

    <div className={`h-screen flex flex-col items-center justify-center bg-slate-200 text-black dark:bg-gray-500 
          sm:flex sm:flex-row sm:justify-evenly`}>
      <div className={`ml-5`}>
        <div className={`text-3xl mb-2 sm:text-4xl dark:text-white`}>
          <h1>New to {" "}
            <span className = "text-yellow-500 ">
              CookMate?
            </span>
          </h1>
        </div>
        <div className={`text-lg md:text-xl dark:text-white`}>  
          <p>Share your love for cooking, discover new recipes and more!</p>
        </div>
     </div>
      <div className="flex flex-col items-center">
        <div className="bg-yellow-500 rounded p-5 m-5">
          <SignUpForm/>
        </div>
        <div className={`mt-4 md:text-xl dark:text-white`}>
                <p>Already have an account? <span className=" hover:text-yellow-500">
                    <Link href="/auth/log-in">Log in now!</Link> </span>
                </p>
          </div>
      </div> 
    </div>
  )
}
