import {ulid} from "ulid";

export default class ImageRepository {
  uri = "https://qyn2ogqsgl.execute-api.ap-northeast-1.amazonaws.com/dev/images";

  async findAll(): Promise<string[]> {
    const response = await fetch(this.uri);
    return await response.json();

    // テストコード
    // return new Promise<string[]>(resolve => {
    //   setTimeout(() => {
    //     const srcs = Array.from({length: 10}, () => "https://placehold.jp/120x80.png");
    //     resolve(srcs);
    //   }, 3000);
    // });
  }

  async save(file: File): Promise<void> {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("key", ulid());
    const params = {
      method: "POST",
      headers: {"accept": "multipart/form-data"},
      body: formdata
    }
    await fetch(this.uri, params);
  }
}
