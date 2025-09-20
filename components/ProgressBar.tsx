
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <p className="text-center text-sm text-slate-600 mb-2">
        السؤال {current} من {total}
      </p>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div
          className="bg-teal-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
