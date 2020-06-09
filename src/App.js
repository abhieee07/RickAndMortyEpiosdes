import React, { useState, useEffect } from "react";
import "./styles.css";
import List from "./list";
import axios from "axios";
import Pagination from "./pagination";

export default function App() {
  let query = "";
  const [episodes, setEpisodes] = useState([]);

  const [currenUrl, setCurrentUrl] = useState(
    `https://rickandmortyapi.com/api/episode/`
  );
  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchedName, SetSearchedName] = useState("");
  const [invalidSearch, setInvalidSearch] = useState(false);

  const search = e => {
    if (searchedName) {
      query = `?name=${searchedName}`;
    }
    setCurrentUrl(`https://rickandmortyapi.com/api/episode/${query}`);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${currenUrl}`)
      .then(res => {
        console.log(res);
        setLoading(false);
        if (res) {
          setInvalidSearch(false);
          setPrevUrl(res.data.info.prev);
          setNextUrl(res.data.info.next);
          setEpisodes(res.data.results.map(res => res));
        }
      })
      .catch(err => {
        setInvalidSearch(true);
        setLoading(false);
      });
  }, [currenUrl]);

  if (loading) return "Loading";

  const callNext = () => {
    setCurrentUrl(nextUrl);
  };
  const callPrev = () => {
    setCurrentUrl(prevUrl);
  };

  let invalid = (
    <h3 style={{ color: "red", marginLeft: "20px" }}> No Data Found </h3>
  );
  if (!invalidSearch) {
    invalid = (
      <>
        <List episode={episodes} />
        <Pagination
          next={nextUrl ? callNext : null}
          prev={prevUrl ? callPrev : null}
        />
      </>
    );
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Rick and Morty Episodes </h1>
      <div>
        <input
          style={{
            width: "370px",
            padding: "15px",
            marginLeft: "20px",
            fontSize: "18px",
            marginBottom: "20px"
          }}
          type="text"
          className="search-bar"
          value={searchedName}
          onChange={e => SetSearchedName(e.target.value)}
          placeholder="Enter the episode name"
          onKeyPress={event => (event.key === "Enter" ? search(event.key) : "")}
        />
        <button onClick={search}>Search</button>
      </div>
      {invalid}
    </>
  );
}
