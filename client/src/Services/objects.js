export const createUserObject = (
  id,
  isLoggedIn,
  isAdmin,
  firstName,
  lastName,
  email,
  phone,
  active,
  status,
  companies
) => {
  return {
    id: id,
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    active: active,
    status: status,
    companies: companies,
    selectedCompany: isAdmin ? null : companies[0].id,
    selectedTeam: null,
  };
};

export const createAnnouncementObject = (
  id,
  author,
  dateCreated,
  title,
  message
) => {
  return {
    id: id,
    author: author,
    dateCreated: dateCreated,
    title: title,
    message: message,
  };
};

export const createTeamObject = (id, teamName, qtyProjects, members) => {
  return {
    id: id,
    teamName: teamName,
    qtyProjects: qtyProjects,
    members: members,
  };
};

export const createProjectObject = (
  id,
  isActive,
  projectName,
  projectDescription,
  teamId
) => {
  return {
    id: id,
    isActive: isActive,
    projectName: projectName,
    projectDescription: projectDescription,
    teamId: teamId,
  };
};

export const createUserRegistryObject = (
  id,
  firstName,
  lastName,
  email,
  phone,
  active,
  status
) => {
  return {
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    active: active,
    status: status,
  };
};
