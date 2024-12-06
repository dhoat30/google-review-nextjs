import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server";

const requestUrl = process.env.API_BASE_URL
  ? `${process.env.API_BASE_URL}/create-google-review`
  : "http://localhost:8080/create-google-review";

export async function GET() {
  return NextResponse.json({ message: "This is a GET route" });
}

export async function POST(req, res) {
  try {
    // Directly get session with req
    const session = await getServerSession(authOptions);
console.log("session", session)

    if (!session) {
      return NextResponse.json({
        message: "You must be logged in",
        success: false,
      });
      
    }

    const { firstName, lastName } = await req.json();
    const formData = JSON.stringify({
      firstName,
      lastName,
    });
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
     "Authorization": `Bearer ${session.user.token}`,
      },
      body: formData
    });

    const data =  response

    if (data.status === 201) {
      return NextResponse.json({
        message: "Google review added successfully",
        success: true,
    
      });
    }
    return NextResponse.json({
      message: `Something Went wrong.`,
      success: false,    
 
    }, 
    {
      status: response.status} );

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
