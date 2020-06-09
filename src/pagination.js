import React from "react";
import "./styles.css";

export default function pagination(props) {
  return (
    <div style={{ textAlign: "center", display: "block" }}>
      {props.prev && <button onClick={props.prev}> Prev </button>}
      {props.next && <button onClick={props.next}> next </button>}
    </div>
  );
}
