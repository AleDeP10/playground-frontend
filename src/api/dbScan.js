
export async function dbScan(query, alias) {
    let url = 'http://localhost:5000/dbScan';
    if (query || alias) {
        url += '?';
        if (query) {
            url += 'query=' + query;
        }
        if (alias) {
            if (query) {
                url += '&';
            }
            url += 'alias=' + alias;
        }
    }
    let jsonData;
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }, 
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        jsonData = await response.json();
        console.log('dbScan.script', { url, jsonData }); 
    } catch (error) {
        console.error('Error:', error);
        jsonData = null;
    }
    return jsonData;
}
