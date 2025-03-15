
const BACKEND_URL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json(); // ✅ Extract user input and userId

    const response = await fetch(BACKEND_URL+"/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, userId }),
    });

    const data = await response.json();

    return Response.json(data);

  } catch (error) {
    console.log("Error in chat route:", error);
    return Response.json({ error: "Error communicating with backend." }, { status: 500 });
  }
}
