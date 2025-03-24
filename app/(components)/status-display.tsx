import { faCheckCircle, faHourglass, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




interface StatusDisplayProps {
    status: string;
}


const StatusDisplay = ({ status }: StatusDisplayProps) => {
    const getStatusIcon = (status: string) => {
        const normalizeStatus = status.toLowerCase().replace('_', ' ');

        switch(normalizeStatus) {
            case "completed":
                return { icon: faCheckCircle, color: "text-green-500" };
            case "in progress":
                return { icon: faHourglass, color: "text-blue-500" };
            case "pending":
                return { icon: faCircleExclamation, color: "text-yellow-500" };
            default:
                return { icon: faCircleExclamation, color: "text-gray-500" };
        }
    }

    const { icon, color } = getStatusIcon(status);

    return (
        <div className="flex items-center">
            <FontAwesomeIcon icon={icon} className={`${color} w-4 h-4` }/>
            <span className="ml-2 text-sm capitalize">{status.replace('_', ' ')}</span>
        </div>
    );
}

export default StatusDisplay
