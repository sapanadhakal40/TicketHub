/* eslint-disable @typescript-eslint/no-unused-vars */
import DeleteBlock from "./delete-block"
import PriorityDisplay from "./priority-display"
import ProgressDisplay from "./progress-display"
import StatusDisplay from "./status-display"
import { Ticket } from "../types/ticket"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faEdit, } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useState } from "react"

interface TicketCardProps {
    ticket: Ticket;
}
 
 const TicketCard = ({ ticket }: TicketCardProps) => {
   const [isHovered, setIsHovered] = useState(false);

   const formattedDate = new Date(ticket.createdAt).toLocaleDateString();

   const truncateDescription = (desc: string, maxLength: number = 100) => {
         if (desc.length <= maxLength) return desc;
        return desc.substring(0, maxLength) + "...";
       };

return (
  <div className="bg-card w-full h-full rounded-lg p-6 gap-4 shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg border border-default-border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

    <div className="p-1 bg-primary-100 dark:bg-primary-800 border-b border-default-border">
      <div className="flex items-center justify-between p-2">
        <PriorityDisplay priority={ticket.priority} />
        <div className="flex space-x-2">
          <Link href={`/ticket-page/${ticket.id}`} className="text-primary-600 hover:text-primary-800 transition-colors">
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <DeleteBlock id={ticket.id} />
        </div>
      </div>
    </div>



         <div className="mb-3">
          <h3 className="text-lg font-semibold text-default-text mb-1 truncate">{ticket.title}</h3>
          <div className="flex items-center text-xs text-primary-500 dark:text-primary-400 mb-2">
             <FontAwesomeIcon icon={faClock} className="mr-1" />
             <span>{formattedDate}</span>
          </div>
          <p className="text-primary-600 dark:text-primary-300 text-sm">
            {truncateDescription(ticket.description)}
          </p>
       </div>
    
    
      
      <div className="mt-4 space-y-3">
        <ProgressDisplay progress={ticket.progress} />
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <StatusDisplay status={ticket.status} />
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-full">
            {ticket.category}
          </span>
         
      </div>
    </div>
 
</div>

)
}

export default TicketCard;