import { useEffect } from "react";
import { Route, Switch } from "react-router-dom"
import styled from "styled-components";
import Addword from "./components/Addword";
import WordList from "./components/WordList";
import { db } from "./firebase"
import { collection, getDoc, getDocs, addDoc, updateDoc } from "firebase/firestore"
import { loadWord, loadWordFB } from "./redux/modules/word"
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./components/Spinner";



function App() {


  const dispatch = useDispatch();
  const is_loaded = useSelector(state => state.word.is_loaded);


  useEffect(() => {
    dispatch(loadWordFB());
  }, []);


  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Switch>

          <Route path="/" exact>
            <WordList />
          </Route>

          <Route path="/add">
            <Addword />
          </Route>

        </Switch>
      </Container>
      {!is_loaded && <Spinner />}
    </div>
  );
}

const Container = styled.div`
  max-width: 400px;
  width: 400px;
  min-height: 70vh;
  background: #e2fff8;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
`;


export default App;


// 질문 리스트
// 1. 만약 Addword.js 에서 입력한 값을 리덕스 없이 WordList.js에 띄워 주려면 어떻게?? App.js에서 state를 선언해야하나요?

// 2. WordList.js가 아닌 App.js 에서 파이어베이스를 불러왔는데 왜 정상적으로 뜨는 건가요

// const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(loadWordFB());
//   }, []);

// 3. WordList.js 에서 아이콘 위치 div 우상단에 어떻게 고정시키는지..