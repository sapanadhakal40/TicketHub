import { faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PriorityDisplayProps {
    priority: number;
}

const PriorityDisplay = ({ priority }: PriorityDisplayProps) => {
    const getPriorityLabel = (p: number): string => {
        switch(p) {
            case 1:
                return "Low";
            case 2:
                return "Medium";
            case 3:
                return "High";
            case 4:
                return "Critical";
            
                default: return `Priority Level ${p}`;
        }
    }

    const getIconColor = (index: number) => {
        return index < priority ? 
            "text-red-500 dark:text-red-400" : 
            "text-gray-300 dark:text-gray-600";
    }

    return (
        <div className="flex items-center" title={getPriorityLabel(priority)}>
            {[...Array(4)].map((_, i) => (
                <FontAwesomeIcon
                    key={i}
                    icon={faFire}
                    className={`h-4 w-4 ${getIconColor(i)} mr-1`}
                />
            
            ))}
        </div>
    );
}

export default PriorityDisplay;