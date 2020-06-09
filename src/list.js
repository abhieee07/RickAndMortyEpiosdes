import React from "react";

export default function list(props) {
  return (
    <div style={{ maxWidth: "450px" }}>
      {props.episode.map(e => (
        <div className="list active" key={e.name}>
          <span>
            <b>Episodename </b> : {e.name}{" "}
          </span>
          <span>
            <b>Released Date</b> : {e.air_date}{" "}
          </span>
          <span>
            <b>Episode </b> : {e.episode}{" "}
          </span>
        </div>
      ))}
    </div>
  );
}
