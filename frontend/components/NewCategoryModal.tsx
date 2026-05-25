import {useState} from "react";

const NewCategoryModal = ({ onClose, onSave }: any) => {
    const baseURL = "http://localhost:5059";
    const [name, setName] = useState("");

    const handleCreate = async () => {
        const response = await fetch(`${baseURL}/categories/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            onSave();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg border-2 border-black w-96">
                <h2 className="font-bold text-lg mb-4">Create New Category</h2>
                <input
                    className="w-full p-2 border-2 border-black rounded-lg mb-4"
                    placeholder="Category Name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="flex gap-2">
                    <button onClick={onClose} className="w-full p-2 border-2 border-black rounded-lg">Cancel</button>
                    <button onClick={handleCreate} className="w-full p-2 bg-black text-white rounded-lg">Save</button>
                </div>
            </div>
        </div>
    );
}

export default NewCategoryModal;