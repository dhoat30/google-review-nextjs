import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from "../../../../lib/auth";

const requestUrl = process.env.API_BASE_URL
  ? `${process.env.API_BASE_URL}/business/add-business`
  : "http://localhost:8080/business/add-business";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Get session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in", success: false },
        { status: 401 }
      );
    }
// 1. Parse the incoming form data
const formData = await req.formData(); 
   // 2. Create a new FormData object for axios
   const axiosFormData = new FormData();
   axiosFormData.append('businessName', formData.get('businessName') as string);
   axiosFormData.append('businessMapUrl', formData.get('businessMapUrl') as string);
   axiosFormData.append('image', formData.get('image') as File);
    // Forward the request to the target backend
    const { data } = await axios.post(requestUrl, axiosFormData, {
      headers: {
        'Content-Type': req.headers.get('content-type') || 'multipart/form-data', 
        "Authorization": `Bearer ${session.user.token}`,
      },
    });

    // 1. Get the response buffer
    // const buffer = await new Response(data).arrayBuffer();
  // 2. Create a new Response with the buffer
 
  return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return NextResponse.json({ 
          message: `Error: ${error.response.status} ${error.response.data.message}`, 
          success: false 
        }, { status: error.response.status }); // Use backend status code
      } else if (error.request) {
        // The request was made but no response was received
        return NextResponse.json({ message: 'No response from backend server.', success: false }, { status: 502 });
      } else {
        // Something happened in setting up the request that triggered an Error
        return NextResponse.json({ message: 'Error setting up request to backend.', success: false }, { status: 500 });
      }
    } else {
      // Handle other types of errors
      return NextResponse.json({ message: 'An error occurred.', success: false }, { status: 500 });
    }
  }
}

export async function GET() {
  return NextResponse.json({ message: "This is a GET route" });
}
