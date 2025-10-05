import axios from "axios";

export const axiosPublic = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://solo-shperes-server.vercel.app",
  withCredentials: true,
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
