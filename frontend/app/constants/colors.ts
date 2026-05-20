// export const THEME_COLORS = {
//     // Main application backdrop
//     canvas: '#d7c4b1', // Warm Desert Tan
//
//     // Flashcard highlights
//     flashcardBg: '#908f98', // Neon Pink
//
//     // Header and interactive buttons
//     accentYellow: '#95aa9e', // Brutal Yellow
//
//     // The surrounding control borders & container backgrounds
//     cardWrapper: '#FF0000',  // Change this if you don't want white framing!
//     border: '#800000',
//     sidebarBg: '#FF0000',
//
//     // Progress metrics badges
//     stats: {
//         totalCards: '#818cf8', // Lavender Blue
//         mastered: '#2dd4bf',   // Teal
//         inProgress: '#ff7bc2', // Pink
//         notStarted: '#facc15', // Yellow
//     }
// } as const;

export const THEME_COLORS = {
    // Main application backdrop canvas
    canvas: '#d7c4b1',        // Soft Editorial Bone Cream

    // The active flashcard background face
    flashcardBg: '#95aa9e',   // Signature Pop Neon Pink
    flashcardBgFlipped: '#ffffff',

    // Header navigation highlights and active toggles
    accentYellow: '#facc15',  // Brutal Yellow

    // Structural containers & line strokes
    cardWrapper: '#ffffff',   // Clean White Control Frames
    sidebarBg: '#ffffff',     // Clean White Stats Frame
    border: '#000000',        // Heavy Ink Black Outlines

    // Progress metrics card badges
    stats: {
        totalCards: '#818cf8',  // Soft Cornflower Blue
        mastered: '#2dd4bf',    // Vibrant Mint Teal
        inProgress: '#ff7bc2',  // Pop Neon Pink
        notStarted: '#facc15',  // Brutal Yellow
    }
} as const;