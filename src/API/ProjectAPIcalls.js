import axios from "axios";
const APIaddress = "http://localhost:3002";

export const getAllProjects = async () => {
  try {
    const res = axios.get(APIaddress + "/allProjects");
    // console.log((await res).data);
    return (await res).data;
  } catch (error) {
    return error;
  }
};
