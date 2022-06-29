var http = axios.create({
  baseURL: `https://${ window.location.hostname }`,
  headers: {
    "Content-type": "application/json"
  }
});

class UploadFilesService {
  upload(file, name, basicAuth, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("name", name);

    return http.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        basicAuth
      },
      onUploadProgress
    });
  }

  getFiles() {
    return http.get("/api/get");
  }
}

export default new UploadFilesService();
