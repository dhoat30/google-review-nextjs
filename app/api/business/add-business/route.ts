import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { NextResponse } from "next/server";
import axios from "axios";
import formidable from "formidable";


export const config = {
  api: {
    bodyParser: false,
  },
};

const requestUrl = process.env.API_BASE_URL
  ? `${process.env.API_BASE_URL}/business/add-business`
  : "http://localhost:8080/business/add-business";

// Helper function to parse multipart form-data (using formidable)

const parseForm = async (req: Request): Promise<{ fields: any; files: any }> => {
  const form = formidable({ multiples: false }); // Configure formidable
  return new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export async function POST(req: Request) {
  try {
    // Get session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in", success: false },
        { status: 401 }
      );
    }

    // Parse form data
    const { fields, files } = await parseForm(req);
    const businessMapUrl = fields.businessMapUrl;
    const businessName = fields.businessName;
    const image = files.image; // Uploaded file

    if (!businessMapUrl || !businessName || !image) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }

      console.log("Parsed form data:", { businessMapUrl, businessName, image });

    // Prepare FormData for the external API
    const apiFormData = new FormData();
    apiFormData.append("businessMapUrl", businessMapUrl);
    apiFormData.append("businessName", businessName);
    apiFormData.append("image", image.filepath, image.originalFilename); // Include file path and name

    // Send the POST request to the Node.js API
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
      body: apiFormData,
    });

    const data = await response.json();

    // Handle different response statuses
    if (response.status === 201) {
      return NextResponse.json({
        message: "Business added successfully",
        success: true,
        data,
      });
    }

    return NextResponse.json(
      {
        message: data.message || "An error occurred",
        success: false,
        data,
      },
      { status: response.status }
    );
  } catch (error) {
    console.error("Error in POST /api/business/add-business:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "This is a GET route" });
}
