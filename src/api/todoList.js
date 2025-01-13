export async function create(apiClient, task, status) {
  let jsonData;
  try {
    const response = await apiClient.post(
      process.env.REACT_APP_SERVER_URL + "/todo/create",
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

export async function search(apiClient, filters) {
  let jsonData;
  try {
    const response = await apiClient.post(
      process.env.REACT_APP_SERVER_URL + "/todo/search",
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

export async function update(apiClient, id, task, status) {
  let jsonData;
  try {
    const response = await apiClient.put(
      `${process.env.REACT_APP_SERVER_URL}/todo/update?id=${id}`,
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

export async function remove(apiClient, id) {
  let jsonData;
  try {
    const response = await apiClient.delete(
      `${process.env.REACT_APP_SERVER_URL}/todo/remove?id=${id}`
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