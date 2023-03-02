import { Navigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import NavBar from "../../Components/NavBar";
import { userState, projectsState } from "../../globalstate";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import Button from "../../Components/Button";
import ProjectItem from "../../Components/ProjectItem";
import Popup from "../../Components/Popup";
import { createProject, getTeamProjects } from "../../Services/apiCalls";
import { parseTeamProjectsDto } from "../../Services/helpers";

const StyledProjects = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background: #051622;
  position: relative;
  & span {
    position: absolute;
    width: 80px;
    height: 36px;
    left: 10px;
    top: 52px;

    font-family: "Mulish";
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 150%;
    text-align: center;
    color: #1ba098;
  }
  & h1 {
    font-family: "Mulish";
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 150%;
    text-align: center;
    color: #1ba098;
  }
`;

const StyledHr = styled.hr`
  width: ${({ w }) => w};
  border: ${({ bd }) => bd};
`;

const Input = styled.input`
  width: 80%;
  border: none;
  border-bottom: 2px solid #333;
  color: #ebebd3;
  background: transparent;
  text-align: center;
  font-size: 1.5em;
  margin: 10px;
  &::placeholder {
    color: #ebebd3;
  }
  &:focus {
    outline: none;
  }
`;

const StyledH3 = styled.h3`
  font-family: "Mulish";
  font-style: normal;
  font-weight: 400;
  font-size: 16.2439px;
  line-height: 150%;
  text-align: left;
`;

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useRecoilState(userState);
  const [projects, setProjects] = useRecoilState(projectsState);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const getProjects = async () =>{
    console.log("This is the user selected team:")
    console.log(user.selectedTeam)
    await getTeamProjects(user.selectedCompany, user.selectedTeam)
    // await getTeamProjects(user.selectedCompany, 17) //work around until selected team is working
    .then((serverResponse) => {
      console.log("this is the server response:")
      console.log(serverResponse.data)
      console.log(parseTeamProjectsDto(serverResponse.data))
      setProjects(parseTeamProjectsDto(serverResponse.data))
    })
    .catch((error) => console.log(error))
  }

  const handleCreateProject = async () => {
    console.log("I am creating a project");
    let newProjectName = document.getElementById("newProjectName").value;
    let newProjectDescription = document.getElementById("newDescription").value;
    await(createProject(newProjectName, newProjectDescription, true, user.selectedTeam))
    // await(createProject(newProjectName, newProjectDescription, true, 17))//work around until selected team is working
    .then(() => getProjects())
    .catch((error) => console.log(error))
    togglePopup();
  }

  useEffect(() => {
    getProjects()
    console.log("My user state is this:")
    console.log(user)
  },[])

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else if (!user.isAdmin) {
    return <Navigate replace to="/project" />;
  } 
  // else if (!user.selectedTeam) {
  //   return <Navigate replace to="/teams" />;
  // } 
  else {
    return (
      <div>
        <NavBar />
        <StyledHr w="100%" bd="2px solid #deb992" />
        <StyledProjects>
          <Link to="/teams">
            {!isMobile ? (
              <span>&#62;Back</span>
            ) : (
              <span style={{ fontSize: "15px" }}>&#62;Back</span>
            )}
          </Link>
          {!isMobile ? (
            <h1>Projects for Team {user.selectedTeam}</h1>
          ) : (
            <h1 style={{ fontSize: "25px" }}>
              Projects for {user.selectedTeam}
            </h1>
          )}
        </StyledProjects>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginRight: "10%",
            paddingBottom: "10%",
          }}
        >
          <Button
            w="110.19px"
            h="30.48px"
            bg="#1BA098"
            c="#FFFFFF"
            mg="10% 0% 0% 10%"
            style={{ ":hover": { backgroundColor: "#eedcc9" } }}
            onClick={togglePopup}
          >
            New
          </Button>
        </div>
        <div>
          {projects.map((project, idx) => (
            <ProjectItem project={project} key={idx} />
          ))}
        </div>
        {isOpen && (
          <Popup
            content={
              <div style={{ textAlign: "center" }}>
                <StyledH3>Project Name</StyledH3>
                <Input id="newProjectName" />
                <StyledH3>Description</StyledH3>
                <Input id="newDescription" />
                <Button
                    onClick={handleCreateProject}
                  w="199px"
                  h="45px"
                  bg="#1BA098"
                  c="#FFFFFF"
                  mg="3%"
                >
                  Submit
                </Button>
              </div>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    );
  }
};

export default Projects;
