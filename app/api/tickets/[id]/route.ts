// app/api/tickets/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Ticket, { connectDB} from '../../../../(models)/ticket';
import { isValidObjectId } from 'mongoose';


// Get a specific ticket
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isValidObjectId(params.id)) {
        return NextResponse.json(
          { error: "Invalid ticket ID format" },
          { status: 400 }
        );
      }
    await connectDB();
    const ticket = await Ticket.findById(params.id);
    if (!ticket) {
        return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
      }
  
      return NextResponse.json({
        ...ticket.toObject(),
        _id: ticket._id.toString(),
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
  { params }: { params: { id: string } }
) {
  try {
    if (!isValidObjectId(params.id)) {
        return NextResponse.json(
          { error: "Invalid ticket ID" },
          { status: 400 }
        );
      }
  
      await connectDB();
      const body = await request.json();
      const updatedTicket = await Ticket.findByIdAndUpdate(
        params.id,
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
  { params }: { params: { id: string } }
) {
  try {
    if (!isValidObjectId(params.id)) {
        return NextResponse.json(
          { error: "Invalid ticket ID" },
          { status: 400 }
        );
      }
   await connectDB();
    const deletedTicket = await Ticket.findByIdAndDelete(params.id);
    
    if (!deletedTicket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Ticket successfully deleted" });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Error deleting ticket" }, { status: 500 });
  }
}
