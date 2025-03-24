"use client";

import { useRouter } from "next/navigation";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-hot-toast";

const DeleteBlock = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) {
        return;
      }
      setIsDeleting(true);
    
    try {
        const response = await fetch(`/api/tickets/${id}`, {
            method: "DELETE",
           
            
          });
    
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete ticket");
      }
      toast.success("Ticket deleted successfully");
     
      router.refresh();
      router.push("/");
  
    } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to delete ticket");
       
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
        aria-label="Delete ticket">
         <FontAwesomeIcon 
          icon={faTrash} 
          className={`w-5 h-5 ${isDeleting ? 'animate-pulse' : ''}`} 
        />
      </button>
    </div>
      
  );
};

export default DeleteBlock;