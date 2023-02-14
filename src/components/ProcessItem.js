import { useCallback, memo } from 'react';
import './ProcessItem.css';

export const ProcessItem = memo(function ProcessItem({item, editItem}) {
    const { name, description } = item;

    const onEditItem = useCallback(() => {
        editItem(item);
    }, [editItem, item]);

    return (
       <article>
            <button onClick={onEditItem}>Edit</button>
            <h2>{name}</h2>
            <p>{description}</p>
       </article>
    );
});