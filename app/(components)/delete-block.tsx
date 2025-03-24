import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DeleteBlockProps {
    id: string;
}

const DeleteBlock = ({ }: DeleteBlockProps) => {
    return (
        <button className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300" aria-label="Delete ticket">
            <FontAwesomeIcon icon={faX} />
        </button>
    );
}

export default DeleteBlock;