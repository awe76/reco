import { useState, useEffect, useMemo } from 'react';
import { ProcessSet } from './ProcessSet';
import { AddProcessItem } from './AddProcessItem';
import { fetchProcesses, addProcessItem, isMyItem } from '../api/api';

export function ProcessLibrary() {
    const [items, setItems] = useState([]);

    const my = useMemo(() => {
        return items.filter(isMyItem);
    }, [items]);

    const recommended = useMemo(() => {
        return items.filter(item => !isMyItem(item));
    }, [items]);
    
    const [isOpened, setOpened] = useState(false);

    const onOpen = () => setOpened(true);
    const onClose = () => setOpened(false);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchProcesses();
            setItems(data.mds);
        }
        fetchData();
    }, []);

    return (
        <>
            <button onClick={onOpen}>Create</button>
            <ProcessSet header="My processes" items={my} />
            <ProcessSet header="Recommended" items={recommended} />
            {isOpened && (
                <AddProcessItem addProcessItem={addProcessItem} onClose={onClose} />
            )}
        </>
    );
}