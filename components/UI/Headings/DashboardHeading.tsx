'use client'
import React from 'react'
import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import { Button, Typography } from '@mui/material'
import AddBusinessForm from '../Forms/AddBusinessForm/AddBusinessForm'

interface Props {
    title: string
    className: string
    }

export default function DashboardHeading({title, className}: Props) {
  return (
   <Section className={className}>
<Container maxWidth="xl"> 
    <div className="wrapper">
        <Typography variant="h2" component="h1">{title}</Typography>
        <AddBusinessForm/> 
    </div>
    </Container> 
   </Section>
  )
}
const Section = styled.section`
.wrapper{ 
    display:grid; 
    grid-template-columns: 1fr auto;
    align-items: center;
}
`
