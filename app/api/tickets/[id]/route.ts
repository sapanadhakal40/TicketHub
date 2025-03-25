import { NextRequest, NextResponse } from 'next/server';
import Ticket, { connectDB } from '../../../../(models)/ticket';
import { isValidObjectId } from 'mongoose';

// Get a specific ticket
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: `Invalid ticket ID format: ${id}` },
        { status: 400 }
      );
    }

    await connectDB();
    const ticket = await Ticket.findById(id);
    
    if (!ticket) {
      return NextResponse.json(
        { error: `Ticket not found: ${id}` }, 
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...ticket.toObject(),
      _id: ticket._id.toString()
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update a ticket
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    
    const body = await request.json();
    await connectDB();
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid ticket ID" },
        { status: 400 }
      );
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedTicket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Error updating ticket" }, { status: 500 });
  }
}

// Delete a ticket
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid ticket ID" },
        { status: 400 }
      );
    }

    await connectDB();
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    
    if (!deletedTicket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Ticket successfully deleted" });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Error deleting ticket" }, { status: 500 });
  }
}