import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist();

//Global States
export const userState = atom({
    key: 'userState',
    default: {
        isLoggedIn: true,
        isAdmin: true,
        firstName: "[FIRSTNAME]",
        lastName: "[LASTNAME]",
        company: "FedEx"
    },
    effects_UNSTABLE: [persistAtom]
});

export const errorState = atom({
    key: 'errorState',
    default: {
        isError: false,
        message: ''
    }
});

//Page Specific States
export const announcementsState = atom({
    key: 'announcementsState',
    default: [
        {
            author: "[AUTHOR]",
            dateCreated: "[DATE]",
            title: "[TITLE]",
            message: "[MESSAGE]"
        }
    ]
});

export const teamsState = atom({
    key: 'teamsState',
    default: [
        {
            teamName: "[TEAM 1 NAME]",
            qtyProjects: "[# OF PROJECTS]",
            members: ["[MEMBER 1]", "[MEMBER 2]", "[MEMBER 3"]
        },
        {
            teamName: "[TEAM 2 NAME]",
            qtyProjects: "[# OF PROJECTS]",
            members: ["[MEMBER 1]", "[MEMBER 2]", "[MEMBER 3"]
        },
        {
            teamName: "[TEAM 3 NAME]",
            qtyProjects: "[# OF PROJECTS]",
            members: ["[MEMBER 1]", "[MEMBER 2]", "[MEMBER 3"]
        }
    ]
});

export const companyState = atom({
    key: 'companyState',
    default: ["[FedEx]", "[Cook Systems]", "[Google]"]
});

export const projectsState = atom({
    key: 'projectsState',
    default: [
        {
            projectName: "[PROJECT 1 NAME]",
            isActive: "[TRUE]",
            projectDecription: "[PROJECT 1 DESCRIPTION]"
        },
        {
            projectName: "[PROJECT 2 NAME]",
            isActive: "[TRUE]",
            projectDecription: "[PROJECT 2 DESCRIPTION]"
        },
        {
            projectName: "[PROJECT 3 NAME]",
            isActive: "[TRUE]",
            projectDecription: "[PROJECT 3 DESCRIPTION]"
        }
    ]
});

export const userRegistryState = atom({
    key: 'userRegistryState',
    default: [
        {
            firstName: "[FIRST NAME 1]",
            lastName: "[LAST NAME 1]",
            email: "[EMAIL 1]",
            phone: "[PHONE NUMBER 1",
            status : "[STATUS 1]",
        },
        {
            firstName: "[FIRST NAME 2]",
            lastName: "[LAST NAME 2]",
            email: "[EMAIL 2]",
            phone: "[PHONE NUMBER 2",
            status : "[STATUS 2]",
        },
        {
            firstName: "[FIRST NAME 3]",
            lastName: "[LAST NAME 3]",
            email: "[EMAIL 3]",
            phone: "[PHONE NUMBER 3",
            status : "[STATUS 3]",
        }
    ]
});