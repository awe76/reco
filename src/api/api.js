const baseUri = 'http://localhost:8080/api/v1';

let maxId = 0;

export const me = 'Andrei';

export const allUsers = [
    'Donald',
    'Bill',
    'Michael',
    'Ben'
];

const headers = {
    Authorization: 'test',
    accept: 'application/json'
};

export const isMyItem = (item) => {
    return item.anchors?.users?.includes(me);
};

export async function addProcessItem(item) {
    await fetch(`${baseUri}/process-metadata`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            md: {
                ...item,
                id: String(++maxId),
            }
        })
    });

    return await fetchProcesses();
}

export async function fetchProcesses() {
    const resp = await fetch(`${baseUri}/process-metadata`, {
        headers
    });
    const data = await resp.json();

    const result = data.mds ?? [];

    // TODO: should be refined 
    maxId = result.length;
    return result;
}