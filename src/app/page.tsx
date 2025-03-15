"use client"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to 6G Pipeline UI</h1>
      <div className="flex gap-4">
        <Link href="/chatbot" className="p-2 bg-blue-500 text-white rounded">Chatbot</Link>
        <Link href="/dashboard1" className="p-2 bg-green-500 text-white rounded">Real Time Dashboard</Link>
        <Link href="/dashboard2" className="p-2 bg-purple-500 text-white rounded">Future Forcast</Link>
      </div>
    </div>
  );
}
