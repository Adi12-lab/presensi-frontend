import { axiosInstance } from "~/lib/utils";
import { Dosen } from "~/schema";
class ServiceDosen {
  async create(payload: Dosen) {
    return axiosInstance.post("/dosen", payload).then((data) => data.data);
  }
  async all() {
    return axiosInstance.get(`/dosen`).then((data) => data.data);
  }
  async find(nidn: string) {
    return axiosInstance.get(`/dosen/${nidn}`).then((data) => data.data);
  }
  async update(nidn: string, payload: Dosen) {
    return axiosInstance
      .put(`/dosen/${nidn}`, payload)
      .then((data) => data.data);
  }
  async delete(nidn: string) {
    return axiosInstance.delete(`/dosen/${nidn}`).then((data) => data.data);
  }
}
export default new ServiceDosen();
