import { useCallback, useState, memo } from 'react';
import { RelevantItem  } from './RelevantItem';
import './RelevantItemSet.css';

export const RelevantItemSet = memo(function RelevantItemSet({ title, selectedTitle, items, selectedItems, selectItem, unselectItem }) {
    const [isOpened, setOpened] = useState(false);
    const toggle = useCallback(() => setOpened(!isOpened), [isOpened]);

    return (
        <div className="RelevantItemSet">
            <button className="RelevantItemSet-toggle" onClick={toggle}>{title}</button>
            {isOpened && (
                <>
                    <div className="RelevantItemSet-items">
                        {items.map(item => (<RelevantItem key={item} item={item} selectItem={selectItem} />))}
                    </div>

                    {selectedItems.length > 0 && (
                        <div className="RelevantItemSet-unselectedItems">
                            <h3>{selectedTitle} [click to undo selection]</h3>
                            <div className="RelevantItemSet-items">
                                {selectedItems.map(item => (<RelevantItem key={item} item={item} selectItem={unselectItem} />))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
});