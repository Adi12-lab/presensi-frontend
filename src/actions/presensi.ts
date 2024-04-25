import { axiosInstance } from "~/lib/utils";
import { JenisPresensi } from "~/schema";
// import { Prese } from "~/schema";
class ServicePresensi {
  async all(nim: string, pertemuan: number) {
    return axiosInstance
      .get(`/presensi?nim=${nim}&pertemuan=${pertemuan}`)
      .then((data) => data.data);
  }

  async update(id: number, jenis: JenisPresensi) {
    return axiosInstance
      .put(`/presensi/${id}`, { jenis })
      .then((data) => data.data);
  }
}
export default new ServicePresensi();
