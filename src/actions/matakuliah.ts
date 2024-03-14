import { axiosInstance } from "~/lib/utils";
import { Matakuliah } from "~/schema";
class ServiceMatakuliah {
  async create(payload: Matakuliah) {
    return axiosInstance.post("/matakuliah", payload).then((data) => data.data);
  }
  async all() {
    return axiosInstance.get(`/matakuliah`).then((data) => data.data);
  }
  async update(kode: string, payload: Matakuliah) {
    return axiosInstance
      .put(`/matakuliah/${kode}`, payload)
      .then((data) => data.data);
  }
  async delete(kode: string) {
    return axiosInstance.delete(`/matakuliah/${kode}`).then((data) => data.data);
  }
}
export default new ServiceMatakuliah();
