import { Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
// import { isStyledComponent } from 'styled-components'
import { userState } from '../../globalstate'
import styled from 'styled-components'

const CompanyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 85vh;
    
    & h1 {
        font-family: 'Inter', sans-serif;
        color: #1BA098;
        font-size: 4em;
        text-align: center;
    }

    & select {
        font-family: 'Fira sans', sans-serif;
        color: #5533FF;
        font-weight: bold;
        font-size: 1.5em;
        border-radius: 0.5em;
        padding: 0.3em 0.7em;
    }
`

// import Dropdown from '../../Components/Dropdown'

const CompanyScreen = () => {
    const [user, setUser] = useRecoilState(userState)

    // State
    // 
    // const [selectedCompany, setSelectedCompany]
    // const companies
    // 
    // const selectCompany = () => {
    //     if 'Pick an option', do nothing
    //     else setSelectedCompany in state    
    // }

    if (!user.isLoggedIn) {
        return <Navigate replace to="/" />
    } else if (!user.isAdmin) {
        return <Navigate replace to="/announcements" />
    }
    else {
        return (
            <CompanyWrapper className='company' id='company-wrapper'>
                <h1 className='company' id='company-header'>Select Company</h1>
                <select name='company' id='company-dropdown' className='company dropdown' onChange={'selectCompany'}>
                    <option disabled selected hidden value=''>Pick an option</option>
                    <option>Dummy option</option>
                    {/* {companies.map(companyObj => <option key={companyObj.id} value={companyObj}>{companyObj.name}</option>)} */}
                </select>
            </CompanyWrapper>
        )
    }
}

export default CompanyScreen