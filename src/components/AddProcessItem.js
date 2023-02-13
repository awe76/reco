import { useState } from 'react';
import './AddProcessItem.css';

export function AddProcessItem({ addProcessItem, onClose }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const onChangeName = e => setName(e.target.value);
    const onChangeDescription = e => setDescription(e.target.value);

    const onAddProcessItem = async (e) => {
        e.preventDefault();
        await addProcessItem({
            name,
            description
        });

        onClose();
    };

    return (
        <aside>
            <h2>Create New Process</h2>
            <form>
                <fieldset>
                    <input value={name} placeholder="Process Name (mandatory)" onChange={onChangeName} />
                    <textarea value={description} placeholder="Description" onChange={onChangeDescription}/> 
                </fieldset>

                <menu>
                    <button type="submit" onClick={onAddProcessItem}>Add</button>
                    <button onClick={onClose}>Cancel</button>
                </menu>
            </form>
        </aside>
    );
} 