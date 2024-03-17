fetch("https://picsum.photos/200")
  .then((response) => response.blob()) // Convert the response to a blob
  .then((blob) => {
    const imageUrl = URL.createObjectURL(blob);
    document.getElementById("randomImage").src = imageUrl;
  })
  .catch((error) => console.error("Error fetching image:", error));
