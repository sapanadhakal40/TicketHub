"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Ticket {
  _id: string;
  title?: string;
  description?: string;
  priority?: number;
  progress?: number;
  status?: string;
  category?: string;
}

interface EditTicketFormProps {
  ticket: Ticket;
}

const EditTicketForm = ({ ticket }: EditTicketFormProps) => {
  const EDITMODE = ticket._id && ticket._id !== "new";
  const router = useRouter();

  const startingTicketData = {
    title: ticket.title || "",
    description: ticket.description || "",
    priority: ticket.priority || 1,
    progress: ticket.progress || 0,
    status: ticket.status || "not_started",
    category: ticket.category || "bug",
  };

    const [formData, setFormData] = useState(startingTicketData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>) => {
        const value = e.target.type === "range" || e.target.type === "radio" 
        ? Number(e.target.value) :
         e.target.value;

         setFormData((prevstate) => ({
             ...prevstate,
             [e.target.name]: value,
         }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            if (EDITMODE) {
                const response = await fetch(`/api/tickets/${ticket._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error("Failed to update ticket");
                }
            } else {
                const response = await fetch("/api/tickets", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error("Failed to create ticket");
                }
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Error submitting form:", error);
            setError(error instanceof Error ? error.message : "Failed to submit ticket");
        } finally {
            setIsSubmitting(false);
        }
    }

    const categories = ["bug", "feature", "enhancement", "maintenance"];
    const statuses = ["not_started", "in_progress", "completed", "pending"];

    return (
        <div className="min-h-screen bg-card-bg dark:bg-primary-900 py-11">
            <div className="max-w-2xl mx-auto p-6 bg-card dark:bg-primary-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-default-text dark:text-default-text">
                    {EDITMODE ? "Edit Ticket" : "Create Ticket"}
                </h2>

                {error && (
                    <div className="text-red-500 dark:text-red-400 text-sm mt-2">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div >
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              required
              value={formData.title}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
                name="description"
               onChange={handleChange}
              required
              value={formData.description}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

            <div>

          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              onChange={handleChange}
              required
              value={formData.category}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
        >

            {categories.map((category) => (
                <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
            ))}
            </select>
          </div>

        <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="priority">
                Priority
            </label>
            <div className="flex flex-wrap gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex items-center">
                        <input
                            id={`priority-${num}`}
                            type="radio"
                            name="priority"
                            value={num}
                            checked={formData.priority === num}
                            onChange={handleChange}
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor={`priority-${num}`} className="ml-2 text-gray-700 dark:text-gray-300">
                            {num}
                            </label>
                            </div>
                ))}

            </div>
            </div>
           
           <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="progress">
              Progress: {formData.progress}%
            </label>
            <input
              type="range"
              id="progress"
              name="progress"
              value={formData.progress}
              min="0"
              max="100"
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

<div>
<label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="status">
  Status
</label>
<select
  id="status"
  name="status"
  value={formData.status}
  onChange={handleChange}
  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
>
  {statuses.map((status) => (
    <option key={status} value={status}>
     {status === "not_started" 
                    ? "Not Started" 
                    : status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
     </option>
    ))}

</select>
</div>

<div className="flex justify-end">
<button
  type="submit"
  disabled={isSubmitting}
  className={`btn-primary ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
>
{EDITMODE 
  ? (isSubmitting ? "Updating..." : "Update Ticket")
  : (isSubmitting ? "Creating..." : "Create Ticket")}
</button>
</div>
        </form>
      </div>
    </div>
    );
};

export default EditTicketForm;