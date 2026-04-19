import { NextResponse } from "next/server";

export async function getPatients(name?: string) {
  try {
    const res = await fetch("http://localhost:8000/patients");
    return res.json();
  } catch (error) {
    console.error("Failed to fetch:", error);

    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 },
    );
  }
}
