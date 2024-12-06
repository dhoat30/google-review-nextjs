
import Register from "../../components/UI/Auth/Register"

export default async function Page() {

    console.log(process.env.NEXTAUTH_SECRET)
  return (
    <>

 <Register/> 
   
    </>

  )
}
