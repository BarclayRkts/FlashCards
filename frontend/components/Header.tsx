import {THEME_COLORS} from "@/app/constants/colors";
import Tabs from "@/components/Tabs";

const Header = () => {
    return (
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
    )
}

export default Header;