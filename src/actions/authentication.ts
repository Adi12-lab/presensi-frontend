import { axiosInstance } from "~/lib/utils";
import { z } from "zod";
import { authSchema } from "~/schema";
class ServiceAuth {
  async login(payload: z.infer<typeof authSchema>) {
    return axiosInstance
      .post("/auth/login", payload, {})
      .then((data) => data.data);
  }
  async register(payload: z.infer<typeof authSchema>) {
    return axiosInstance.post("/auth/register", payload).then((data) => data.data);
  }
  async isAuth() {
    return axiosInstance.post("/auth/is-auth").then((data) => data.data);
  }
  async isNotAuth() {
    return axiosInstance.post("/auth/is-not-auth").then((data) => data.data);
  }
  async logout() {
    return axiosInstance.post("/auth/logout").then((data) => data.data);
  }
}
export default new ServiceAuth();