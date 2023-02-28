import { Navigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import NavBar from "../../Components/NavBar"
import { userState } from "../../globalstate"
import "../../Teams.css";
import TeamBox from "../../Components/TeamBox";

const Teams = () => {
    const [user, setUser] = useRecoilState(userState)

    if (!user.isLoggedIn) {
        return <Navigate replace to="/" />
    } else {
        return (
            <div style={{ backgroundColor: "#051622", minHeight: "100vh" }}>
                <NavBar />
                <div className="header">
                    <h1 className="header-title">Teams</h1>
                </div>
                <div className="team-container">
                    <div className="team-card">
                        <div className="team-name">
                            <h2>Team #1</h2>
                            <span># of projects: 4</span>
                        </div>
                        <ul className="team-members">
                            <li>
                                <button className="team-member">Member 1</button>
                                <button className="team-member">Member 2</button>
                            </li>
                            <li>
                                <button className="team-member">Member 3</button>
                                <button className="team-member">Member 4</button>
                            </li>
                        </ul>
                    </div>
                    <div className="team-card">
                        <div className="team-name">
                            <h2>Team #2</h2>
                            <span># of projects: 2</span>
                        </div>
                        <ul className="team-members">
                            <li>
                                <button className="team-member">Member 1</button>
                                <button className="team-member">Member 2</button>
                            </li>
                            <li>
                                <button className="team-member">Member 3</button>
                                <button className="team-member">Member 4</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Teams