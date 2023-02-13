import { useCallback } from 'react';
import './RelevantItem.css';

export function RelevantItem({selectItem, item}) {
    const onSelectItem = useCallback(() => {
        selectItem(item);
    }, [item, selectItem]);

    return (
        <button className="RelevantItem-btn" onClick={onSelectItem}>{item}</button>
    );
}