'use client';

import React, {useEffect, useState} from 'react';
import { THEME_COLORS } from "@/app/constants/colors";
import CreateFlashcardModal from "@/components/CreateFlashcardModal";


const AllCardsPage = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5059/flashcards')
            .then(res => res.json())
            .then(data => setCards(data))
            .catch(err => console.error("Error fetching cards:", err));
    }, []);
    
    const closeModal = () => {
        setIsOpen(false);
    }
    
    return (
        <section
            style={{ backgroundColor: THEME_COLORS.cardWrapper, borderColor: THEME_COLORS.border }}
            className="border-2 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 w-full"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black">
                    DECK COLLECTION ({cards.length} {cards.length === 1 ? 'Card' : 'Cards'})
                </h2>
            </div>
            
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search flashcards..."
                    className="flex-1 p-3 border-2 border-black rounded-xl"
                />
                <button className="px-6 py-3 border-2 border-black rounded-xl font-bold hover:bg-gray-50">
                    Bulk Actions ▾
                </button>
            </div>
            
            <div className="flex flex-col gap-4">
                {cards.map((card: any) => (
                    <div key={card.id} className="flex items-center gap-4 p-4 border-2 border-black rounded-xl bg-white">
                        <input type="checkbox" className="w-5 h-5" />
                        <div className="w-12 h-12 bg-gray-100 rounded-lg border-2 border-black flex items-center justify-center">
                            {/* Icon placeholder */}
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
                            <button className="p-2 border-2 border-black rounded-lg">🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {isOpen && <CreateFlashcardModal isOpen={isOpen} onClose={closeModal}/>}

            <button
                className="w-full mt-8 py-4 border-2 border-black rounded-xl font-black text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}>
                + Create New Flashcard
            </button>
        </section>
    );
};

export default AllCardsPage;