"use client"

import { Title, Box, Text } from "@mantine/core"
import { Field,Form,Formik  } from "formik"
import Link from 'next/link';
import {FormControl,Input,FormErrorMessage, Button, Container} from "@chakra-ui/react"
import classes from "./login.module.css"
import * as Yup from "yup"


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
              {...field} placeholder='Password' />
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

  <>
  <Box className = {classes.box} component='div'>
    <div className={classes["title-box"]}>
      <Title ta = "center"  order={1}>Welcome to  
      <span className = {classes.highlight}>
         CookMate!
        </span></Title>
      <Text ta = "center" size = "xl">Share your love for cooking, discover new recipes and more!</Text>
      <Text ta = "center" size = "xl">Don&apos;t have an account? <span className={classes["span-highlight"]}>
        <Link href="/components/sign-up">Sign up here!</Link> </span></Text>
    </div>
    <div className={classes["log-in-box"]}>
      <Title ta = "center" order={1}>Log back in now!</Title>
      <div className={classes["log-in-form"]}>
        <LogInForm/>
      </div>
    </div>
  </Box>
  </>
  
  )
}

