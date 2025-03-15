"use client"
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">
        <Link href="/" className="hover:underline">        
            6G Pipeline
        </Link>
      </h1>
      <div className="flex gap-4">
        <Link href="/chatbot" className="hover:underline">Chatbot</Link>
        <Link href="/dashboard1" className="hover:underline">Real Time Dashboard</Link>
        <Link href="/dashboard2" className="hover:underline">Future Forecast</Link>
      </div>
    </nav>
  );
}
