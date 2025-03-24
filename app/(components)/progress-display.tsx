interface ProgressDisplayProps {
    progress: number;
    }

const ProgressDisplay = ({progress}: ProgressDisplayProps) => {

    const normalizeProgress = Math.min(100, Math.max(0, progress));

    const getProgressColor = () => {
        if (normalizeProgress < 25) return 'bg-red-500';
        if (normalizeProgress < 50) return 'bg-yellow-500';
        if (normalizeProgress < 75) return 'bg-blue-500';
        return 'bg-green-500';
    }
  return (
    <div className="w-full">
    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Progress</span>
        <span>{normalizeProgress}%</span>
    </div>
    <div className="w-full h-2 bg-gray-200 rounded-full">
        <div className={`h-full rounded-full ${getProgressColor()}`} style={{ width: `${normalizeProgress}%` }}>

        </div>
    </div>
    </div>
  )
}

export default ProgressDisplay