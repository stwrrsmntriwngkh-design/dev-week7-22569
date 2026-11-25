import { useState } from 'react'

function Toggle() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>
        สลับ
      </button>
      {show && <p>yo</p>}
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0); 
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}> 
        เพิ่ม 
      </button>
      <Toggle />
    </div>
  );
}

import LikeButtom from './components/Like.jsx';
function LikeButton() {
  const [likes, setLikes] = useState(0);
  return (
    <div>
      <p>จำนวนไลค์: {likes}</p>
      <Likebutton onClick={() => setLikes(likes + 1)}>ถูกใจ</Likebutton>
     <Toggle />
     <LikeButton />
    </div>
  );
}

export default LikeButton;
export default App;