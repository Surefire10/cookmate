"use client"

import { Field,Form,Formik  } from "formik"
import Link from 'next/link';
import {FormControl,Input,FormErrorMessage, Button, Container} from "@chakra-ui/react"
import classes from "./login.module.css"
import * as Yup from "yup"
import { useRouter } from "next/navigation";


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
  password: Yup.string()
  .required("Please enter your Password")
  .min(8,"Password is too short!"),

})

function LogInForm(){

  const router = useRouter()

    const submitUser = async (values: any) =>{
      const body = {values}

      try{

        const response = await fetch("/api/auth/log-in",{

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
      password:""

    }}
    validationSchema={validationSchema}
    onSubmit={(userValues : any)=>{
      console.log(userValues)
    }}
    >
      {(props: any)  => (
         <Form>
         <Field name='username'>
          {({ field, form }:any) => (
            <FormControl isInvalid={form.errors.username && form.touched.username}>
              <Input style={form.errors.username && form.touched.username? styleError: style} {...field} placeholder='Username' />
              <FormErrorMessage>{form.errors.username}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <br></br>
        <Field name='password'>
          {({ field, form }:any) => (
            <FormControl isInvalid={form.errors.password && form.touched.password}>
              <Input style={form.errors.password && form.touched.password? styleError: style} 
              {...field} placeholder='Password' type="password" />
              <FormErrorMessage>{form.errors.password}</FormErrorMessage>
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


export default function LogInPage() {


 

  return(

  
  <div className = {classes.box}>
    <div className={classes["title-box"]}>
      <h1>Welcome to  
      <span className = {classes.highlight}>
         CookMate!
        </span></h1>
      <p>Share your love for cooking, discover new recipes and more!</p>
      <p>Don&apos;t have an account? <span className={classes["span-highlight"]}>
        <Link href="/pages/sign-up">Sign up here!</Link> </span></p>
    </div>
    <div className={classes["log-in-box"]}>
      <h1>Log back in now!</h1>
      <div className={classes["log-in-form"]}>
        <LogInForm/>
      </div>
    </div>
  </div>
  
  )
}

