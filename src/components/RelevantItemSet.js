import { useCallback, useState } from 'react';
import { RelevantItem  } from './RelevantItem';
import './RelevantItemSet.css';

export function RelevantItemSet({ title, items, selectItem }) {
    const [isOpened, setOpened] = useState(false);
    const toggle = useCallback(() => setOpened(!isOpened), [isOpened]);

    const onSelectItem = useCallback((item) => {
        selectItem(item);
    }, [selectItem]);

    return (
        <div className="RelevantItemSet">
            <button className="RelevantItemSet-toggle" onClick={toggle}>{title}</button>
            {isOpened && (
                <div className="RelevantItemSet-items">
                    {items.map(item => (<RelevantItem key={item} item={item} selectItem={onSelectItem} />))}
                </div>
            )}
        </div>
    );
}