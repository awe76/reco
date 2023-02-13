import { useState, useEffect } from 'react';
import { ProcessSet } from './ProcessSet';

const baseUri = '/api/v1';

export function ProcessLibrary() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(`${baseUri}/process-metadata`, {
                headers: {
                    Authorization: 'fdfsdl',
                    accept: 'application/json'
                }
            });
            const data = await resp.json();

            setItems(data.mds);
        }
        fetchData();
    }, []);

    return (
        <ProcessSet items={items}/>
    );
}