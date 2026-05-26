import {useEffect, useState} from 'react';
import {THEME_COLORS} from "@/app/constants/colors";
import NewCategoryModal from "@/components/NewCategoryModal";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CreateFlashcardModal = ({isOpen, onClose, onSuccess}: Props) => {
    const [categories, setCategories] = useState([]);
    const baseURL = "http://localhost:5059";
    const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
    const [formData, setFormData] = useState({
        backSide: '',
        frontSide: '',
        categoryId: 0,
        status: 'Not Started'
    });

    useEffect(() => {
        fetch(`${baseURL}/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const fetchCategories = async () => {
        const res = await fetch(`${baseURL}/categories`);
        const data = await res.json();
        setCategories(data);
    };

    const handleSave = async (): Promise<void> => {

        const payload = {
            name: "",
            categoryId: Number(formData.categoryId),
            frontSide: formData.frontSide,
            backSide: formData.backSide,
            status: formData.status
        };
        console.log(payload);
        try {
            const response = await fetch(`${baseURL}/flashcards/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            
            onSuccess();
            if (onClose) onClose();

        } catch (error) {
            console.error('Failed to save flashcard:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div
                className="bg-white rounded-3xl border-4 border-black p-8 w-full max-w-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl font-black mb-6">CREATE NEW FLASHCARD</h2>

                <div className="flex gap-6">
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="font-bold">FRONT (QUESTION):</label>
                            <textarea name="frontSide"
                                      style={{ backgroundColor: THEME_COLORS.inputBg }}
                                      className="w-full border-2 border-black rounded-lg p-3 mt-1"
                                      onChange={handleChange}/>
                        </div>
                        <div>
                            <label className="font-bold">BACK (ANSWER):</label>
                            <textarea name="backSide"
                                      style={{ backgroundColor: THEME_COLORS.inputBg }}
                                      className="w-full border-2 border-black rounded-lg p-3 mt-1"
                                      onChange={handleChange}/>
                        </div>
                    </div>

                    <div className="w-32 flex flex-col items-center">
                        <div
                            style={{ backgroundColor: THEME_COLORS.inputBg }}
                            className="w-full h-32 border-2 border-black rounded-xl flex items-center justify-center mb-2">
                            📷
                        </div>
                        <span className="text-xs text-center font-bold">Upload Front Image (Optional)</span>
                    </div>
                </div>

                {showNewCategoryModal && (
                    <NewCategoryModal
                        onClose={() => setShowNewCategoryModal(false)}
                        onSave={() => {
                            fetchCategories();
                        }}
                    />
                )}

                <div className="my-6">
                    <label className="font-bold">CATEGORY :</label>
                    <div className="flex items-center gap-2">
                    <select
                        name="categoryId"
                        className="w-full p-3 border-2 border-black rounded-lg font-bold"
                        style={{backgroundColor: THEME_COLORS.inputBg}}
                        onChange={handleChange}
                        defaultValue="0"
                    >
                        <option value="0" disabled>
                            Select a Category
                        </option>

                        {categories.map((cat: any) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        style={{backgroundColor: THEME_COLORS.inputBg}}
                        onClick={() => setShowNewCategoryModal(true)}
                        className="p-3 text-black rounded-lg font-bold border-2 border-black shrink-0"
                    >
                        +
                    </button>
                    </div>
                </div>

                <div className="flex justify-between items-center py-4">
                    <div className="flex gap-4">
                        {['Not Started', 'In Progress', 'Mastered'].map((status) => (
                            <label key={status} className="flex items-center gap-2 font-bold">
                                <input type="radio" name="status" value={status}/>
                                {status}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <button onClick={onClose}
                            className="flex-1 py-3 border-2 border-black rounded-lg font-bold">Cancel
                    </button>
                    <button
                        style={{backgroundColor: THEME_COLORS.accentYellow}}
                        className="flex-1 py-3 border-2 border-black rounded-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        onClick={handleSave}>Submit
                        Save & Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateFlashcardModal;