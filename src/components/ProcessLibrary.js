import { useState, useEffect, useMemo, useCallback } from 'react';
import { ProcessSet } from './ProcessSet';
import { AddProcessItem } from './AddProcessItem';
import { fetchProcesses, addProcessItem, isMyItem } from '../api/api';
import { Header } from './Header';

import './ProcessLibrary.css'; 

export function ProcessLibrary() {
    const [items, setItems] = useState([]);

    const onAddItem = useCallback(async (item) => {
        const items = await addProcessItem(item);
        setItems(items);
    }, [setItems]);

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
            setItems(data);
        }
        fetchData();
    }, []);

    return (
        <>
        <Header onOpen={onOpen} />
            <main>
                <ProcessSet header="My processes" items={my} />
                <ProcessSet header="Recommended" items={recommended} />
                {isOpened && (
                    <AddProcessItem addProcessItem={onAddItem} onClose={onClose} />
                )}
            </main>
        </>
    );
}