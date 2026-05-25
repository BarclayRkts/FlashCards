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
    category: Category | null; // This matches the object coming back from your API
    status: string;
    createdAt: string;
    updatedAt: string | null;
    frontImage: string | null;
}