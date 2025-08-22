import { Link, Route, Routes } from "react-router-dom";
import Img1 from "./assets/a.png";
import Img2 from "./assets/b.png";

export const Settings = {
  app_name: "益智游戏"
}

export const Main = () => {
  return <div>
    <h1>益智游戏</h1>
    <div style={{
      'display': 'flex',
      gap: '6px'
    }}>
      <Link to={{
        pathname: "./page",
        search: "?data=game 1",
      }}>
        <img src={Img1} alt="" />
      </Link>
      <Link to={{
        pathname: "./page",
        search: "?data=game 2",
      }}>
        <img src={Img2} alt="" />
      </Link>
    </div>
  </div>
}
