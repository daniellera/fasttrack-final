import { Navigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { useState } from "react";
import NavBar from "../../Components/NavBar"
import { userState } from "../../globalstate"
import "../../Teams.css";
import TeamBox from "../../Components/TeamBox";

const Teams = () => {
    const [user, setUser] = useRecoilState(userState);
    const [teams, setTeams] = useState([
        {
            name: "Team #1",
            projects: ["1"],
            members: ["Member 1", "Member 2", "Member 3", "Member 4"],
        },
        {
            name: "Team #2",
            projects: ["4"],
            members: ["Member 1", "Member 2", "Member 3", "Member 4"],
        },
    ]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [newTeam, setNewTeam] = useState({
        name: "",
        projects: [""],
        members: [""],
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTeam((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddTeam = () => {
        setTeams((prevState) => [...prevState, newTeam]);
        setNewTeam({
            name: "",
            projects: [],
            members: [],
        });
        setIsPopupOpen(false);
    };

    const handleCancel = () => {
        setNewTeam({
            name: "",
            projects: [],
            members: [],
        });
        setIsPopupOpen(false);
    };

    if (!user.isLoggedIn) {
        return <Navigate replace to="/" />;
    } else {
        return (
            <div style={{ backgroundColor: "#051622", minHeight: "100vh" }}>
                <NavBar />
                <div className="header">
                    <h1 className="header-title">Teams</h1>
                </div>
                <div className="team-container">
                    {teams.map((team, index) => (
                        <TeamBox key={index}
                            name={team.name}
                            projects={team.projects}
                            members={team.members} />
                    ))}
                    <div className="team-card" style={{ width: "100px" }}>
                    <button className="team-add" onClick={() => setIsPopupOpen(true)}>
  <span>+</span>
  <span>Add team</span>
</button>

                        {isPopupOpen && (
                            <div className="popup">
                                <div className="popup-content">
                                    <div className="popup-header">
                                        <h2>Create new team</h2>
                                    </div>
                                    <div className="popup-body">
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={newTeam.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="projects">Projects</label>
                                            <input
                                                type="text"
                                                id="projects"
                                                name="projects"
                                                value={newTeam.projects}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="teamMembers">Members:</label>
                                            <select
                                                id="teamMembers"
                                                name="members"
                                                multiple
                                                value={newTeam.members}
                                                onChange={(event) =>
                                                    setNewTeam({
                                                        ...newTeam,
                                                        members: Array.from(event.target.selectedOptions, option => option.value),
                                                    })
                                                }
                                            >
                                                {Array.from(new Set(teams.flatMap(team => team.members))).map(member => (
                                                    <option key={member} value={member}>
                                                        {member}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn-cancel" onClick={handleCancel}>
                                                Cancel
                                            </button>
                                            <button className="btn-submit" onClick={handleAddTeam}>
                                                Add Team
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default Teams;