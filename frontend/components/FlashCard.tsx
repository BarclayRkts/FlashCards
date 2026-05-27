import React, { useState } from 'react';
import {THEME_COLORS} from "@/app/constants/colors";
import type { Flashcard } from "@/app/constants/types";

interface FlashCardProps {
    card: Flashcard;
}

const Flashcard = ({ card }: FlashCardProps) => {
    const [flipped, setFlipped] = useState(false);

    if (!card) {
        return (
            <div className="p-10 text-center border-2 border-dashed rounded-lg">
                <p>No cards available to study.</p>
            </div>
        );
    }

    return (
        <div
            style={{ backgroundColor: flipped ? THEME_COLORS.flashcardBgFlipped : THEME_COLORS.flashcardBg }}
            className="p-12 min-h-80 flex flex-col justify-center items-center text-center cursor-pointer select-none transition-colors"
            onClick={() => setFlipped(!flipped)}
        >
      <span className="px-3 py-1 bg-white border-2 border-black rounded-full font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {card?.category?.name ?? "No Category"}
      </span>
            <h2 className="text-3xl font-black mt-6 max-w-xl leading-snug text-black">
                {flipped ? card.backSide : card.frontSide}
            </h2>
            <p className="text-xs font-bold text-black/60 mt-6 uppercase tracking-widest animate-pulse">
                {flipped ? "Click to see question" : "Click to reveal answer"}
            </p>
        </div>
    );
};

export default Flashcard;