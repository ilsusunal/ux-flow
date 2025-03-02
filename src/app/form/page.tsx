"use client";

import { useState } from "react";

export default function FormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        alert("Data saved successfully!");
        setName("");
        setEmail("");
      } else {
        alert("Error saving data");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  }

  return (
    <div className="flex items-center space-y-4">
      <h1>Test Form</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4"
      >
        <div className="flex gap-4">
          <label>Name:</label>
          <input
            className="text-black"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <label>Email:</label>
          <input
            className="text-black"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="bg-white text-black px-4 py-2 rounded" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
