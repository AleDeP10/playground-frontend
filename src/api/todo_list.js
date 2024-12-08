export async function crea(task, status) {
    let jsonData;
    try {
        const response = await fetch(process.env.REACT_APP_SERVER+'/todo/crea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task, status })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        jsonData = await response.json();
        console.log('todoList.script', { task, status, jsonData });
    } catch (error) {
        console.error('Error:', error);
        jsonData = null;
    }
    return jsonData;
}

export async function ricerca(filters) {
    try {
        const response = await fetch(process.env.REACT_APP_SERVER + '/todo/ricerca', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const jsonData = await response.json();
        console.log('todoList.script', { filters, jsonData });
        return jsonData;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function aggiorna(id, task, status) {
    let jsonData; 
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/todo/aggiorna?id=${id}`, { 
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ task, status })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        jsonData = await response.json();
        console.log('todoList.script', { id, jsonData });
    } catch (error) {
        console.error('Error:', error);
        jsonData = null;
    }
    return jsonData;
}

export async function cancella(id) {
    let jsonData; 
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/todo/cancella?id=${id}`, { 
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        jsonData = await response.json();
        console.log('todoList.script', { id, jsonData });
    } catch (error) {
        console.error('Error:', error);
        jsonData = null;
    }
    return jsonData;
}