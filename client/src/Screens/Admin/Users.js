import { useEffect, useState } from 'react'
import { Navigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import NavBar from "../../Components/NavBar"
import { userState, userRegistryState } from "../../globalstate"
import styled from 'styled-components'
import Button from '../../Components/Button'
import Popup from "../../Components/Popup"
import Dropdown from '../../Components/Dropdown'
import { useMediaQuery } from "react-responsive";
import { getCompanyUsers } from '../../Services/apiCalls'
import { parseCompanyUsersDto } from '../../Services/helpers'

const UserRegistryWrapper = styled.div`
    & a {
        color: inherit;
    }

    & a:hover {
        text-decoration: underline;
    }

    max-width: 70%;
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
        padding-bottom: 4em;
    }

    & #popup-btn {
        font-family: 'Mulish', sans-serif;
        font-size: 12px;
        font-weight: bold;
        padding: 0.5em 1em;
        border: 1px #323F4B;
        border-radius: 15px;
        align-self: flex-start;
        margin-top: 2em;
    }

    & .mobile.popup-box .box {
        width: 80%;
    }
`

const RegistryTable = styled.table`
    width: 100%;
    border-collapse: separate !important;
    border-spacing: 0;
    border-radius: 6px;
    border: 1px solid #DEB992;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: #DEB992;
    
    & th {
        color: #FFF;
        font-style: normal;
        font-weight: 500;
        font-size: 1.3em;
        padding: 27px;
    }

    & th:first-child, td:first-child {
        text-align: left;
        padding-left: 3em;
    }

    & th:last-child, td:last-child {
        padding-right: 3em;
    }

    & tr {
        border: 1px solid #DEB992;
        border-width: 1px 0 1px 0;
    }

    & tr:first-child td.mobile.user-td {
        border: 0;
    }

    & td {
        padding: 1.5em 0.5em;
        border-top: 1px solid #DEB992;
    }

    & .yes {
        color: #00B11C;
        text-transform: uppercase;
        margin: 0;
        padding: 0;
        display: inline;
    }

    & .no {
        color: #FF0000;
        text-transform: uppercase;
        margin: 0;
        padding: 0;
        display: inline;
    }

    & h4 {
        margin: 0;
        padding-top: 1em;
        color: #FFF;
        display: inline;
    }

    & .mobile td:first-child {
        padding: 0.5em;
        border: 0;
    }

    & .mobile td:last-child {
        padding: 0.5em;
        border: 0;
    }

    & td.mobile.user-td {
        padding: 0.5em;
    }

    & td.mobile.title {
        color: #FFF;
        text-align: right;
    }
`

const Yes = styled.td`
    color: #00B11C;
    text-transform: uppercase;
`

const No = styled.td`
    color: #FF0000;
    text-transform: uppercase;
`

const AddUserDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1em auto;
    width: 25em;
    max-width: 100%;
    gap: 1em;

    & input {
        font-family: 'Mulish', sans-serif;
        font-weight: 400;
        font-size: 16px;
        border: 0;
        padding: 0;
        border-bottom: 1px solid #DEB992;
        color: #DEB992;
        background: #0B2D45;
        border-radius: 0;
    }

    & * {
        width: 75%;
    }

    & div {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }

    & h3 {
        font-weight: normal;
        margin: 1.3em 0 0.2em 0;
    }

    & .dropdown {
        font-size: 16px;
        width: 45%;
    }

    & #submit-btn {
        font-family: 'Mulish', sans-serif;
        font-size: 12px;
        font-weight: bold;
        padding: 0.5em 1em;
        border: 1px #323F4B;
        border-radius: 15px;
        margin-top: 2em;
        width: 50%;
    }

    & #submit-error {
        color: #FF0000;
        padding: 0;
    }

    & .mobile div {
        flex-direction: column;
        gap: inherit;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    & .mobile-dropdown {
        // font-size: 10px;
        width: 75%;
    }

    & .mobile#name, .mobile#password {
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        width: 100%;
    }
`

const Users = () => {
    const [user, setUser] = useRecoilState(userState)
    const [userRegistry, setUserRegistry] = useRecoilState(userRegistryState)
    const [popup, setPopup] = useState({ isToggled: false })
    const [submitError, setSubmitError] = useState(false)
    const isMobile = useMediaQuery({ query: "(max-width: 800px)" })
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        isAdmin: false,
        companies: [user.selectedCompany]
    })

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        await getCompanyUsers(user.selectedCompany)
            .then((serverResponse) => {
                setUserRegistry(parseCompanyUsersDto(serverResponse.data))
                console.log("user registry state was set")
            })
            .catch((error) => console.log(error))
    }

    // const createUser = async () => {
    //     await createUser(username, password, firstName, lastName, email, phone, isAdmin)
    //         .catch((error) => console.log(error))
    // }

    const togglePopup = () => {
        setPopup(prev => ({
            ...prev,
            isToggled: !prev.isToggled
        }))

        setNewUser({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            username: '',
            password: '',
            confirmPassword: '',
            isAdmin: ''
        })

        setSubmitError(false);
    }

    const handleSubmit = () => {
        if (
            newUser.firstName &&
            newUser.lastName &&
            newUser.email &&
            newUser.phone &&
            newUser.username &&
            newUser.password &&
            newUser.password === newUser.confirmPassword &&
            newUser.isAdmin !== ''
        ) {
            setSubmitError(false)
            console.log('successful submit')
            // createUser()
            togglePopup()
            alert('User added successfully!')
        } else {
            setSubmitError(true)
        }
    }

    const booleanOptions = ['true', 'false'].map(
        (element, index) => <option key={index} value={`${element}`}>{`${element}`}</option>
    )

    const updateNewUser = event => {
        console.log(newUser)
        setNewUser(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const addUser = (
        <AddUserDiv>
            <div className={isMobile && 'mobile'} id='name'>
                <input type='text' name='firstName' placeholder='first name' onChange={updateNewUser} />
                <input type='text' name='lastName' placeholder='last name' onChange={updateNewUser} />
            </div>
            <input type='text' name='email' placeholder='email' onChange={updateNewUser} />
            <input type='text' name='phone' placeholder='phone' onChange={updateNewUser} />
            <input type='text' name='username' placeholder='username' onChange={updateNewUser} />
            <div className={isMobile && 'mobile'} id='password'>
                <input type='text' name='password' placeholder='password' onChange={updateNewUser} />
                <input type='text' name='confirmPassword' placeholder='confirm password' onChange={updateNewUser} />
            </div>
            <h3>Make user an admin role?</h3>
            <Dropdown
                name='isAdmin'
                id='isAdmin'
                className={`add-user ${isMobile && 'mobile-dropdown'}`}
                selectOption={updateNewUser} options={booleanOptions}
            />
            <Button id='submit-btn' bg='#1BA098' c='#FFFFFF' w='13em' h='3em' onClick={handleSubmit}>Submit</Button>
            {submitError && <p id='submit-error'>Something went wrong. Please check your inputs and try again.</p>}
        </AddUserDiv>
    )

    const mappedUserData = userRegistry.map((element, index) => {
        if (isMobile) {
            return (
                <tr key={index}>
                    <td className='mobile user-td'>
                        <table className='user-table'>
                            <tbody>
                                <tr>
                                    <td className='mobile title'>Name</td>
                                    <td>{element.firstName} {element.lastName}</td>
                                </tr>
                                <tr>
                                    <td className='mobile title'>Email</td>
                                    <td><a href={`mailto:${element.email}`}>{element.email}</a></td>
                                </tr>
                                <tr>
                                    <td className='mobile title'>Active</td>
                                    {element.active ? <Yes>YES</Yes> : <No>NO</No>}
                                </tr>
                                <tr>
                                    <td className='mobile title'>Admin</td>
                                    {element.isAdmin ? <Yes>YES</Yes> : <No>NO</No>}
                                </tr>
                                <tr>
                                    <td className='mobile title'>Status</td>
                                    <td>{element.status.toUpperCase()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr key={index}>
                    <td>{element.firstName} {element.lastName}</td>
                    <td><a href={`mailto:${element.email}`}>{element.email}</a></td>
                    {element.active ? <Yes>YES</Yes> : <No>NO</No>}
                    {element.isAdmin ? <Yes>YES</Yes> : <No>NO</No>}
                    <td>{element.status.toUpperCase()}</td>
                </tr>
            )
        }
    })

    if (!user.isLoggedIn || !user.isAdmin) {
        return <Navigate replace to="/" />
    } else {
        return (
            <div>
                <NavBar />
                <UserRegistryWrapper>
                    <h1>User Registry</h1>
                    <p>A general view of all your members in your organization</p>
                    {isMobile ?
                        <RegistryTable className='mobile'>
                            <tbody>
                                {mappedUserData}
                            </tbody>
                        </RegistryTable>
                        :
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
                    }
                    <Button id='popup-btn' bg='#1BA098' c='#FFFFFF' w='13em' h='3em' onClick={togglePopup}>ADD USER</Button>
                    {popup.isToggled && <Popup className={isMobile && 'mobile'} handleClose={togglePopup} content={addUser} />}
                </UserRegistryWrapper>
            </div>
        )
    }
}

export default Users