// export async function fetchData(url) {
//     let jsonData;
//     fetch(url, {
//         method: 'POST', // Specifica il metodo POST 
//         headers: {
//             'Content-Type': 'application/json' // Specifica il tipo di contenuto 
//         }
//     })
//     .then(response => response.json())
//         .then(data => {
//             jsonData = data;
//             console.log({ data }); // This will log the response text to the console
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     return jsonData;
// }
//
// La precedente implementazione ha il difetto di restituire sempre un jsonData vuoto in
// quanto (in contesti reali) il tempo di risposta sarà tale da fornire risultato solo dopo 
// l'esecuzione di return.

export async function fetchData(url) {
    let jsonData;
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        jsonData = await response.json();
        console.log({ jsonData }); // Questo registra i dati della risposta nella console
    } catch (error) {
        console.error('Error:', error); // Gestisce gli errori e li registra nella console
        jsonData = null;
    }
    return jsonData; // Restituisce jsonData
}

// Questa implementazione usa await per attendere la risoluzione della richiesta, e la cattura 
// di eventuali errori, prima di restituire il risultato.