export async function hello(name) {
    let url = `${process.env.REACT_APP_SERVER}/hello${name ? '?name=' + name : ''}`
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
    } catch (error) {
        console.error('Error:', error);
        jsonData = null;
    }
    return jsonData;
}
