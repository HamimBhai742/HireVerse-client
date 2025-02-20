import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
//   baseURL: "https://fruite-shop-server.vercel.app",
  withCredentials: true,
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
