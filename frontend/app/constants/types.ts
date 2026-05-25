export interface Category {
    id: number;
    name: string;
}

export interface Flashcard {
    id: number;
    name: string;
    frontSide: string;
    backSide: string;
    categoryId: number;
    category: Category | null;
    status: string;
    createdAt: string;
    updatedAt: string | null;
    frontImage: string | null;
}

export interface StudyStats {
    total: number;
    mastered: number;
    inProgress: number;
    notStarted: number;
}