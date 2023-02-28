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

//----------Patch Requests----------\\

//----------Delete Requests----------\\