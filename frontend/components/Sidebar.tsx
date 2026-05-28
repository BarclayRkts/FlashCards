import React, {useEffect, useState} from 'react';
import {THEME_COLORS} from "@/app/constants/colors";
import {StudyStats} from "@/app/constants/types";

const Sidebar = () => {

    const [statsData, setStatsData] = useState<StudyStats | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/flashcards/stats`)
            .then((res) => res.json())
            .then((data) => setStatsData(data))
            .catch((err) => console.error("Error fetching stats:", err));
    }, []);
    
    const stats = [
        { label: 'Total Cards', count: statsData?.total, color: THEME_COLORS.stats.totalCards, icon: '📚' },
        { label: 'Mastered', count: statsData?.mastered, color: THEME_COLORS.stats.mastered, icon: '🧠' },
        { label: 'In Progress', count: statsData?.inProgress, color: THEME_COLORS.stats.inProgress, icon: '📖' },
        { label: 'Not Started', count: statsData?.notStarted, color: THEME_COLORS.stats.notStarted, icon: '📥' },
    ];

    return (
        <aside
            style={{
                backgroundColor: THEME_COLORS.sidebarBg,
                borderColor: THEME_COLORS.border
            }}
            className="border-2 rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 w-full"
        >
            <h3 className="text-lg font-black tracking-tight border-b-2 border-black pb-2 text-black">
                Study Progress
            </h3>
            <div className="flex flex-col gap-3">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        style={{ borderColor: THEME_COLORS.border }}
                        className="border-2 rounded-xl overflow-hidden flex shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <div
                            style={{ backgroundColor: stat.color, borderColor: THEME_COLORS.border }}
                            className="w-12 flex items-center justify-center text-xl border-r-2"
                        >
                            {stat.icon}
                        </div>
                        <div className="flex-1 p-3 bg-white flex justify-between items-center">
                            <span className="font-bold text-sm text-gray-700">{stat.label}</span>
                            <span className="font-black text-xl text-black">{stat.count}</span>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;