import { memo } from 'react';
import { ProcessItem } from './ProcessItem';
import './ProcessItemSet.css';

export const ProcessItemSet = memo(function ProcessItemSet({items, editItem, header}) {
    return items.length > 0 && (
        <section>
            <h1>{header}</h1>

            <div>
                {items.map(
                    (item) => <ProcessItem key={item.id} editItem={editItem} item={item} />
                )}
            </div>
        </section>
    );
});
