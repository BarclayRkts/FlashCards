import { useState, useMemo, useEffect } from 'react';
import { Flashcard } from "@/app/constants/types";

export const useStudyLogic = (cards: Flashcard[]) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
    const [hideMastered, setHideMastered] = useState(false);
    const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        setShuffledCards([]);
        setCurrentIndex(0);
    }, [selectedCategoryId, hideMastered]);

    const displayCards = useMemo(() => {
        let result = selectedCategoryId === 0
            ? cards
            : cards.filter(c => c.categoryId === selectedCategoryId);

        if (hideMastered) {
            result = result.filter(c => c.status !== "Mastered");
        }

        return shuffledCards.length > 0 ? shuffledCards : result;
    }, [cards, selectedCategoryId, hideMastered, shuffledCards]);

    const handleShuffle = () => {
        setShuffledCards([...displayCards].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
    };

    const handleNext = () => displayCards.length > 0 && setCurrentIndex((prev) => (prev + 1) % displayCards.length);
    const handlePrevious = () => displayCards.length > 0 && setCurrentIndex((prev) => (prev - 1 + displayCards.length) % displayCards.length);

    return {
        displayCards,
        currentIndex,
        selectedCategoryId,
        hideMastered,
        setSelectedCategoryId,
        setHideMastered,
        handleShuffle,
        handleNext,
        handlePrevious
    };
};