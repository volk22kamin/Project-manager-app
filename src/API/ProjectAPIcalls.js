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

// work on thar today
// find user, then find the project that have the same _id as the id's in the projects array of the user
export const getProjectsByUser = async (user) => {
  try {
    const res = axios.get(APIaddress + "/allProjects/" + user._id);
    console.log(await res);
  } catch (error) {
    return error;
  }
};

export const updateProjectById = async (project) => {
  const projectToSend = {
    name: project.name,
    id: project.id,
    users: project.users,
  };
  try {
    const res = axios.put(
      APIaddress + "/allProjects/addUser/" + project._id,
      projectToSend
    );
    return await res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createProject = async (name) => {
  const res = axios.post(APIaddress + "/allProjects", { name: name });
  console.log(await res);
  // add try catch and return later
};
