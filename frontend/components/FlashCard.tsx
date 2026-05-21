import React, { useState } from 'react';
import {THEME_COLORS} from "@/app/constants/colors";

interface FlashcardProps {
    card: {
        question: string;
        answer: string;
        category: string;
    };
}

const Flashcard = ({ card }: FlashcardProps) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            style={{ backgroundColor: flipped ? THEME_COLORS.flashcardBgFlipped : THEME_COLORS.flashcardBg }}
            className="p-12 min-h-80 flex flex-col justify-center items-center text-center cursor-pointer select-none transition-colors"
            onClick={() => setFlipped(!flipped)}
        >
      <span className="px-3 py-1 bg-white border-2 border-black rounded-full font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {card.category}
      </span>
            <h2 className="text-3xl font-black mt-6 max-w-xl leading-snug text-black">
                {flipped ? card.answer : card.question}
            </h2>
            <p className="text-xs font-bold text-black/60 mt-6 uppercase tracking-widest animate-pulse">
                {flipped ? "Click to see question" : "Click to reveal answer"}
            </p>
        </div>
    );
};

export default Flashcard;