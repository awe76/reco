/* 
    Item sample:
    {
      "anchors": {
        "teams": "Procurement_europe, Procurement_usa"
      },
      "description": "ProcurementTeam",
      "iconUrl": "https://i.imgur.com/GptSzgL.png",
      "id": "2",
      "name": "Procurement"
    }
*/

export function ProcessItem({item}) {
    const { name, description } = item;
    return (
       <article>
            <h2>{name}</h2>
            <p>{description}</p>
       </article>
    );
}