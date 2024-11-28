export async function crea(task, status) {
    let jsonData;
    try {
        const response = await fetch('http://localhost:5000/todo/crea', {
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

export async function ricerca(status) {
    let jsonData;
    try {
        const response = await fetch('http://localhost:5000/todo/ricerca', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        jsonData = await response.json();
        console.log('todoList.script', { status, jsonData });
    } catch (error) {
        console.error('Error:', error); // Gestisce gli errori e li registra nella console
        jsonData = null;
    }
    return jsonData; // Restituisce jsonData
}

export async function aggiorna(id, task, status) {
    let jsonData; 
    try {
        const response = await fetch(`http://localhost:5000/todo/aggiorna?id=${id}`, { 
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
        const response = await fetch(`http://localhost:5000/todo/cancella?id=${id}`, { 
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