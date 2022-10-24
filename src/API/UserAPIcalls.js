import axios from "axios";

const APIaddress = "http://localhost:3002";

export const loginHandler = async (userDetails) => {
  try {
    const res = axios.post(APIaddress + "/users/login", userDetails);
    return {
      isNew: false,
      data: await (await res).data,
    };
  } catch (error) {
    return error;
  }
};

export const registerHandler = async (user) => {
  try {
    const res = axios.post(APIaddress + "/users/register", user);
    // console.log(await res);
    return {
      isNew: (await res).data.isNew,
      status: (await res).data.status,
      token: await (await res).data.data,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const verifyToken = async (token) => {
  console.log(token);
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

export const verifyTokenWithGoogle = async (token) => {
  try {
    const res = axios.get(APIaddress + "/googleUsers/tokenLogin", {
      headers: { "x-api-key": token },
    });
    return await res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllEmails = async () => {
  try {
    const res = axios.get(APIaddress + "/users/emails");

    let users = (await res).data;
    const googleRes = axios.get(APIaddress + "/googleUsers/emails");
    const googleUsers = (await googleRes).data;
    users = [...users, ...googleUsers];

    console.log(users);
    return users;
  } catch (error) {
    return error;
  }
};

export const getOneUser = async (email) => {
  try {
    const res = await axios.get(APIaddress + "/users/one/" + email);
    return await res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editUser = async (user) => {
  try {
    const res = await axios.put(APIaddress + "/users/" + user._id, user);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const editUserByEmail = async (user) => {
  console.log(user.email);
  try {
    const res = await axios.put(APIaddress + "/users/one/" + user.email);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const signInWithGoogle = async (user) => {
  const res = await axios.post(APIaddress + "/googleUsers/login", { user });

  return res.data;
};
