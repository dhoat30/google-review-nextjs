import { getServerSession } from "next-auth";

import { authOptions } from "../../../../lib/auth";
import { NextResponse } from "next/server";

const requestUrl = process.env.API_BASE_URL
  ? `${process.env.API_BASE_URL}/reviews/sync-google-reviews`
  : "http://localhost:8080/reviews/sync-google-reviews";


export async function POST(req: Request, res: Response) {
  try {
    // Directly get session with req
    const session = await getServerSession(authOptions);


    if (!session) {
      return NextResponse.json({
        message: "You must be logged in",
        success: false,
      });
      
    }

    const { mapURL } = await req.json();
    const formData = JSON.stringify({
      mapURL: mapURL
    });

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
     "Authorization": `Bearer ${session.user.token}`,
      },
      body: formData
    });

    const data = await response.json()
    console.log("resposne is here", response)
console.log("data", data)
    if (response.status === 201) {
      return NextResponse.json({
        message: "Google review synced successfully",
        success: true,
        data: data
      });
    }
    if (response.status === 400) {
      return NextResponse.json({
        message: data.message,
        success: false,
        data: data
      },
      { status: 400 }

    );
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


export async function GET() {
  return NextResponse.json({ message: "This is a GET route" });
}
