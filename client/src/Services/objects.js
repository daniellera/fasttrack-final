export const userObject = (isLoggedIn, isAdmin, firstName, lastName, company) => {
    return(
    {
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        firstName: firstName,
        lastName: lastName,
        company: company
    })
}

export const announcementObject = (author, dateCreated, title, message) => {
    return(
    {
        author: author,
        dateCreated: dateCreated,
        title: title,
        message: message
    })
}

export const teamObject = (teamName, qtyProjects, members) => {
    return(
    {
        teamName: teamName,
        qtyProjects: qtyProjects,
        members: members
    })
}

export const projectObject = (isActive, projectName, projectDescription) => {
    return(
    {
        isActive: isActive,
        projectName: projectName,
        projectDescription: projectDescription
    })
}

export const registryEntryObject = (firstName, lastName, email, phone, status) => {
    return(
    {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        status: status
    })
}