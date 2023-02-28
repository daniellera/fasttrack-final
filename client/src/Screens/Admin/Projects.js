import { Navigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import NavBar from "../../Components/NavBar";
import { userState, teamsState, projectsState } from "../../globalstate";
import styled from "styled-components";

import Button from "../../Components/Button";
import Project from "../../Components/Project";
import Popup from "../../Components/Popup";

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
    left: 40px;
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

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [teams] = useRecoilState(teamsState);
  const [projects, setProjects] = useRecoilState(projectsState);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div>
        <NavBar />
        <StyledHr w="100%" bd="2px solid #deb992" />
        <StyledProjects>
          <Link to="/">
            <span>&#62;Back</span>
          </Link>
          <h1>Projects for Team1</h1>
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
            <Project project={project} key={idx} />
          ))}
        </div>
        {isOpen && (
          <Popup
            content={
              <div style={{ textAlign: "center" }}>
                <h3 style={{ textAlign: "left" }}>Project Name</h3>
                <Input id="newProjectName" />
                <h3 style={{ textAlign: "left" }}>Description</h3>
                <Input id="newDescription" />
                <Button
                  //   onClick={handleSubmit}
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
