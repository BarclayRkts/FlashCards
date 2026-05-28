'use client';

import React, {useEffect, useMemo, useState} from 'react';
import { THEME_COLORS } from "@/app/constants/colors";
import CreateFlashcardModal from "@/components/CreateFlashcardModal";
import FlashcardItem from "@/components/FlashCardItem";
import {Flashcard} from "@/app/constants/types";


const AllCardsPage = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [editingCard, setEditingCard] = useState<Flashcard | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/flashcards`)
            .then(res => res.json())
            .then(data => setCards(data))
            .catch(err => console.error("Error fetching cards:", err));
    }, []);
    
    const closeModal = () => {
        setIsOpen(false);
    }

    const fetchCards = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/flashcards`);
        const data = await res.json();
        setCards(data);
    }

    const toggleSelection = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const deleteCards = async (ids: number[]) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/flashcards/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ids),
            });

            if (response.ok) {
                setCards(prevCards => prevCards.filter(card => !ids.includes(card.id)));
                if (typeof setSelectedIds === 'function') setSelectedIds([]);
            } else {
                console.error("Failed to delete cards");
            }
        } catch (err) {
            console.error("Error during deletion:", err);
        }
    };

    const openEditModal = (card: Flashcard) => {
        setEditingCard(card);
        setIsOpen(true);
    };

    const filteredCards = useMemo(() => {
        return cards.filter((card: any) =>
            card.frontSide.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.backSide.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [cards, searchQuery]);
    
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 p-3 border-2 border-black rounded-xl"
                />
                <button className="px-6 py-3 border-2 border-black rounded-xl font-bold hover:bg-gray-50"
                        onClick={() => deleteCards(selectedIds)}
                >
                    Delete Selected
                </button>
            </div>
            
            <div className="flex flex-col gap-4 overflow-y-auto pr-2 max-h-125">
                {filteredCards.map((card: any) => (
                    <FlashcardItem
                        key={card.id}
                        card={card}
                        onDelete={(id) => deleteCards([id])}
                        isSelected={selectedIds.includes(card.id)}
                        onToggleSelect={() => toggleSelection(card.id)}
                        onEdit={() => openEditModal(card)}
                    />
                ))}
            </div>

            {isOpen && <CreateFlashcardModal isOpen={isOpen} onClose={closeModal} onSuccess={fetchCards} isEdit={!!editingCard}
                                             cardToEdit={editingCard as Flashcard}/>}

            <button
                className="w-full mt-8 py-4 border-2 border-black rounded-xl font-black text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}>
                + Create New Flashcard
            </button>
        </section>
    );
};

export default AllCardsPage;