import { createUserObject, createAnnouncementObject, createTeamObject, createProjectObject, createUserRegistryObject } from "./objects.js";

//----------General Helpers----------\\
export const countTeamProjects = (projectsDto, teamId) => {
    let result = 0;
    for (let project of projectsDto) {
        result = project.team.id === teamId ? result + 1 : result
    }
    return result
}

export const getDateToday = () => {
    const intToMonth = {
        0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June",
        6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"
    }
    const dateNow = new Date();
    let month = (String(intToMonth[dateNow.getMonth()]))
    let day = (String(dateNow.getDay()))
    let year = (String(dateNow.getFullYear()))
    return(month + " " + day + ", " + year)
}

//----------Parsing Data From Backend----------\\
export const parseCompanyAnouncementsDto = (announcementsDto) => {

    let result = [];
    for (let announcement of announcementsDto) {
        result.push(createAnnouncementObject(announcement.id, announcement.author, announcement.date, announcement.title, announcement.message));
    }
    return result;
}

export const parseCompanyTeamsDto = (companyTeamsDto, projectsDto) => {
    let result = [];
    for (let team of companyTeamsDto) {
        let usersToAdd = [];
        let qtyProjectsToAdd = countTeamProjects(projectsDto, team.id)
        for (let user of team.users) {
            usersToAdd.push(createUserRegistryObject(user.id, user.profile.firstName, user.profile.lastName, user.profile.email, user.profile.phone, user.active, user.status))
        }
        result.push(createTeamObject(team.id, team.name, qtyProjectsToAdd, usersToAdd))
    }
    return result;
}

export const parseTeamProjectsDto = (projectsDto) => {

    let result = [];
    for (let project of projectsDto) {
        result.push(createProjectObject(project.id, project.active, project.name, project.description, project.team.id));
    }
    return result;
}

export const parseCompanyUsersDto = (companyUsersDto) => {
    let result = [];
    for (let user of companyUsersDto) {
        result.push(createUserRegistryObject(user.id, user.profile.firstname, user.profile.lastname, user.profile.email, user.profile.phone, user.active, user.status));
    }
    return result;
}

export const parseUserDto = (userDto) => {
    return createUserObject(userDto.id, true, userDto.admin, userDto.profile.firstName, userDto.profile.lastName, userDto.profile.email, userDto.profile.phone, userDto.active, userDto.status, userDto.companies)
}
