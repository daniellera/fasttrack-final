import styled from "styled-components";

import Button from "./Button";
import { useState } from "react";
import Popup from "./Popup";

const StyledHr = styled.hr`
  width: ${({ w }) => w};
  border: ${({ bd }) => bd};
`;

const StyledSpan = styled.span`
  font-family: "Mulish";
  font-style: normal;
  font-weight: 400;
  color: ${({ c }) => c};
  font-size: ${({ fs }) => fs};
  margin: ${({ mg }) => mg};
  line-height: 150%;
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

const Project = ({ project, idx }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div key={idx}>
      <StyledHr w="80%" bd="1px solid #DEB992" />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <StyledSpan fs="24px" mg="2% 0% 2% 10%" c="#FFFFFF">
          {project.projectName}
        </StyledSpan>
        {project.isActive ? (
          <StyledSpan fs="14px" mg="2% 0% 2% 10%" c="#22DD2A">
            Active
          </StyledSpan>
        ) : (
          <StyledSpan fs="14px" mg="2% 0% 2% 10%" c="#DF0F0F">
            Inactive
          </StyledSpan>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginRight: "10%",
          paddingBottom: "10%",
        }}
      >
        <p
          style={{
            margin: "2% 0% 2% 12%",
            color: "rgba(255, 255, 255, 0.75)",
          }}
        >
          {project.projectDecription}
        </p>
        <Button
          w="103px"
          h="32px"
          bg="#DEB992"
          c="rgba(0, 0, 0, 0.75)"
          style={{ ":hover": { backgroundColor: "#eedcc9" } }}
          onClick={togglePopup}
        >
          Edit
        </Button>
      </div>
      {isOpen && (
        <Popup
          content={
            <div style={{ textAlign: "center" }}>
              <h3 style={{ textAlign: "left" }}>Project Name</h3>
              <Input id="updateProjectName" />
              <h3 style={{ textAlign: "left" }}>Description</h3>
              <Input id="updateDescription" />
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
};

export default Project;
