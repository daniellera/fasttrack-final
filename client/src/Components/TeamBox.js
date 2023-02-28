import React from "react";

//Needs to be implemented so the user can add teams
const TeamBox = (props) => {
  return (
    <div style={{ backgroundColor: "#0b305d", borderRadius: "8px", margin: "16px", padding: "16px", minWidth: "300px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc", paddingBottom: "8px" }}>
        <h2 style={{ margin: 0, color: "#fff" }}>{props.title}</h2>
        <span style={{ color: "#fff" }}># of projects: {props.projects}</span>
      </div>
      <ul style={{ paddingLeft: "0" }}>
        <li style={{ listStyleType: "none" }}>
          <button style={{ backgroundColor: "#1ba098", width: "48%", height: "80px", marginRight: "2%", borderRadius: "8px", color: "#fff", border: "1px solid #1ba098", cursor: "pointer" }}>{props.member}</button>
          <button style={{ backgroundColor: "#1ba098", width: "48%", height: "80px", marginLeft: "2%", borderRadius: "8px", color: "#fff", border: "1px solid #1ba098", cursor: "pointer" }}>{props.member}</button>
        </li>
        <li style={{ listStyleType: "none" }}>
          <button style={{ backgroundColor: "#1ba098", width: "48%", height: "80px", marginRight: "2%", marginTop: "8px", borderRadius: "8px", color: "#fff", border: "1px solid #1ba098", cursor: "pointer" }}>{props.member}</button>
          <button style={{ backgroundColor: "#1ba098", width: "48%", height: "80px", marginLeft: "2%", marginTop: "8px", borderRadius: "8px", color: "#fff", border: "1px solid #1ba098", cursor: "pointer" }}>{props.member}</button>
        </li>
      </ul>
    </div>
  );
};

export default TeamBox;