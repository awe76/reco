const baseUri = 'http://localhost:8080/api/v1';

const my = 'Andrei';

const headers = {
    Authorization: 'test',
    accept: 'application/json'
};



export const isMyItem = (item) => {
    return item.anchors?.users?.includes(my);
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
                anchors: {
                    users: [my],
                },
                ...item
            }
        })
    });

    await fetchProcesses();
}

export async function fetchProcesses() {
    const resp = await fetch(`${baseUri}/process-metadata`, {
        headers
    });
    const data = await resp.json();
    return data;
}