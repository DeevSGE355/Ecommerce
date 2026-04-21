import { ServiceStatus } from '../types';
import { getStatusColor, getStatusLabel } from '../utils/helpers';
import { Check } from 'lucide-react';

interface ServiceProgressBarProps {
  currentStatus: ServiceStatus;
}

const statuses: ServiceStatus[] = ['diagnosa', 'menunggu-konfirmasi', 'perbaikan', 'uji-coba', 'selesai'];

export function ServiceProgressBar({ currentStatus }: ServiceProgressBarProps) {
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {statuses.map((status, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={status} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? `${getStatusColor(status)} border-transparent text-white`
                      : 'bg-white border-gray-300 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-opacity-30 ring-blue-300' : ''}`}
                >
                  {isCompleted && index < currentIndex ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <p
                  className={`mt-2 text-xs text-center font-medium max-w-[80px] ${
                    isCompleted ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {getStatusLabel(status)}
                </p>
              </div>
              
              {index < statuses.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-all ${
                    index < currentIndex ? getStatusColor(status) : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
