import { faCheckCircle, faHourglass, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




interface StatusDisplayProps {
    status: string;
}


const StatusDisplay = ({ status }: StatusDisplayProps) => {
    const getStatusIcon = (s: string) => {
        const normalizeStatus = s.toLowerCase();

        switch(normalizeStatus) {
            case "completed":
                return faCheckCircle;
            case "in progress":
                return faHourglass;
            case "pending":
                return faCircleExclamation;
            default:
                return faCircleExclamation;
        }
    }
    return (
        <div className="flex items-center">
            <FontAwesomeIcon icon={getStatusIcon(status)} className="text-primary-500 dark:text-primary-400" />
            <span className="ml-2">{status}</span>
        </div>
    );
}

export default StatusDisplay
