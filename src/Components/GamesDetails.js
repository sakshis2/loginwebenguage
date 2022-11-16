import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function GamesDetails() {
  const location = useLocation();
  const { key } = location.state;
  const [gameData, setgameData] = useState([]);
  let [cart, setCart] = useState(0)

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/game",
      params: { id: key },
      headers: {
        "X-RapidAPI-Key": "b6cf77fb79msh26a7e107983fd41p1dde5bjsnf78a945546e1",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setgameData([response.data]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  let decNum =(e) => {
    window.webengage.track("setCart", {"Name":e.title});

  }
    
  return (
    <div className="bg-purple-400 w-full p-4 min-h-screen h-full">
      {gameData.map((e) => {
        return (
          <div key={e.id}>
            <div className="flex gap-5 mb-8">
              <div>
                <img className="rounded-md" src={e.thumbnail} alt="" />
                <h6>cart value</h6>
                <p>
                  {cart}
                  
                </p>
                  <button onClick={()=> {setCart(cart + 1);}}>add cart</button>
                  <button onClick={()=>decNum(e)}>event</button>                
              </div>
              <div>
                <h1 className=" text-5xl font-serif mb-8">{e.title}</h1>
                <h5 className=" text-2xl font-serif ">
                  Release Date: {e.release_date}
                </h5>
                <h5 className=" text-2xl font-serif ">
                  Developer: {e.developer}
                </h5>
                <h5 className=" text-1xl font-serif ">{e.short_description}</h5>
              </div>
            </div>
            <p className="shadow-xl py-16">description: {e.description}</p>
            <p>genre: {e.genre}</p>
          </div>
        );
      })}
    </div>
  );
}
