import axios from "axios";

const APIaddress = "http://localhost:3002";

export const loginHandler = async (userDetails) => {
  try {
    const res = axios.post(APIaddress + "/users/login", userDetails);
    return (await res).data;
  } catch (error) {
    console.log(error);
    return await error;
  }
};

export const registerHandler = async (user) => {
  try {
    const res = axios.post(APIaddress + "/users/register", user);
    return { status: (await res).status, token: await (await res).data.data };
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async (token) => {
  try {
    const res = axios.get(APIaddress + "/users/tokenLogin", {
      headers: { "x-api-key": token },
    });
    return await res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
