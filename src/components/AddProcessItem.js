import { useState } from 'react';

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
        <form>
            <label>
                Name:
                <input value={name} onChange={onChangeName} />
            </label>
            <label>
                Description:
                <input value={description} onChange={onChangeDescription}/> 
            </label>

            <button type="submit" onClick={onAddProcessItem}>Add</button>
            <button onClick={onClose}>Cancel</button>
        </form>
    );
} 