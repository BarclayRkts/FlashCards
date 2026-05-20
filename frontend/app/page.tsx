'use client';

import React, { useState } from 'react';
import Sidebar from "./Home/Sidebar";
import FlashCard from "./Home/FlashCard";
import { THEME_COLORS } from "./constants/colors"; // Import our centralized constants

interface Card {
    id: number;
    question: string;
    answer: string;
    category: string;
}

const MOCK_CARDS: Card[] = [
    {
        id: 1,
        question: "What does HTML stand for?",
        answer: "Hypertext Markup Language",
        category: "Web Development"
    },
    {
        id: 2,
        question: "What is the purpose of the useEffect hook in React?",
        answer: "To handle side effects in functional components, such as data fetching, subscriptions, or manual DOM manipulations.",
        category: "Web Development"
    }
];

export default function StudyPage() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const currentCard = MOCK_CARDS[currentCardIndex];

    const handleNext = () => {
        setCurrentCardIndex((prev) => (prev + 1) % MOCK_CARDS.length);
    };

    const handlePrevious = () => {
        setCurrentCardIndex((prev) => (prev - 1 + MOCK_CARDS.length) % MOCK_CARDS.length);
    };

    return (
        <main className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start w-full mt-4">

            {/* STUDY CARD OUTER SECTION */}
            <section
                style={{
                    backgroundColor: THEME_COLORS.cardWrapper,
                    borderColor: THEME_COLORS.border
                }}
                className="md:col-span-2 border-2 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >

                {/* Sub-header controls row */}
                <div
                    style={{
                        backgroundColor: THEME_COLORS.cardWrapper,
                        borderBottomColor: THEME_COLORS.border
                    }}
                    className="p-4 border-b-2 flex justify-between items-center gap-4 flex-wrap"
                >
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <select
                                style={{ borderColor: THEME_COLORS.border }}
                                className="appearance-none bg-white border-2 px-4 py-2 pr-10 rounded-xl font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none cursor-pointer"
                            >
                                <option>All Categories</option>
                                <option>Web Development</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none font-bold text-xs">▼</div>
                        </div>

                        <label className="flex items-center gap-2 font-bold text-sm cursor-pointer select-none">
                            <input type="checkbox" className="w-4 h-4 accent-black border-2 border-black rounded cursor-pointer" />
                            <span>Hide Mastered</span>
                        </label>
                    </div>

                    <button
                        style={{ borderColor: THEME_COLORS.border }}
                        className="bg-white hover:bg-gray-50 text-black font-bold py-2 px-4 border-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                    >
                        Shuffle
                    </button>
                </div>

                {/* ACTIVE CARD CONTAINER */}
                <FlashCard card={currentCard} />

                {/* Footer Navigation Controls row */}
                <div
                    style={{
                        backgroundColor: THEME_COLORS.cardWrapper,
                        borderTopColor: THEME_COLORS.border
                    }}
                    className="p-4 flex justify-between items-center border-t-2"
                >
                    <button
                        onClick={handlePrevious}
                        style={{ borderColor: THEME_COLORS.border }}
                        className="bg-white hover:bg-gray-50 text-black font-bold py-2 px-4 border-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                    >
                        ‹ Previous
                    </button>
                    <span className="text-xs font-bold text-gray-600">
                        Card {currentCardIndex + 1} of {MOCK_CARDS.length}
                    </span>
                    <button
                        onClick={handleNext}
                        style={{ borderColor: THEME_COLORS.border }}
                        className="bg-white hover:bg-gray-50 text-black font-bold py-2 px-4 border-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                    >
                        Next ›
                    </button>
                </div>
            </section>

            {/* METRICS SIDEBAR */}
            <Sidebar/>

        </main>
    );
}