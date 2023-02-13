import { useState, useMemo } from 'react';
import { allUsers, me } from '../api/api';
import './AddProcessItem.css';
import { RelevantItemSet } from './RelevantItemSet';

export function AddProcessItem({ addProcessItem, onClose }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState([me]);

    const availableUsers = useMemo(() => {
        return allUsers.filter(user => !users.includes(user));
    }, [users]);

    const onChangeName = e => setName(e.target.value);
    const onChangeDescription = e => setDescription(e.target.value);
    const onSelectUser = user => {
        setUsers([...users, user]);
    };

    const isValid = () => name.trim(' ');

    const onAddProcessItem = async (e) => {
        e.preventDefault();
        await addProcessItem({
            anchors: {
                users,
            },
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
                </fieldset>
            </form>

            <RelevantItemSet title="Relevant usernames" selectItem={onSelectUser} items={availableUsers} />

            <form>
                <fieldset>
                    <textarea value={description} placeholder="Description" onChange={onChangeDescription}/> 
                </fieldset>

                <menu>
                    <button type="submit" onClick={onAddProcessItem} disabled={!isValid()}>Add</button>
                    <button onClick={onClose}>Cancel</button>
                </menu>
            </form>

            
        </aside>
    );
} 