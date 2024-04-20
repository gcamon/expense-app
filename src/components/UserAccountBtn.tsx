"use client"
import React from 'react'
import { signOut } from 'next-auth/react';
import { Button } from './ui/button';

const UserAccountBtn = () => {
  return (
    <Button variant='destructive' onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`
    })}>
        Sign Out
    </Button>
  )
}

export default UserAccountBtn