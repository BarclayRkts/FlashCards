import {THEME_COLORS} from "@/app/constants/colors";

interface Props {
    onPrevious: () => void;
    onNext: () => void;
    currentIndex: number;
    totalCards: number;
}

const StudyNavigation = ({ onPrevious, onNext, currentIndex, totalCards }: Props)=> {
    const buttonStyle = { borderColor: THEME_COLORS.border };

    return (
        <div
            style={{
                backgroundColor: THEME_COLORS.cardWrapper,
                borderTopColor: THEME_COLORS.border
            }}
            className="p-4 flex justify-between items-center border-t-2"
        >
            <button
                onClick={onPrevious}
                style={buttonStyle}
                className="bg-white hover:bg-gray-50 text-black font-bold py-2 px-4 border-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
                ‹ Previous
            </button>
            <span className="text-xs font-bold text-gray-600">
        Card {currentIndex + 1} of {totalCards}
      </span>
            <button
                onClick={onNext}
                style={buttonStyle}
                className="bg-white hover:bg-gray-50 text-black font-bold py-2 px-4 border-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
                Next ›
            </button>
        </div>
    );
}

export default StudyNavigation;