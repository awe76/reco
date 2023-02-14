import { useCallback, memo } from 'react';
import './RelevantItem.css';

export const RelevantItem = memo(function RelevantItem({selectItem, item}) {
    const onSelectItem = useCallback(() => {
        selectItem(item);
    }, [item, selectItem]);

    return (
        <button className="RelevantItem-btn" onClick={onSelectItem}>{item}</button>
    );
});