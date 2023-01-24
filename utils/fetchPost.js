const fetchPost = async (url, type = "GET", data) => {
  const response = await fetch(url, {
    method: type, // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: data && JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json();
}

export default fetchPost;