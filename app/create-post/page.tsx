
import CreateGoogleReviewForm from "../../components/UI/Forms/CreateGoogleReviewForm"
import Header from "../../components/UI/Header/Header"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

// 
export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <p>You must be logged in to view this page.</p>;
      }
    
  return (
    <>
    <Header/>
  <CreateGoogleReviewForm/> 
    </>

  )
}
