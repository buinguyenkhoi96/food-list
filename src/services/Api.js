const Api = {
  get: async (...params) => {
    const response = await fetch(...params);
    const data = await response.json();

    return data;
  }
};

export default Api;
