import { axiosInstance } from "~/lib/utils";
import { Mahasiswa } from "~/schema";
class ServiceMahasiswa {
  async create(payload: Mahasiswa) {
    return axiosInstance.post("/mahasiswa", payload).then((data) => data.data);
  }
  async all() {
    return axiosInstance.get(`/mahasiswa`).then((data) => data.data);
  }
  async find(nim: string) {
    return axiosInstance.get(`/mahasiswa/${nim}`).then((data) => data.data);
  }
  async update(nim: string, payload: Mahasiswa) {
    return axiosInstance
      .put(`/mahasiswa/${nim}`, payload)
      .then((data) => data.data);
  }
  async delete(nim: string) {
    return axiosInstance.delete(`/prodi/${nim}`).then((data) => data.data);
  }
}
export default new ServiceMahasiswa();
