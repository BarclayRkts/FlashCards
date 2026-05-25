'use client';

import React, {useEffect, useState} from 'react';
import FlashCard from "@/components/FlashCard";
import StudyNavigation from "@/components/StudyNavigation";
import StudyControls from "@/components/StudyControls";
import {THEME_COLORS} from "@/app/constants/colors";
import {Flashcard} from "@/app/constants/types";

const StudyPage = () => {
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5059/flashcards')
            .then(res => res.json())
            .then(data => {
                setCards(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching cards:", err));
    }, []);

    const handleNext = () => {
        if (cards.length > 0) {
            setCurrentCardIndex((prev) => (prev + 1) % cards.length);
        }
    };

    const handlePrevious = () => {
        if (cards.length > 0) {
            setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
        }
    };

    if (loading) return <div>Loading your study deck...</div>;
    if (cards.length === 0) return <div>No cards found in your collection.</div>;

    const currentCard = cards[currentCardIndex];

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
                    totalCards={cards.length}
                />
            </section>
        </>
        
    );
}

export default StudyPage;