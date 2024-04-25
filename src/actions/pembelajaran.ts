import { axiosInstance } from "~/lib/utils";
import { NewPembelajaran } from "~/schema";
class ServicePembelajaran {
  async create(payload: NewPembelajaran) {
    return axiosInstance
      .post("/pembelajaran", payload)
      .then((data) => data.data);
  }
  async all(kelas?: string) {
    return axiosInstance
      .get(`/pembelajaran${kelas ? `?kelas=${kelas}` : ""}`)
      .then((data) => data.data);
  }

  async find(id: number) {
    console.log(id);
    return axiosInstance.get(`/pembelajaran/${id}`).then((data) => data.data);
  }

  async update(id: number, payload: NewPembelajaran) {
    return axiosInstance
      .put(`/pembelajaran/${id}`, payload)
      .then((data) => data.data);
  }
  async delete(id: number) {
    return axiosInstance
      .delete(`/pembelajaran/${id}`)
      .then((data) => data.data);
  }
}
export default new ServicePembelajaran();
