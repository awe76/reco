import { ProcessItem } from "./ProcessItem";

export function ProcessSet({items, header}) {
    return (
       <section>
        <h1>{header}</h1>

        <div>
            {items.map(
                (item) => <ProcessItem key={item.id} item={item} />
            )}
        </div>
       </section>
    );
}
