import { axiosInstance } from "~/lib/utils";
import { AkunWithPassword } from "~/schema";
class ServiceAkun {
  async create(payload: AkunWithPassword) {
    return axiosInstance.post("/akun", payload).then((data) => data.data);
  }
  async all() {
    return axiosInstance.get(`/akun`).then((data) => data.data);
  }
  async update(username: string, payload: AkunWithPassword) {
    return axiosInstance
      .put(`/akun/${username}`, payload)
      .then((data) => data.data);
  }
  async delete(username: string) {
    return axiosInstance.delete(`/akun/${username}`).then((data) => data.data);
  }
}
export default new ServiceAkun();
