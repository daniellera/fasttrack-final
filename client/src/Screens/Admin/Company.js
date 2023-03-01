import { Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState, companyState } from '../../globalstate'
import styled from 'styled-components'
import Dropdown from '../../Components/Dropdown'

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

const CompanyScreen = () => {
    const [user, setUser] = useRecoilState(userState)
    const [companies] = useRecoilState(companyState)

    const companyOptions = companies.map(
        (company, index) => <option key={index} value={index}>{company.name}</option>
    )

    const selectCompany = event => {
        setUser(prev => ({
            ...prev,
            selectedCompany: companies[event.target.value]
        }))
        window.location.replace('/announcements')
    }

    if (!user.isLoggedIn) {
        return <Navigate replace to="/" />
    } else if (!user.isAdmin) {
        return <Navigate replace to="/announcements" />
    }
    else {
        return (
            <CompanyWrapper className='company' id='company-wrapper'>
                <h1 className='company' id='company-header'>Select Company</h1>
                <Dropdown
                    name='company'
                    id='company-dropdown'
                    className='company'
                    selectOption={selectCompany}
                    options={companyOptions}
                />
            </CompanyWrapper>
        )
    }
}

export default CompanyScreen