"use client";


import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const DeleteBlock = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/tickets/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete ticket");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries( {queryKey: ['tickets'] });
      toast.success("Ticket deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });


  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      deleteMutation.mutate(id);
      }
    };
  
 

  return (
    <div className="relative">
      <button
        onClick={handleDelete}
        disabled={deleteMutation.isPending}
        className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
        aria-label="Delete ticket">
         <FontAwesomeIcon 
          icon={faTrash} 
          className={`w-5 h-5 ${deleteMutation.isPending ? 'animate-pulse' : ''}`} 
        />
      </button>
    </div>
      
  );
};

export default DeleteBlock;