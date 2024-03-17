import { axiosInstance } from "~/lib/utils";
import { Akun, AkunEdit } from "~/schema";
class ServiceAkun {
  async create(payload: Akun) {
    return axiosInstance.post("/akun", payload).then((data) => data.data);
  }
  async all() {
    return axiosInstance.get(`/akun`).then((data) => data.data);
  }
  async mahasiswa() {
    return axiosInstance.get("/akun/mahasiswa").then((data) => data.data);
  }
  async dosen() {
    return axiosInstance.get('/akun/dosen').then(data => data.data)
  }
  async update(username: string, payload: AkunEdit) {
    return axiosInstance
      .put(`/akun/${username}`, payload)
      .then((data) => data.data);
  }
  async delete(username: string) {
    return axiosInstance.delete(`/akun/${username}`).then((data) => data.data);
  }
}
export default new ServiceAkun();
