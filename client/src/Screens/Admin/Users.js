import { Navigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import NavBar from "../../Components/NavBar"
import { userState, userRegistryState } from "../../globalstate"
import styled from 'styled-components'

const UserRegistryWrapper = styled.div`
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
        font-size: 40px;
        font-style: normal;
        font-weight: 400;
        margin: 0 auto;
    }

    & p {
        font-family: 'Inter';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        margin: 0 auto;
        padding-bottom: 2em;
    }
`

const RegistryTableWrapper = styled.div`
    padding: 0 3em;
`



const Users = () => {
    const [user, setUser] = useRecoilState(userState)
    const [userRegistry, setUserRegistry] = useRecoilState(userRegistryState)

    if (!user.isLoggedIn || !user.isAdmin) {
        return <Navigate replace to="/" />
    } else {
        return (
            <div><NavBar />
                <UserRegistryWrapper>
                    <h1>User Registry</h1>
                    <p>A general view of all your members in your organization</p>
                    <RegistryTableWrapper>

                    </RegistryTableWrapper>
                </UserRegistryWrapper>
            </div>
        )
    }
}

export default Users