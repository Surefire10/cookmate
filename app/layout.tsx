"use client"
import React from "react";
import {SessionProvider} from "next-auth/react"


export default function RootLayout({ children }: 
  { children: any }, 

  
      
  ) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}


