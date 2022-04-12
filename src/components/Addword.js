import { useHistory } from "react-router-dom"
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { addWordFB, createWord } from "../redux/modules/word";
import styled from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useForm } from "react-hook-form"


const Addword = () => {

  const { register, formState: { errors }, handleSubmit } = useForm();

  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {

    dispatch(addWordFB({
      word: data.word,
      mean: data.mean,
      ex: data.ex,
      createdAt: Date.now(),
      completed: false,
    }))
    history.goBack()
  }

  return (

    <div style={{
      minHeight: "70vh"
    }}>
      <Header>
        <ArrowBackIosIcon onClick={() => { history.push("/") }} style={{ cursor: "pointer" }} />
        <h3>단어 추가하기</h3>
      </Header >

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <p>단어</p><a>*</a><br></br>
          {errors.word && <span>필수입력 사항입니다</span>}
          <input type="text" placeholder="단어를 입력하세요" {...register("word",
            { required: true })}></input>
        </InputBox>

        <InputBox>
          <p>뜻</p><a>*</a><br></br>
          {errors.mean && <span>필수입력 사항입니다</span>}
          <textarea type="text" placeholder="단어 뜻을 입력하세요" {...register("mean",
            { required: true })}></textarea>
        </InputBox>

        <InputBox>
          <p>예시</p><br></br>
          <textarea type="text" placeholder="예시를 입력하세요" {...register("ex")}></textarea>
        </InputBox>

        <Button>추가하기</Button>
      </form>

    </div >
  )
}

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 10px 0;
  height: 50px;
  line-height: 50px;
  width: 200px;

& h3{
  font-size: 22px;
  display: inline;
}
`;


const InputBox = styled.div`
  background : white;
  padding : 10px;
  margin-bottom: 15px;

  & p{
    display: inline-block;
    font-size: 15px;

    margin: 0px;
    padding-bottom : 0px;
  }

  & span{
    color:#33D4AD;
    font-size: 12px;
    margin-top: 0px;
  }

  & input {
    width: 95%;
    height: 30px;
    margin-bottom: 5px;
    margin-top: 3px;
  }

  & input:focus {
    outline: none !important;
    border: 2px #33D4AD solid ;
  }

  & textarea{
    width: 95%;
    height: 55px;
    margin-bottom: 5px;
    margin-top: 3px;
    padding-top: 10px;
    resize: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }

  & textarea:focus{
    outline: none !important;
    border: 2px #33D4AD solid ;
  }

`;

const Button = styled.button`
    width: 100%;
    height: 40px;
    color: white;
    font-size: 15px;
    font-weight: bold;
    background-color: #33D4AD;
    border : none;
    margin-top: 150px;
    padding-top:5px;
    cursor: pointer;

    :hover {
    transition:all 0.2s;
    font-size:1.0rem;
  }
`;

export default Addword;