'use client';

import StudyPage from "@/components/StudyPage";
import AllCardsPage from "@/components/AllCardsPage";
import Tabs from "@/components/Tabs";
import {useView} from "@/context/ViewContext";
import Sidebar from "@/components/Sidebar";
import {THEME_COLORS} from "@/app/constants/colors";

export default function Dashboard() {
    const { activeTab } = useView();

    return (
        <main className="w-full max-w-7xl mx-auto p-8 min-h-screen">
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
                <Tabs />
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                
                <div className="md:col-span-3 pt-8">
                    {activeTab === "Study Mode" ? <StudyPage /> : <AllCardsPage />}
                </div>
                
                {activeTab === "Study Mode" && (
                    <aside className="md:col-span-1 pt-8">
                        <Sidebar />
                    </aside>
                )}
            </div>
        </main>
    );
}