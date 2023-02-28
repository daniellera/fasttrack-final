import {createUserObject, createAnnouncementObject, createTeamObject, createProjectObject, createUserRegistryObject} from "./objects.js";

//----------General Helpers----------\\
export const countTeamProjects = (projectsDto, teamId) => {
    let result = 0;
    for(let project of projectsDto){
        result = project.team.id === teamId ? result + 1 : result
    }
    return result
}

//----------Parsing Data From Backend----------\\
export const parseCompanyAnouncementsDto = (announcementsDto) => {
    
    let result = [];
    for(let announcement of announcementsDto){
        result.push(createAnnouncementObject(announcement.id, announcement.author, announcement.date, announcement.title, announcement.message));
    }
    return result;
}

export const parseCompanyTeamsDto = (companyTeamsDto, projectsDto) => {
    let result = [];
    for(let team of companyTeamsDto){
        let usersToAdd = [];
        let qtyProjectsToAdd = countTeamProjects(projectsDto, team.id)
        for(let user of team.users){
            usersToAdd.push(user.profile.firstname + " " + user.profile.lastname)
        }
        result.push(createTeamObject(team.id, team.name, qtyProjectsToAdd, usersToAdd))
    }
    return result;
}

export const parseTeamProjectsDto = (projectsDto) => {
    
    let result = [];
    for(let project of projectsDto){
        result.push(createProjectObject(project.id, project.active, project.name, project.description, project.team.id));
    }
    return result;
}

export const parseCompanyUsersDto = (companyUsersDto) => {
    let result = [];
    for(let user of companyUsersDto){
        result.push(createUserRegistryObject(user.id, user.profile.firstname, user.profile.lastname, user.profile.email, user.profile.phone, user.status));
    }
    return result;
}

export const parseUserDto = (userDto) => {
    result.push(createUserObject(userDto.id, true, userDto.isAdmin, userDto.profile.firstname, userDto.profile.lastname, userDto.companies));
    return result;
}
