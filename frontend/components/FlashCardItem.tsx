import React from 'react';
import {Flashcard} from "@/app/constants/types";

interface FlashcardItemProps {
    card: Flashcard;
    onDelete: (id: number) => void;
    isSelected: boolean;
    onToggleSelect: () => void;
}

const FlashcardItem = ({ card, onDelete, isSelected, onToggleSelect }: FlashcardItemProps) => {
    return (
        <div className="flex items-center gap-4 p-4 border-2 border-black rounded-xl bg-white">
            <input
                type="checkbox"
                className="w-5 h-5"
                checked={isSelected}
                onChange={onToggleSelect}
            />
            <div className="w-12 h-12 bg-gray-100 rounded-lg border-2 border-black flex items-center justify-center">
                🖼️
            </div>
            <div className="flex-1">
                <p className="font-bold">{card.frontSide}</p>
                <p className="text-sm text-gray-600">{card.backSide}</p>
            </div>
            <span className="px-3 py-1 border-2 border-black rounded-full text-xs font-bold">
                {card.category?.name || "No Category"}
            </span>
            <div className="flex gap-2">
                <button className="p-2 border-2 border-black rounded-lg">✏️</button>
                <button
                    className="p-2 border-2 border-black rounded-lg"
                    onClick={() => onDelete(card.id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default FlashcardItem;