import { Link, Route, useSearchParams } from "react-router-dom";
import Img1 from "./assets/a.png";
import Img2 from "./assets/b.png";

const Main = () => {
  return <div>
    <h1>益智游戏</h1>
    <div style={{ 'display': 'flex', gap: '6px' }}>
      <Link to={{ pathname: "detail", search: "?id=1", }}>
        <img src={Img1} alt="" />
      </Link>
      <Link to={{ pathname: "detail", search: "?id=2", }}>
        <img src={Img2} alt="" />
      </Link>
    </div>
  </div>
}

const Detail = () => {
  let [searchParams] = useSearchParams();
  
  return <div>
    <h1>游戏详情</h1>
    <p>id:{searchParams.get('id')}</p>
  </div>
}

export const Settings = {
  menu_items: [
    {
      key: '推荐游戏',
      // icon: React.createElement(icon),
      label: '推荐游戏',
      children: [
        {
          key: 'puzzle_game',
          label: <Link to='puzzle_game'>益智游戏</Link>,
        }
      ],
    },
  ],
  route: <Route path='puzzle_game'>
    <Route index element={<Main />} />
    <Route path='detail' element={<Detail />} />
  </Route>
}


