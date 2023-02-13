import { useState, useEffect } from 'react';
import { ProcessSet } from './ProcessSet';
import { AddProcessItem } from './AddProcessItem';
import { fetchProcesses, addProcessItem } from '../api/api';

export function ProcessLibrary() {
    const [items, setItems] = useState([]);
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
            <ProcessSet items={items}/>
            {isOpened && (
                <AddProcessItem addProcessItem={addProcessItem} onClose={onClose} />
            )}
        </>
    );
}