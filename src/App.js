import { useEffect } from "react";
import { Route, Switch } from "react-router-dom"
import styled from "styled-components";
import Addword from "./components/Addword";
import WordList from "./components/WordList";
import { loadWordFB } from "./redux/modules/word"
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./components/Spinner";



function App() {


  const dispatch = useDispatch();
  const is_loaded = useSelector(state => state.word.is_loaded);


  useEffect(() => {
    dispatch(loadWordFB());
  });


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