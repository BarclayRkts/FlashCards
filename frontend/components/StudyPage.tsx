'use client';

import React, {useEffect, useState} from 'react';
import FlashCard from "@/components/FlashCard";
import StudyNavigation from "@/components/StudyNavigation";
import StudyControls from "@/components/StudyControls";
import {THEME_COLORS} from "@/app/constants/colors";
import {Flashcard} from "@/app/constants/types";
import { useStudyLogic } from "@/hooks/useStudyLogic";

const StudyPage = () => {
    const [cards, setCards] = useState<Flashcard[]>([]);
    let baseURL = "http://localhost:5059";
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const {
        displayCards, currentIndex, selectedCategoryId, hideMastered,
        setSelectedCategoryId, setHideMastered, handleShuffle, handleNext, handlePrevious
    } = useStudyLogic(cards);

    useEffect(() => {
        fetch(`${baseURL}/flashcards`)
            .then(res => res.json())
            .then(data => {
                setCards(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching cards:", err));
    }, []);

    useEffect(() => {
        fetch(`${baseURL}/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    const categoryCounts = cards.reduce((acc, card) => {
        acc[card.categoryId] = (acc[card.categoryId] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    if (loading) return <div>Loading...</div>;
    const currentCard = displayCards[currentIndex];

    return (

        <>
            <section style={{backgroundColor: THEME_COLORS.cardWrapper, borderColor: THEME_COLORS.border}}
                     className="md:col-span-2 border-2 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
                <StudyControls
                    categories={categories}
                    categoryCounts={categoryCounts}
                    onCategoryChange={setSelectedCategoryId}
                    hideMastered={hideMastered}
                    onToggleHideMastered={() => setHideMastered(!hideMastered)}
                    onShuffle={handleShuffle}
                />

                <FlashCard card={currentCard} />

                <StudyNavigation
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    currentIndex={currentIndex}
                    totalCards={displayCards.length}
                />
            </section>
        </>
        
    );
}

export default StudyPage;