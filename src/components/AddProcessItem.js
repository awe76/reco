import { useState, useMemo, useCallback, memo } from 'react';
import { allUsers, allDomains, allTeams, me } from '../api/api';
import './AddProcessItem.css';
import { RelevantItemSet } from './RelevantItemSet';

function useFilter(allItems, initialState = []) {
    const [items, setItems] = useState(initialState);
    const selectItem = useCallback(item => {
        setItems([...items, item]);
    }, [setItems, items]);

    const unselectItem = useCallback(item => {
        setItems(items.filter(currentItem => item !== currentItem));
    }, [setItems, items]);

    const availableItems = useMemo(() => {
        return allItems.filter(item => !items.includes(item));
    }, [allItems, items]);


    return [items, availableItems, selectItem, unselectItem];
}

const newItem = {
    anchors: {
        users: [me],
        domains: [],
        teams: []
    },
    name: '',
    description: '',
};

export const AddProcessItem = memo(function AddProcessItem({ addProcessItem, editProcessItem, onClose, isEdit, item = newItem }) {
    const { anchors } = item;

    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [users, availableUsers, selectUser, unselectUser] = useFilter(allUsers, anchors.users);
    const [domains, availableDomains, selectDomain, unselectDomain] = useFilter(allDomains, anchors.domains);
    const [teams, availableTeams, selectTeam, unselectTeam] = useFilter(allTeams, anchors.teams);

    const onChangeName = e => setName(e.target.value);
    const onChangeDescription = e => setDescription(e.target.value);

    const isValid = () => name.trim(' ');

    const onAddProcessItem = async (e) => {
        e.preventDefault();

        const execute = isEdit ? editProcessItem : addProcessItem;
        await execute({
            id: item.id,
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

            <RelevantItemSet title="Relevant user groups" selectedTitle="Selected user groups" items={availableTeams} selectedItems={teams} selectItem={selectTeam} unselectItem={unselectTeam} />
            <RelevantItemSet title="Relevant domains" selectedTitle="Selected domains" items={availableDomains} selectedItems={domains} selectItem={selectDomain} unselectItem={unselectDomain} />
            <RelevantItemSet title="Relevant usernames" selectedTitle="Selected usernames" items={availableUsers} selectedItems={users} selectItem={selectUser} unselectItem={unselectUser} />

            <form>
                <fieldset>
                    <textarea value={description} placeholder="Description" onChange={onChangeDescription}/> 
                </fieldset>

                <menu>
                    <button type="submit" onClick={onAddProcessItem} disabled={!isValid()}>{isEdit ? 'Update' : 'Add'}</button>
                    <button onClick={onClose}>Cancel</button>
                </menu>
            </form>

            
        </aside>
    );
});