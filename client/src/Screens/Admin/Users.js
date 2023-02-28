import { Navigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import NavBar from "../../Components/NavBar"
import { userState, userRegistryState } from "../../globalstate"
import styled from 'styled-components'

const UserRegistryWrapper = styled.div`
    & a {
        color: inherit;
    }

    & a:hover {
        text-decoration: underline;
    }

    max-width: 80%;
    margin: 0 auto;
    padding: 2em;
    font-family: 'Mulish', sans-serif;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    color: #1BA098;

    & h1 {
        font-size: 48px;
        font-style: normal;
        font-weight: 400;
        margin: 0 auto;
    }

    & p {
        font-family: 'Inter';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        margin: 0 auto;
        padding-bottom: 2em;
    }
`

const RegistryTable = styled.table`
    border-radius: 6px;
    border: 1px solid #DEB992;
    padding: 1em 3em;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: #DEB992;
    max-width: 80%;
    
    & th {
        color: #FFF;
        font-style: normal;
        font-weight: 500;
        font-size: 1.3em;
    }

    & th:first-child, td:first-child {
        text-align: left;
        padding-left: 0;
    }

    & tr {
        border: solid #DEB992;
        border-width: 1px 0 1px 0;
    }

    & td, th {
        padding: 1em;
    }
`

const Yes = styled.td`
    color: #00B11C;
    text-transform: uppercase
`

const No = styled.td`
    color: #FF0000;
    text-transform: uppercase
`


const Users = () => {
    const [user, setUser] = useRecoilState(userState)
    const [userRegistry, setUserRegistry] = useRecoilState(userRegistryState)

    const mappedUserData = userRegistry.map((element, index) => (
        <tr key={index}>
            <td>{element.firstName} {element.lastName}</td>
            <td><a href={`mailto:${element.email}`}>{element.email}</a></td>
            {element.isActive ? <Yes>YES</Yes> : <No>NO</No>}
            {element.isAdmin ? <Yes>YES</Yes> : <No>NO</No>}
            <td>{element.status.toUpperCase()}</td>
        </tr>
    ))

    if (!user.isLoggedIn || !user.isAdmin) {
        return <Navigate replace to="/" />
    } else {
        return (
            <div><NavBar />
                <UserRegistryWrapper>
                    <h1>User Registry</h1>
                    <p>A general view of all your members in your organization</p>
                    <RegistryTable>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Active</th>
                                <th>Admin</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mappedUserData}
                        </tbody>
                    </RegistryTable>
                </UserRegistryWrapper>
            </div>
        )
    }
}

export default Users