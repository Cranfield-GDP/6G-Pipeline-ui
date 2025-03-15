const BACKEND_URL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST(req: Request) {
    try {
        const { model, user_id } = await req.json();  // ✅ Extract model & userId

        const response = await fetch(BACKEND_URL + "/model", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model, user_id }),  // ✅ Send data to backend
        });

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.log(error);
        return Response.json({ reply: "Error selecting model." }, { status: 500 });
    }
}
