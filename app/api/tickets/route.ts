/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import Ticket, { connectDB } from "@/../(models)/ticket";

// GET all tickets
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const tickets = await Ticket.find({});
    return NextResponse.json(tickets.map(ticket => ({
      ...ticket.toObject(),
      _id: ticket._id.toString()
    })));
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Error fetching tickets" },
      { status: 500 }
    );
  }
}

// Create new ticket
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const newTicket = await Ticket.create(body);
    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Error creating ticket" },
      { status: 500 }
    );
  }
}