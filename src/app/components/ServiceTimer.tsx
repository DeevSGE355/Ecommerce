import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { formatTimer, calculateHoursDifference } from '../utils/helpers';

interface ServiceTimerProps {
  startTime: string;
  endTime?: string;
  label: string;
}

export function ServiceTimer({ startTime, endTime, label }: ServiceTimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (endTime) {
      // If there's an end time, calculate once
      setElapsed(calculateHoursDifference(startTime, endTime));
      return;
    }

    // Update timer every minute if still running
    const updateTimer = () => {
      setElapsed(calculateHoursDifference(startTime));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return (
    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
      <Clock className="w-4 h-4 text-gray-600" />
      <div className="flex flex-col">
        <span className="text-xs text-gray-600">{label}</span>
        <span className="text-sm font-semibold text-gray-900">
          {formatTimer(elapsed)}
          {!endTime && <span className="ml-1 text-blue-600 animate-pulse">●</span>}
        </span>
      </div>
    </div>
  );
}
