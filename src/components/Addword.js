import { useHistory } from "react-router-dom"
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { addWordFB, createWord } from "../redux/modules/word";
import styled from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Addword = () => {

    const history = useHistory();

    const word_ref = useRef(null);
    const mean_ref = useRef(null);
    const ex_ref = useRef(null);

    const [word_is_empty, setWord_is_empty] = useState(false);
    const [mean_is_empty, setMean_is_empty] = useState(false);
    const [ex_is_empty, setEx_is_empty] = useState(false);

    const dispatch = useDispatch();


    const addWordList = () => {
        dispatch(addWordFB({
            word: word_ref.current.value,
            mean: mean_ref.current.value,
            ex: ex_ref.current.value,
            createdAt: Date.now(),
            completed: false,

        }))
    }


    return (

        <div style={{
            minHeight: "70vh"
        }}>
            <Header>
                <ArrowBackIosIcon onClick={() => { history.push("/") }} style={{ cursor: "pointer" }} />
                <h3>단어 추가하기</h3>
            </Header >

            <InputBox>
                <p>단어</p><a>*</a><br></br>
                {word_is_empty && <span>필수입력 사항입니다</span>}
                <input type="text" ref={word_ref} placeholder="단어를 입력하세요"></input>
            </InputBox>

            <InputBox>
                <p>뜻</p><a>*</a><br></br>
                {mean_is_empty && <span>필수입력 사항입니다</span>}
                <textarea type="text" ref={mean_ref} placeholder="단어 뜻을 입력하세요"></textarea>
            </InputBox>

            <InputBox>
                <p>예시</p><a>*</a><br></br>
                {ex_is_empty && <span>필수입력 사항입니다</span>}
                <textarea type="text" ref={ex_ref} placeholder="예시를 입력하세요"></textarea>
            </InputBox>

            <Button onClick={() => {

                if (word_ref.current.value === "") {
                    word_ref.current.focus();
                    setWord_is_empty(true);

                    return;

                } else if (mean_ref.current.value === "") {
                    mean_ref.current.focus();
                    setWord_is_empty(false);
                    setMean_is_empty(true);
                    return;

                } else if (ex_ref.current.value === "") {
                    ex_ref.current.focus();
                    setMean_is_empty(false);
                    setEx_is_empty(true);
                    return;
                }

                addWordList();
                history.goBack()
            }
            }>추가하기</Button>

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
        text-decoration: underline;
        margin: 0px;
        padding-bottom : 5px;
    }

    & span{
        color:#33D4AD;
        font-size: 12px;
        margin-top: 10px;
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



// 미해결 문제
// 1. is_empty 초기값을 [false, false, false] 로 만들고 버튼을 클릭했을 때 각 단어, 뜻, 예시 값이 비어있으면
//    비어있는 값의 index 따라 해당 배열 내 값을 true로 바꿔주고 true인 곳에만 "필수 입력 사항입니다" 띄워 주기