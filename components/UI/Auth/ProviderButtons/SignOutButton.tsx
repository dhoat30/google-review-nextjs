'use client'
import React from 'react'
import {signIn, signOut, useSession} from "next-auth/react"

export default function SignOutButton() {
  const {data: session} = useSession(); 


  return (
    <div>
        {session && 
            <button onClick={()=> signOut()}>Sign out</button>

        }
    </div>
  )
}

