var http = axios.create({
  baseURL: "https://sm.local/",
  headers: {
    "Content-type": "application/json"
  }
});

class UploadFilesService {
  upload(file, name, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("name", name);

    return http.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  getFiles() {
    return http.get("/api/get");
    //return null
  }
}

export default new UploadFilesService();
