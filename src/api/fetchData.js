export async function fetchData(url) {
    let jsonData;
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      jsonData = await response.json();
      console.log({ jsonData });
    } catch (error) {
      console.error("Error:", error);
      jsonData = null;
    }
    return jsonData;
  }
  