"use client"
import React, { ReactNode } from "react";
import {SessionProvider} from "next-auth/react"
import "./globals.css"

interface IProps{
  children: ReactNode,
  session:any

}

export default function RootLayout({ children, session }: IProps) {
  return (
    <html lang="en" className="m-0 p-0">
      <head>
      <title>Cookmate</title>

        <link rel="favicon" href="/icon.png" />
      
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

      </head>
      <body className="m-0 p-0">
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}


