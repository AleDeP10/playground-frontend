export async function crea(apiClient, task, status) {
  let jsonData;
  try {
    const response = await apiClient.post(
      process.env.REACT_APP_SERVER + "/todo/crea",
      { task, status }
    );

    if (response.statusText !== "OK") {
      throw new Error("Network response was not ok " + response.statusText);
    }
    jsonData = response.data;
    console.log("todoList.script", { task, status, jsonData });
  } catch (error) {
    console.error("Error:", error);
    jsonData = null;
  }
  return jsonData;
}

export async function ricerca(apiClient, filters) {
  try {
    const response = await apiClient.post(
      process.env.REACT_APP_SERVER + "/todo/ricerca",
      filters
    );
    if (response.statusText !== "OK") {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const jsonData = response.data;
    console.log("todoList.script", { filters, jsonData });
    return jsonData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function aggiorna(apiClient, id, task, status) {
  let jsonData;
  try {
    const response = await apiClient.put(
      `${process.env.REACT_APP_SERVER}/todo/aggiorna?id=${id}`,
      { task, status }
    );
    if (response.statusText !== "OK") {
      throw new Error("Network response was not ok " + response.statusText);
    }
    jsonData = response.data;
    console.log("todoList.script", { id, jsonData });
  } catch (error) {
    console.error("Error:", error);
    jsonData = null;
  }
  return jsonData;
}

export async function cancella(apiClient, id) {
  let jsonData;
  try {
    const response = apiClient.delete(
      `${process.env.REACT_APP_SERVER}/todo/cancella?id=${id}`
    );
    if (response.statusText !== "OK") {
      throw new Error("Network response was not ok " + response.statusText);
    }
    jsonData = response.data;
    console.log("todoList.script", { id, jsonData });
  } catch (error) {
    console.error("Error:", error);
    jsonData = null;
  }
  return jsonData;
}
