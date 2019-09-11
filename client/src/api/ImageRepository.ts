export default class ImageRepository {
  uri = "https://qyn2ogqsgl.execute-api.ap-northeast-1.amazonaws.com/dev/images";

  async findAll(): Promise<string[]> {
    const response = await fetch(this.uri);
    return await response.json();
  }

  async save(file: File): Promise<void> {
    const srcKey = decodeURIComponent(file.name.replace(/\+/g, " "));
    const urlParams = new URLSearchParams();
    urlParams.append("srcKey", srcKey);
    const response = await fetch(`${this.uri}/upload_url?${urlParams.toString()}`);
    const {fields, url} = await response.json();

    const formdata = new FormData();
    Object.entries(fields)
      .forEach(([key, value]) => formdata.append(key, (value as any)));
    formdata.append("file", file);
    const params = {
      method: "POST",
      headers: {"accept": "multipart/form-data"},
      body: formdata,
    };
    await fetch(url, params);
  }
}
