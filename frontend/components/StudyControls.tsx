import {THEME_COLORS} from "@/app/constants/colors";
import {Category} from "@/app/constants/types";

interface StudyControlsProps {
    categories: Category[];
    onCategoryChange: (categoryId: number) => void;
    categoryCounts: Record<number, number>;
    hideMastered: boolean;
    onToggleHideMastered: () => void;
    onShuffle: () => void;
}
const StudyControls = ({ categories, onCategoryChange, categoryCounts, hideMastered, onToggleHideMastered, onShuffle }: StudyControlsProps) => {
    return (
        <div
            style={{
                backgroundColor: THEME_COLORS.cardWrapper,
                borderBottomColor: THEME_COLORS.border
            }}
            className="p-4 border-b-2 flex justify-between items-center gap-4 flex-wrap"
        >
            <div className="flex items-center gap-4">
                <div className="relative">
                    <select
                        style={{ borderColor: THEME_COLORS.border }}
                        className="appearance-none bg-white border-2 px-4 py-2 pr-10 rounded-xl font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none cursor-pointer"
                        onChange={(e) => onCategoryChange(Number(e.target.value))}
                        defaultValue="0"
                    >
                        <option value="0" disabled>
                            Select a Category
                        </option>
                        {categories.map((category) => {
                            const count = categoryCounts[category.id] || 0;
                            const isDisabled = count === 0;

                            return (
                                <option
                                    key={category.id}
                                    value={category.id}
                                    disabled={isDisabled}
                                    className={isDisabled ? "text-gray-400" : ""}
                                >
                                    {category.name} {isDisabled ? "(0)" : `(${count})`}
                                </option>
                            );
                        })}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none font-bold text-xs">▼</div>
                </div>

                <label className="flex items-center gap-2 font-bold text-sm cursor-pointer select-none">
                    <input type="checkbox"
                           checked={hideMastered}
                           onChange={onToggleHideMastered} 
                           className="w-4 h-4 accent-black border-2 border-black rounded cursor-pointer" />
                    <span>Hide Mastered</span>
                </label>
            </div>

            <button
                style={{ borderColor: THEME_COLORS.border }}
                onClick={onShuffle}
                className="bg-white hover:bg-gray-50 text-black font-bold py-2 px-4 border-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
                Shuffle
            </button>
        </div>
    );
}

export default StudyControls;