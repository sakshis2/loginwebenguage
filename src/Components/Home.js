import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Box = styled.div`
  background: linear-gradient(120deg, #ff0000, #4e1191c9);
  display: block;
  max-width: 250px;
  margin: 1rem;
  border-radius: 10px;
  overflow: hidden;
  border: 2px blue orange;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const MainContainer = styled.div`
  background: linear-gradient(90deg, #ff0000, #4e1191c9);
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
`;
const Header = styled.div`
  text-align: center;
  // padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(350deg, #4e1191c9, #ff0000);
  h1 {
    margin: 0px;
    font-size: 3rem;
    color: #ff8686c2;
    letter-spacing: 1rem;
    font-family: "Shizuru", cursive;
  }
  // input {
  //   padding: 0.5rem 4rem;
  //   border-radius: 50px;
  //   margin: 1rem;
  //   font-size: 1.2rem;
  // }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  h1 {
    color: #c47edb;
    margin: 0px;
    padding: 0px;
    font-family: sans-serif;
  }
  div {
    padding: 0.5rem;
    color: white;
  }
  div > span {
    font-family: cursive;
  }
  div:last-child {
    color: #ffff00db;
    font-size: 1.2rem;
  }
`;

export default function Home() {
  const [GamesData, setGamesData] = useState([]);
  const [searchbar, setSearchTeam] = useState("");
  // const [handleInputSearch, sethandleInputSearch] = useState("");
  let check;
  let errorCheck;
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
      headers: {
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        "x-rapidapi-key": "44e1ec4b01msh8cf23e936855ecbp1f2af5jsn1d0fcd8d6e71",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setGamesData(response.data);
      })
      .catch(function (error) {
        errorCheck = true;
        console.error(errorCheck);
        (function () {
          let div = document.createElement("div");
          div.innerHTML = "404 no data found";
          document.getElementById("data").appendChild(div);
        })();
      });
  }, []);

  return (
    <MainContainer>
      <Header>
        <h1>Info-Games</h1>
        <div className="w-fit m-10 mt-5">
          <form onSubmit={(e) => e.preventDefault()}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-10 mr-60 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required=""
                onChange={(e) => {
                  setSearchTeam(e.target.value);
                  // sethandleInputSearch(e.target.value);
                }}
              />
              {/* <button
                type="submit"
                onClick={() => setSearchTeam(handleInputSearch)}
                className="  text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button> */}
            </div>
          </form>
        </div>
        {/* <input
          type="text"
          placeholder="Search Games..."
          onChange={(e) => {
            setSearchTeam(e.target.value);
          }}
        /> */}
      </Header>
      <Content id="data">
        {check === false && <div>No games Found</div>}
        {GamesData.filter((CurrentData) => {
          check = false;
          if (searchbar == "") {
            return CurrentData;
          } else if (
            CurrentData.title.toLowerCase().includes(searchbar.toLowerCase())
          ) {
            return CurrentData;
          }
        }).map((CurrentData) => {
          check = true;
          return (
            <Box key={CurrentData.id}>
              <Link state={{ key: CurrentData.id }} to="/game-details">
                <div>
                  <Image src={CurrentData.thumbnail} />
                </div>
                <div>
                  <h1> {CurrentData.title} </h1>
                </div>
                <div>
                  <span> {CurrentData.short_description.substr(0, 64)} </span>
                </div>
                <div>
                  <label> Publishers: </label>
                  <span> {CurrentData.publisher} </span>
                </div>
              </Link>
            </Box>
          );
        })}
      </Content>
    </MainContainer>
  );
}
