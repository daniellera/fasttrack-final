import styled from "styled-components";
//import { announcementsState } from "../../globalstate";

const StyledAnnouncements = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  width: 730px;
  background: #0b2d45;
  border-radius: 20px;
`;

const StyledSpan = styled.span`
  font-family: "Mulish";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 150%;
  color: #ffffff;
`;

const StyledP = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #ffffff;
  margin-left: 5%;
  margin-right: 5%;
`;

const StyledUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Announcement = ({ announcement, idx }) => {
  console.log(announcement);

  return (
    <StyledAnnouncements>
      <StyledUser key={idx}>
        <StyledSpan>{announcement.user}</StyledSpan>
        <StyledSpan>{announcement.date}</StyledSpan>
      </StyledUser>
      <StyledP>{announcement.title}</StyledP>
      <StyledP>{announcement.message}</StyledP>
    </StyledAnnouncements>
  );
};

export default Announcement;
