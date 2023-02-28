import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import NavBar from "../../Components/NavBar";
import { userState, announcementsState } from "../../globalstate";
import Button from "../../Components/Button";
import Announcement from "../../Components/Announcement";
import AnnouncementPopup from "../../Components/AnnouncementPopup";

const StyledAnnouncements = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #051622;
  & h1 {
    font-family: "Mulish";
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 150%;
    text-align: center;
    color: #1ba098;
  }
  & hr {
    width: 80;
    border: 1px solid #deb992;
  }
`;

const StyledHr = styled.hr`
  width: ${({ w }) => w};
  border: ${({ bd }) => bd};
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${({ mg }) => mg};
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

const Announcements = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useRecoilState(userState);
  const [announcements, setAnnouncements] = useRecoilState(announcementsState);
  const announcements2 = [
    {
      user: "Chris, CEO",
      date: "November 17, 2022",
      title: "Hello",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      user: "Chris, CEO",
      date: "January 17, 2023",
      title: "Hello2",
      message: "something less important",
    },
  ];

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <StyledAnnouncements>
        <NavBar />
        <StyledHr w="100%" bd="2px solid #deb992" />
        <div>
          {!isMobile ? (
            <h1>Announcements</h1>
          ) : (
            <StyledButtonDiv>
              <h1 style={{ fontSize: "32px" }}>Announcements</h1>

              <Button
                w="110.19px"
                h="30.48px"
                bg="#1BA098"
                c="#FFFFFF"
                mg="10% 0% 0% 10%"
                onClick={togglePopup}
              >
                New
              </Button>
            </StyledButtonDiv>
          )}
        </div>
        {!isMobile ? (
          <StyledButtonDiv mg="0% 0% 5% 60%">
            <Button
              w="103px"
              h="32px"
              bg="#1BA098"
              c="#FFFFFF"
              onClick={togglePopup}
            >
              New
            </Button>
          </StyledButtonDiv>
        ) : (
          ""
        )}
        <StyledHr w="80%" bd="1px solid #deb992" />
        <div>
          {announcements2.map((announcement, idx) => (
            <Announcement
              announcement={announcement}
              key={idx}
              isMobile={isMobile}
            />
          ))}
        </div>
        {isOpen && (
          <AnnouncementPopup
            content={
              <div style={{ textAlign: "center" }}>
                <h3 style={{ textAlign: "left" }}>Title</h3>
                <Input
                  {...announcements}
                  onChange={(event) => {
                    setAnnouncements([
                      ...announcements,
                      {
                        title: event.target.value,
                      },
                    ]);
                  }}
                />
                <h3 style={{ textAlign: "left" }}>Message</h3>
                <Input
                  onChange={(event) => {
                    setAnnouncements([
                      ...announcements,
                      {
                        message: event.target.value,
                      },
                    ]);
                  }}
                />

                <Button w="199px" h="45px" bg="#1BA098" c="#FFFFFF" mg="3%">
                  Submit
                </Button>
              </div>
            }
            handleClose={togglePopup}
          />
        )}
      </StyledAnnouncements>
    );
  }
};

export default Announcements;
