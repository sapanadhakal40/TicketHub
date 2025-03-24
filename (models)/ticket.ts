import mongoose, { Schema} from "mongoose";


const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not defined');
    }
    return mongoose.connect(process.env.MONGODB_URI);
}


const ticketSchema = new Schema({
  title: String,
  description: String,
  category: String,
  priority: Number,
    progress:{ type: Number, default: 0 },
  status: String,
  active: { type: Boolean, default: true },
}, 
{ timestamps: true });


const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export { connectDB };

export default Ticket;