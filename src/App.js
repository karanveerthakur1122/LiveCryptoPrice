import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./components/Coin";
function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  const options = {
    headers: {
      accept: "application/json",
      "X-API-KEY": "o6K3O95gIWGmnd3q6hpRrNcCtgU4QtwZ/wvHTVhcnEo=",
    },
  };

  useEffect(() => {
    Axios.get("https://openapiv1.coinstats.app/coins", options)
      .then((response) => {
        console.log(response.data);
        setListOfCoins(response.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const filterCoins = listOfCoins.filter((coin)=>{
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  })

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input type="text" placeholder="Example: Bitcoin..." onChange={(event)=>{
          setSearchWord(event.target.value)
          }} />
      </div>
      <div className="cryptoDisplay">
        {filterCoins.map((coin) => (
          <Coin
            key={coin.id} 
            name={coin.name}
            icon={coin.icon}
            price={coin.price}
            symbol={coin.symbol}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
