import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";


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
  ${"" /* width:100vw; */}
  height:100%;
  min-height: 100vh;
  overflow: hidden;
`;
const Header = styled.div`
  text-align: center;
  padding: 0.5rem;
  background: linear-gradient(350deg, #4e1191c9, #ff0000);
  h1 {
    margin: 0px;
    font-size: 3rem;
    color: #ff8686c2;
    letter-spacing: 1rem;
    font-family: "Shizuru", cursive;
  }
  input {
    padding: 0.5rem 4rem;
    border-radius: 50px;
    margin: 1rem;
    font-size: 1.2rem;
  }
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
          console.log(response.data);
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
      <input
        type="text"
        placeholder="Search Games..."
        onChange={(e) => {
          setSearchTeam(e.target.value);
        }}
      />
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
            <div>
              <Image src={CurrentData.thumbnail} />
            </div>
            <div>
              <h1> {CurrentData.title} </h1>
            </div>
            <div>
              <span> {CurrentData.short_description} </span>
            </div>
            <div>
              <label> Publishers: </label>
              <span> {CurrentData.publisher} </span>
            </div>
          </Box>
        );
      })}
    </Content>
  </MainContainer>
  )
}




