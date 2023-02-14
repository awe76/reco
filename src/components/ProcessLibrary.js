import { useState, useEffect, useMemo, useCallback } from 'react';
import { ProcessItemSet } from './ProcessItemSet';
import { AddProcessItem } from './AddProcessItem';
import { fetchProcesses, addProcessItem, updateProcessItem, isMyItem } from '../api/api';
import { Header } from './Header';

import './ProcessLibrary.css'; 

export function ProcessLibrary() {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(undefined);

    const onAddItem = useCallback(async (item) => {
        const items = await addProcessItem(item);
        setItems(items);
    }, [setItems]);

    const onEditItem = useCallback(async (item) => {
        const items = await updateProcessItem(item);
        setItems(items);
    }, [setItems]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchProcesses();
            setItems(data);
        }
        fetchData();
    }, []);

    const my = useMemo(() => {
        return items.filter(isMyItem);
    }, [items]);

    const recommended = useMemo(() => {
        return items.filter(item => !isMyItem(item));
    }, [items]);
    
    const [isOpened, setOpened] = useState(false);

    const editItem = useCallback((item) => {
        setCurrentItem(item);
        setOpened(true);
    }, [setCurrentItem]);

    const onOpen = useCallback(() => editItem(undefined), [editItem]);

    const isEdit = useMemo(() => {
        return currentItem !== undefined;
    }, [currentItem]);
    
    const onClose = () => setOpened(false);

    return (
        <>
            <Header onOpen={onOpen} />
            <main>
                <ProcessItemSet header="My processes" editItem={editItem} items={my} />
                <ProcessItemSet header="Recommended" editItem={editItem} items={recommended} />
                {isOpened && (
                    <AddProcessItem addProcessItem={onAddItem} editProcessItem={onEditItem} isEdit={isEdit} onClose={onClose} item={currentItem} />
                )}
            </main>
        </>
    );
}