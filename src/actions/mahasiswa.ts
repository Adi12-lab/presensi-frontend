import { axiosInstance } from "~/lib/utils";
import { Prodi } from "~/schema";
class ServiceProdi {
  async create(payload: Prodi) {
    return axiosInstance.post("/prodi", payload).then((data) => data.data);
  }
  async all() {
    return axiosInstance.get(`/prodi`).then((data) => data.data);
  }
  async update(kode: string, payload: Prodi) {
    return axiosInstance
      .put(`/prodi/${kode}`, payload)
      .then((data) => data.data);
  }
  async delete(kode: string) {
    return axiosInstance.delete(`/prodi/${kode}`).then((data) => data.data);
  }
}
export default new ServiceProdi();
