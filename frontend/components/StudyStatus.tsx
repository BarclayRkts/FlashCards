import React from 'react';

interface Props {
    currentStatus: string;
    onStatusChange: (status: string) => void;
}

const StudyStatus = ({ currentStatus, onStatusChange }: Props) => {
    const getButtonStyle = (status: string, baseColor: string) => {
        const isActive = currentStatus === status;
        const bgColor = isActive ? baseColor : "bg-gray-200";
        return `flex items-center gap-2 px-6 py-2 font-bold border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${bgColor}`;
    };
    
    return (
        <div className="flex items-center justify-center gap-4 py-6 border-t-2 border-black bg-white">
            <button
                onClick={() => onStatusChange('Not Started')}
                className={getButtonStyle('Not Started', 'bg-red-200')}
            >
                ✕ NOT STARTED
            </button>
            <button
                onClick={() => onStatusChange('In Progress')}
                className={getButtonStyle('In Progress', 'bg-purple-200')}            
            >
                📖 IN PROGRESS
            </button>
            <button
                onClick={() => onStatusChange('Mastered')}
                className={getButtonStyle('Mastered', 'bg-teal-200')}
            >
                ✓ MASTERED
            </button>
        </div>
    );
};

export default StudyStatus;