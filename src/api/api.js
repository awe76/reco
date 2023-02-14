const baseUri = '/api/v1';

let maxId = 0;

export const me = 'Andrei';

export const allUsers = [
    'Donald',
    'Bill',
    'Michael',
    'Ben'
];

export const allDomains = [
    'Google',
    'Microsoft'
];

export const allTeams = [
    'Finance_legal',
    'Finance_purchases',
    'Procurement_europe',
    'Procurement_usa',
    'Rnd_dev',
    'Rnd_qa',
    'Rnd_infra'
];

const headers = {
    Authorization: 'test',
    accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true',
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

export async function updateProcessItem(item) {
    await fetch(`${baseUri}/process-metadata`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            md: item
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