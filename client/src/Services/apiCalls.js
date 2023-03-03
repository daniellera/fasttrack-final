import api from "./api";

//----------Get Requests----------\\
export const getCompanyAnnouncements = async (companyId) => {
  console.log(companyId);
  return await api.get("/company/" + companyId + "/announcements");
};

export const getCompanyTeams = async (companyId) => {
  return await api.get("/company/" + companyId + "/teams");
};

export const getTeamProjects = async (companyId, teamId) => {
  return await api.get(
    "/company/" + companyId + "/teams/" + teamId + "/projects"
  );
};

export const getCompanyUsers = async (companyId) => {
  return await api.get("/company/" + companyId + "/users");
};

export const getAllProjects = async () => {
  return await api.get("/projects");
};


//----------Post Requests----------\\
export const login = async (username, password) => {
  console.log(username)
  console.log(password)
  return await api.post("/users/login", {
    username: username,
    password: password,
  });
};

// {
//   "name": "test",
//   "description": "Test description",
//   "company": {
//       "id": "7"
//   },
//   "teammates":[
//       {
//           "id": "18"
//       },
//       {
//           "id": "19"
//       },
//       {
//           "id": "20"
//       }
//   ]
// }

export const createTeam = async (
  teamName,
  description,
  companyId,
  teamMembers
) => {
  return await api.post("/team", {
    name: teamName,
    description: description,
    company: {
      id: companyId
    },
    teammates: [
      {
        id: teamMembers
      }
    ]
  });
};

export const createUser = async (
  username,
  password,
  firstName,
  lastName,
  email,
  phone,
  isAdmin,
  companyId
) => {
  return await api.post("/users/create", {
    credentials: {
      username: username,
      password: password,
    },
    profile: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    },
    company:
    {
      id: companyId
    },
    admin: isAdmin
  });
};

export const createAnnouncement = async (announcementObject, userState) => {
  return await api.post("/announcements", {
    title: announcementObject.title,
    message: announcementObject.message,
    author: {
      id: userState.id,
      profile: {
        firstname: userState.firstName,
        lastName: userState.lastName,
        email: userState.email,
        phone: userState.phone,
      },
      isAdmin: userState.isAdmin,
      active: userState.active,
      status: userState.status,
    },
  });
};

export const createProject = async (
  projectName,
  projectDescription,
  active,
  teamId
) => {
  return await api.post("/projects/create-project", {
    name: projectName,
    description: projectDescription,
    active: active,
    teamId: teamId,
  });
};

//----------Patch Requests----------\\
export const updateProject = async (
  projectId,
  projectName,
  projectDescription,
  active,
  teamId
) => {
  return await api.patch("/projects/update-project/" + projectId, {
    name: projectName,
    description: projectDescription,
    active: active,
    teamId: teamId,
  });
};

//----------Delete Requests----------\\
