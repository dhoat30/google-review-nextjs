import { NextResponse } from 'next/server';

const requestUrl = process.env.API_BASE_URL
  ? `${process.env.API_BASE_URL}/register`
  : 'http://localhost:8080/register';

export async function POST(req, res) {
  try {
    // Parse the request body
    const { firstName, lastName, email, password, provider } = await req.json();

    // Prepare the form data
    const formData = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      provider
    });
    // Make the API request
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
    });

    // Parse the response JSON
    const data = await response.json();
    console.log("data", data)

    if (response.status === 409) {
        return NextResponse.json({
          message: data.message,
          success: false,
        }); // Include the status code here
      }
      if (response.status === 500) {
        return NextResponse.json({
          message: "Something went wrong",
          success: false,
        }); // Include the status code here
      }

      if(response.status === 201){
        return NextResponse.json({
          message: data.message,
          success: true,
        });
    } 
    // fall back error message 
    return NextResponse.json({
      message: 'Server error',
      success: false
    });
  } catch (error) {
    console.error('Error in POST /register:', error);
    return NextResponse.json({
      message: 'Server error',
      success: false,
      error: error,
    });
  }
}
