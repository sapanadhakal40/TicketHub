import EditTicketForm from "../../(components)/edit-ticket-form";
import { isValidObjectId } from "mongoose";


interface PageParams {

    id: string;
  };
  interface TicketData {
    _id: string;
    title: string;
    description: string;
    category: string;
    priority: number;
    progress: number;
    status: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  }

  const getTicketById = async (id: string) => {
    try {
      if (!isValidObjectId(id)) {
        console.error("Invalid ticket ID format");
        return null;
      }
  
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/api/tickets/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }

      const data = await res.json();
      return {
        ...data,
        _id: data._id.toString() 
      };
     
    } catch (error) {
      console.error("Error fetching data:", error);
    return null;
  }
};
  
const TicketPage = async ({ params }: { params: PageParams }) => {
  const isEditMode = params.id !== "new" ;

  const initialTicketData: TicketData = {
    _id: "new",
    title: "",
    description: "",
    category: "bug",
    priority: 1,
    progress: 0,
    status: "not_started",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  let ticketData = initialTicketData;

  if (isEditMode) {
    
      const ticket = await getTicketById(params.id);
      if (ticket) {
        ticketData = {
          ...ticket,
          _id: params.id // Ensure we use the ID from params
        };
      }
    }
  return <EditTicketForm ticket={ticketData} />;
};

export default TicketPage;
