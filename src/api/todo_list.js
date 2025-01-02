export async function crea(apiClient, task, status) {
  let jsonData;
  try {
    const response = await apiClient.post(
      process.env.REACT_APP_SERVER + "/todo/crea",
      { task, status }
    );

    if (response.statusText !== "Created") {
      throw new Error("Network response was not ok " + response.statusText);
    }
    jsonData = response.data;
  } catch (error) {
    jsonData = error;
  }
  return jsonData;
}

export async function ricerca(apiClient, filters) {
  let jsonData;
  try {
    const response = await apiClient.post(
      process.env.REACT_APP_SERVER + "/todo/ricerca",
      filters
    );
    if (response.statusText !== "OK") {
      throw new Error("Network response was not ok " + response.statusText);
    }
    jsonData = response.data;
  } catch (error) {
    jsonData = error;
  }
  return jsonData;
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
  } catch (error) {
    jsonData = error;
  }
  return jsonData;
}

export async function cancella(apiClient, id) {
  let jsonData;
  try {
    const response = await apiClient.delete(
      `${process.env.REACT_APP_SERVER}/todo/cancella?id=${id}`
    );
    if (response.status !== 200) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    jsonData = response.data;
  } catch (error) {
    jsonData = error;
  }
  return jsonData;
}