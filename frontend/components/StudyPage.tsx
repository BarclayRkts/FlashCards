'use client';

import React, {useState} from 'react';
import FlashCard from "@/components/FlashCard";
import StudyNavigation from "@/components/StudyNavigation";
import StudyControls from "@/components/StudyControls";
import {THEME_COLORS} from "@/app/constants/colors";

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

const StudyPage = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const currentCard = MOCK_CARDS[currentCardIndex];

    const handleNext = () => {
        setCurrentCardIndex((prev) => (prev + 1) % MOCK_CARDS.length);
    };

    const handlePrevious = () => {
        setCurrentCardIndex((prev) => (prev - 1 + MOCK_CARDS.length) % MOCK_CARDS.length);
    };

    return (

        <>
            <section style={{backgroundColor: THEME_COLORS.cardWrapper, borderColor: THEME_COLORS.border}}
                     className="md:col-span-2 border-2 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
                <StudyControls/>

                <FlashCard card={currentCard}/>

                <StudyNavigation
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    currentIndex={currentCardIndex}
                    totalCards={MOCK_CARDS.length}/>
            </section>
        </>
        
    );
}

export default StudyPage;