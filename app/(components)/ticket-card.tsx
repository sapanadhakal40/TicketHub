import DeleteBlock from "./delete-block"
import PriorityDisplay from "./priority-display"
import ProgressDisplay from "./progress-display"
import StatusDisplay from "./status-display"
import { Ticket } from "../types/ticket"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"

interface TicketCardProps {
    ticket: Ticket;
}


const TicketCard = ({ticket}: TicketCardProps) => {
    const formattedDate = new Date(ticket.createdAt).toLocaleDateString();

  return (
<div className="bg-card rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg border border-default-border">
    <div className="p-1 bg-primary-100 dark:bg-primary-800 border-b border-default-border">
    <div className="flex items-center justify-between p-2">
    <PriorityDisplay priority={ticket.priority} />

  <DeleteBlock id={ticket.id} />
    
    </div>
    </div>
    
    <div className="p-4 ">
       <h3 className="text-lg font-semibold text-default-text mb-1 truncate">{ticket.title}</h3>
      <div className="flex items-center text-sm text-primary-500 dark:text-primary-400 mb-3">
        <FontAwesomeIcon icon={faClock} className="mr-1" />
        <span>{formattedDate}</span>
        </div>
        <p className="text-primary-600 dark:text-primary-300 text-sm">
          {ticket.description}
        </p>
    
    
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
    
  </div>
  )
}

export default TicketCard


 {/* // import { faClock, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";


// // components/TicketCard.tsx
// "use client";

// import StatusDisplay from "./StatusDisplay";
// import PriorityDisplay from "./PriorityDisplay";
// import DeleteBlock from "./DeleteBlock";
// import ProgressDisplay from "./ProgressDisplay";
// import Link from "next/link";
// import { Ticket } from "../types/Ticket";
// import { formatDistanceToNow } from "date-fns";
// import { useState } from "react";
// import { faClock, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// interface TicketCardProps {
//   ticket: Ticket;
// }

// const TicketCard = ({ ticket }: TicketCardProps) => {
//   const [isHovered, setIsHovered] = useState(false);
  
//   // Format the created time to be more readable
//   const formattedTime = formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true });
  
//   // Truncate the description if it's too long
//   const truncateDescription = (desc: string, maxLength: number = 100) => {
//     if (desc.length <= maxLength) return desc;
//     return desc.substring(0, maxLength) + "...";
//   };

//   return (
//     <div 
//       className="bg-card rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg border border-default-border"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="p-1 bg-primary-100 dark:bg-primary-800 border-b border-default-border">
//         <div className="flex items-center justify-between p-2">
//           <PriorityDisplay priority={ticket.priority} />
//           <DeleteBlock id={ticket.id} />
//         </div>
//       </div>
      
//       <Link href={`/TicketPage/${ticket.id}`} className="block p-4 hover:bg-card-hover">
//         <div className="mb-3">
//           <h3 className="text-lg font-semibold text-default-text mb-1 truncate">{ticket.title}</h3>
//           <div className="flex items-center text-xs text-primary-500 dark:text-primary-400 mb-2">
//             <FontAwesomeIcon icon={faClock} className="mr-1" />
//             <span>{formattedTime}</span>
//           </div>
//           <p className="text-primary-600 dark:text-primary-300 text-sm">
//             {truncateDescription(ticket.description)}
//           </p>
//         </div>
        
//         <div className="mt-4 space-y-3">
//           <ProgressDisplay progress={ticket.progress} />
          
//           <div className="flex items-center justify-between">
//             <StatusDisplay status={ticket.status} />
            
//             <div className={`transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
//               <Link href={`/TicketPage/${ticket.id}`} className="inline-flex items-center justify-center px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800">
//                 <FontAwesomeIcon icon={faEye} className="mr-1" size="sm" />
//                 View
//               </Link>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default TicketCard; */}