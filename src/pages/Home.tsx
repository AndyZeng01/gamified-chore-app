import React, { useState, useEffect } from 'react';
import { usePoints } from '../PointsContext';

type Chore = {
    id: number;
    title: string;
    completed: boolean;
};

function Home() {
    const [chores, setChores] = useState<Chore[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [editingChoreId, setEditingChoreId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState('');
    
    const { incrementPoints, incrementCounter } = usePoints(); 

    useEffect(() => {
        const loadedChores = loadChores();
        setChores(loadedChores);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (inputValue.trim() === '') return;

        const newChore: Chore = {
            id: Date.now(),
            title: inputValue,
            completed: false,
        };

        setChores((prevChores) => {
            const updatedChores = [...prevChores, newChore];
            saveChores(updatedChores);
            return updatedChores;
        });

        setInputValue('');
    };

    const toggleCompleted = (id: number) => {
        setChores((prevChores) => {
            const updatedChores = prevChores.map((chore) =>
                chore.id === id ? { ...chore, completed: !chore.completed } : chore
            );
            saveChores(updatedChores);
            if (updatedChores.find(chore => chore.id === id)?.completed) {
                incrementPoints(); 
                incrementCounter();
              }
            return updatedChores;
        });
    };

    const deleteChore = (id: number) => {
        setChores((prevChores) => {
            const updatedChores = prevChores.filter((chore) => chore.id !== id);
            saveChores(updatedChores);
            return updatedChores;
        });
    };

    const startEditing = (chore: Chore) => {
        setEditingChoreId(chore.id);
        setEditedTitle(chore.title);
    };

    const saveEdit = (id: number) => {
        if (editedTitle.trim() === '') return;

        setChores((prevChores) => {
            const updatedChores = prevChores.map((chore) =>
                chore.id === id ? { ...chore, title: editedTitle } : chore
            );
            saveChores(updatedChores);
            return updatedChores;
        });

        setEditingChoreId(null);
        setEditedTitle('');
    };

    function saveChores(chores: Chore[]) {
        localStorage.setItem("CHORES", JSON.stringify(chores));
    }

    function loadChores(): Chore[] {
        const choreJSON = localStorage.getItem("CHORES");
        if (choreJSON == null) return [];
        return JSON.parse(choreJSON);
    }

    return (
        <div>
            <form className="input-container" onSubmit={handleSubmit}>
                <textarea
                    className="input-textbox"
                    placeholder="sidequest"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="add-button">
                    ADD
                </button>
            </form>

            <div className="chore-points"> Earn 20 points per chore completed </div>
            
            <div>
                <ul>
                    {chores.map((chore) => (
                        <li key={chore.id} className={`chore-item ${chore.completed ? 'completed' : ''}`}>
                            <div className="chore-container">
                                {editingChoreId === chore.id ? (
                                    <div className="edit-container">
                                        <button
                                            className="cancel-button"
                                            onClick={() => deleteChore(chore.id)}
                                            >
                                            Cancel
                                        </button>
                                        <input
                                            className="input-textbox"
                                            type="text"
                                            value={editedTitle}
                                            onChange={(e) => setEditedTitle(e.target.value)}
                                            onBlur={() => saveEdit(chore.id)}
                                            autoFocus
                                        />
                                        <button
                                            className="save-button"
                                            onClick={() => saveEdit(chore.id)}
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            className="delete-button"
                                            onClick={() => deleteChore(chore.id)}
                                            >
                                            Delete
                                        </button>
                                        <span className="chore-title">{chore.title}</span>
                                        <button
                                            className={`edit-button ${chore.completed ? 'disabled' : ''}`}
                                            onClick={() => startEditing(chore)}
                                        >
                                            Edit
                                        </button>
                                    
                                        <button
                                            className={`complete-button ${chore.completed ? 'disabled' : ''}`}  
                                            onClick={() => toggleCompleted(chore.id)}
                                        >
                                            {chore.completed ? 'Completed' : 'Complete'}
                                        </button>
                                    </>
                                )}
                                
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;
