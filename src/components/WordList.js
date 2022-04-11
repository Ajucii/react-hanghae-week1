import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateWordFB, deleteWordFB, reupdateWordFB } from "../redux/modules/word"
import styled from "styled-components";
import icon from "../add_icon.png";
import Progress from "./Progress";



const WordList = () => {

    const history = useHistory();
    const word_lists = useSelector((state) => state.word.list);
    const dispatch = useDispatch();


    // const isChecked = useSelector((state) => state.word.list);
    // console.log(isChecked);
    // // const [isChecked, setIsChecked] = useState(false);



    return (
        <div>
            <div>
                <h1 style={{ color: "#1FC69D" }}>MY DICTIONARY</h1>
                <Progress />
                <ListStyle>
                    {word_lists.map((list, index) => {
                        return (
                            <WordStyle
                                key={index}
                                completed={list.completed}
                            >
                                <IconStyle>
                                    <button onClick={() => {
                                        dispatch(deleteWordFB(word_lists[index].id));
                                    }}>삭제</button>
                                    <button onClick={() => {
                                        if (list.completed === false) {
                                            dispatch(updateWordFB(word_lists[index].id));
                                        } else {
                                            dispatch(reupdateWordFB(word_lists[index].id));
                                        }
                                    }}>
                                        {list.completed ? "취소" : "완료"}
                                    </button>

                                </IconStyle>

                                <p>단어</p>

                                <h3>{list.word}</h3>
                                <p>뜻</p>
                                <h3 style={{ whiteSpace: "pre-wrap" }}>{list.mean}</h3>
                                <p>예시</p>
                                <h3 className="ex">{list.ex}</h3>


                            </WordStyle>
                        )
                    })}
                </ListStyle>

            </div>

            <Button onClick={() => {
                history.push("/add");
            }}><img src={icon}></img></Button>


        </div >
    )
}

const ListStyle = styled.div`
    
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 60vh;
    padding-right: -10px;
    margin-right: -6px;
    /* width : 100%; */
    ::-webkit-scrollbar { width: 5px; } 
    ::-webkit-scrollbar-thumb { 
        background-color: #1FC69D;
        border-radius: 30px;
    }



`;

const WordStyle = styled.div`
    background-color: ${props => props.completed ? "#B9B9B9" : "white"};
    margin-bottom : 10px;
    padding-top:10px;
    padding-left: 20px;
    border-radius: 5px;
    width: 92%;
    word-break: break-all;
    
    & p{
        color: ${props => props.completed ? "#7D7D7D" : "black"}; 
        font-size: 15px;
        text-decoration: underline;
        margin: 10px 0px 0px 0px;
        padding : 0px;
    }
    & h3{
        color: ${props => props.completed ? "#7D7D7D" : "black"}; 
        margin-top:5px;
        padding-right : 10px;
    }
    & h3.ex{
        color: ${props => props.completed ? "#7D7D7D" : "#33D4AD"}; 
        font-size: 20px;
        font-weight: 300;
        font-style: italic;
        margin-bottom: 20px;
    }
`;


const IconStyle = styled.div`
    
    margin-left: 270px;
    margin-right:2px;
    margin-top: 10px;
    margin-bottom: 12px;

    & button{
        float: right;
        background: #e2fff8;
        padding-top:3px;
        font-weight: bold;
        width: 40px;
        height: 25px;
        border:none;
        border-radius: 3px;
        margin-right : 8px;
        cursor: pointer;

        &:hover{
            background-color: #1FC69D;
            transition:all 0.3s;
        }
    }
    
`;

const Button = styled.button`
    border: none;
    background: none;
    
    

    & img{
        position: absolute;
        left : 50%;
        top: 83.3%;
        
        width: 60px;
        cursor: pointer;
        transform: translate(-50%, -50%);
    

    &:hover{
            filter: drop-shadow( 0px 0px 5px #ABABAB);
            transition:all 0.3s;
            
    }
}
`;

export default WordList;