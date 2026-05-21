"use client";

import {THEME_COLORS} from "@/app/constants/colors";
import {useView} from "@/context/ViewContext";

const Tabs = () => {
    const { activeTab, setActiveTab } = useView();
    const tabStyle = (tabName: string) => `
    font-bold px-4 py-1.5 rounded-full text-sm border-2 border-black transition-all
    ${activeTab === tabName
        ? "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        : "hover:bg-gray-100 shadow-none border-transparent"}
  `;

    return (
        <div className="flex gap-1 bg-white border-2 border-black p-1 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <button
                onClick={() => setActiveTab("Study Mode")}
                style={{ backgroundColor: activeTab === "Study Mode" ? THEME_COLORS.accentYellow : "white" }}
                className={tabStyle("Study Mode")}
            >
                Study Mode
            </button>
            <button
                onClick={() => setActiveTab("All Cards")}
                style={{ backgroundColor: activeTab === "All Cards" ? THEME_COLORS.accentYellow : "white" }}
                className={tabStyle("All Cards")}
            >
                All Cards
            </button>
        </div>
    );
}

export default Tabs;