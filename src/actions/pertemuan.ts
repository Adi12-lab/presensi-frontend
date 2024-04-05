import { axiosInstance } from "~/lib/utils";
import { NewPertemuan } from "~/schema";
class ServicePertemuan {
  async create(payload: NewPertemuan) {
    return axiosInstance
      .post("/pertemuan", payload)
      .then((data) => data.data);
  }
  async all(query: string) {
    return axiosInstance
      .get(`/pertemuan?${query}`)
      .then((data) => data.data);
  }
  async find(id: number) {
    return axiosInstance
      .get(`/pertemuan/${id}`)
      .then((data) => data.data);
  }
}
export default new ServicePertemuan();
