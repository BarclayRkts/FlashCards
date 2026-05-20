import type { Metadata } from "next";
import { THEME_COLORS } from "./constants/colors";
import "./globals.css";

export const metadata: Metadata = {
    title: "Flashcard Hub",
    description: "Neo-brutalist workspace application",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            style={{ backgroundColor: `${THEME_COLORS.canvas} !important` }}
            className="min-h-screen text-black antialiased"
        >
        <div className="max-w-6xl mx-auto p-8 flex flex-col gap-8">

            <header className="flex justify-between items-center w-full border-b-2 border-black pb-4">
                <div className="flex items-center gap-2">
                    <div
                        style={{ backgroundColor: THEME_COLORS.accentYellow }}
                        className="w-8 h-8 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-sm"
                    >
                        F
                    </div>
                    <span className="text-xl font-extrabold tracking-tight">Flashcard</span>
                </div>

                <div className="flex gap-2 bg-white border-2 border-black p-1 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <button
                        style={{ backgroundColor: THEME_COLORS.accentYellow }}
                        className="text-black font-bold px-4 py-1.5 rounded-full text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                        Study Mode
                    </button>
                    <button className="text-black font-bold px-4 py-1.5 rounded-full text-sm hover:bg-gray-100 transition-colors">
                        All Cards
                    </button>
                </div>
            </header>

            {children}
        </div>
        </body>
        </html>
    );
}