const baseUri = 'http://localhost:8080/api/v1';

const headers = {
    Authorization: 'test',
    accept: 'application/json'
};

export async function addProcessItem(item) {
    await fetch(`${baseUri}/process-metadata`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            md: item
        })
    });
}

export async function fetchProcesses() {
    const resp = await fetch(`${baseUri}/process-metadata`, {
        headers
    });
    const data = await resp.json();
    return data;
}