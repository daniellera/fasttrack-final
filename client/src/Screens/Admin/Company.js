import { Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../../globalstate'
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
            <div className='company' id='company-wrapper'>
                <h1 className='company' id='company-header'>Select Company</h1>
                <select name='company' id='company-dropdown' className='company dropdown' onChange={selectCompany}>
                    <option>Pick an option</option>
                    {companies.map(companyObj => <option key={companyObj.id} value={companyObj}>{companyObj.name}</option>)}
                </select>
            </div>
        )
    }
}

export default CompanyScreen