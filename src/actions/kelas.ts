import { axiosInstance } from "~/lib/utils";
import { AnggotaKelas, NewKelas } from "~/schema";
class ServiceKelas {
  async create(payload: NewKelas) {
    return axiosInstance.post("/kelas", payload).then((data) => data.data);
  }
  async all() {
    return axiosInstance.get(`/kelas`).then((data) => data.data);
  }
  async allByProdi(prodi: string) {
    return axiosInstance.get(`kelas?prodi=${prodi}`).then((data) => data.data);
  }
  async update(kode: string, payload: NewKelas) {
    return axiosInstance
      .put(`/kelas/${kode}`, payload)
      .then((data) => data.data);
  }
  async findAnggota(kelasKode: string) {
    return axiosInstance
      .get(`/kelas/${kelasKode}/anggota`)
      .then((data) => data.data);
  }
  async tambahAnggota(kelasKode: string, payload: AnggotaKelas) {
    return axiosInstance
      .post(`/kelas/${kelasKode}/anggota`, payload)
      .then((data) => data.data);
  }
  async deleteAnggota(kelasKode: string, payload: AnggotaKelas) {
    return axiosInstance
      .post(`/kelas/${kelasKode}/anggota`, payload)
      .then((data) => data.data);
  }
  async delete(kode: string) {
    return axiosInstance.delete(`/kelas/${kode}`).then((data) => data.data);
  }
}
export default new ServiceKelas();
