import api from "./api";

//----------Get Requests----------\\
export const getCompanyAnnouncements = async (companyId) => {
    const response = await api.get("/company/" + companyId + "/announcements")
}

export const getCompanyTeams = async (companyId) => {
    const response = await api.get("/company/" + companyId + "/teams")
}

export const getTeamProjects = async (companyId, teamId) => {
    const response = await api.get("/company/" + companyId + "/teams/" + teamId + "/projects")
}

export const getCompanyUsers = async (companyId) => {
    const response = await api.get("/company/" + companyId + "/users")
}

//----------Post Requests----------\\
export const login = async (username, password) => {
    const response = await api.post("/users/login", {
        username: username,
        password: password,
    });
}

export const createTeam = async (teamName, description, company, teamMembers) => {
    const response = await api.post("/team", {
        name: teamName,
        description: description,
        company: company,
        users: teamMembers
    });
}

export const createUser = async (username, password, firstName, lastName, email, phone, isAdmin) => {
    const response = await api.post("/users/create", {
        credentials:
        {
            username: username,
            password: password
        },
        profile:
        {
            firstname: firstName,
            lastname: lastName,
            email: email,
            phone: phone
        },
        isAdmin: isAdmin
    });
}

//----------Patch Requests----------\\

// export const updateProject = async () => {
//     const response = await api.patch("/projects/update-project/" + projectId, {
//         name: teamName,
//         description: description,
//         company: company,
//         users: teamMembers
//     });
// }

//----------Delete Requests----------\\