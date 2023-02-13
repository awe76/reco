import { useState, useMemo, useCallback } from 'react';
import { allUsers, allDomains, allTeams, me } from '../api/api';
import './AddProcessItem.css';
import { RelevantItemSet } from './RelevantItemSet';

// const getFilter = (allItems, items) => allItems.filter(item => !items.includes(item));

function useFilter(allItems, initialState = []) {
    const [items, setItems] = useState(initialState);
    const onSelectItem = useCallback(item => {
        setItems([...items, item]);
    }, [setItems, items]);

    const availableItems = useMemo(() => {
        return allItems.filter(item => !items.includes(item));
    }, [allItems, items]);

    return [items, availableItems, onSelectItem];
}

export function AddProcessItem({ addProcessItem, onClose }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [users, availableUsers, onSelectUser] = useFilter(allUsers, [me]);
    const [domains, availableDomains, onSelectDomain] = useFilter(allDomains, []);
    const [teams, availableTeams, onSelectTeam] = useFilter(allTeams, []);

    const onChangeName = e => setName(e.target.value);
    const onChangeDescription = e => setDescription(e.target.value);

    const isValid = () => name.trim(' ');

    const onAddProcessItem = async (e) => {
        e.preventDefault();
        await addProcessItem({
            anchors: {
                users,
                domains,
                teams,
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

            <p className="RelevantItems-desc">
                Select one item from thie list below and provide us with the information we need in order to create your new process. 
            </p>

            <RelevantItemSet title="Relevant user groups" selectItem={onSelectTeam} items={availableTeams} />
            <RelevantItemSet title="Relevant domains" selectItem={onSelectDomain} items={availableDomains} />
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