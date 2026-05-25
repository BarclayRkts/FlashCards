'use client';

import StudyPage from "@/components/StudyPage";
import AllCardsPage from "@/components/AllCardsPage";
import {useView} from "@/context/ViewContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Dashboard() {
    const { activeTab } = useView();

    return (
        <main className="w-full max-w-7xl mx-auto p-8 min-h-screen">
            <Header/>
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