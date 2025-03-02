import { NextResponse } from "next/server";
import Database from "../../../../extensions/db.js";

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    const db = new Database("test.db");
    db.connectToDb();
    db.createTable("users", "(name TEXT, email TEXT)");

    db.addDataToDb("users", name, email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error saving data", { status: 500 });
  }
}
