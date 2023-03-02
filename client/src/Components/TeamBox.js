import React from "react";
//Needs to be implemented so the user can add teams
const TeamBox = (props) => {
  return (
    <div
      key={props.key}
      style={{
        backgroundColor: "#0b305d",
        borderRadius: "8px",
        margin: "16px",
        padding: "16px",
        minWidth: "300px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
          paddingBottom: "8px",
        }}
      >
        <h2 style={{ margin: 0, color: "#fff" }}>{props.name}</h2>
        <span style={{ color: "#fff" }}># of projects: {props.projects}</span>
      </div>
      <div
        style={{ direction: "flex", flexDirection: "row", margin: "5% 10%" }}
      >
        {props.members.map((member, idx) => (
          <span
            key={idx}
            style={{
              backgroundColor: "#1ba098",
              width: "103px",
              height: "32px",
              margin: "7% 2%",
              borderRadius: "8px",
              color: "#fff",
              border: "1px solid #1ba098",
            }}
          >
            {member}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TeamBox;
