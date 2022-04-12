import styled from "styled-components"
import { useSelector } from "react-redux"

// 단어 프로그레스바 컴포넌트
const Progress = () => {

    const word_list = useSelector((state) => state.word.list);

    // 완료된 단어에 대해서도 카운트 적용
    let count = 0;
    word_list.map((b, index) => {
        if (b.completed) {
            count++;
        }
    })


    return (
        <ProgressBar>
            <HighLight width={(count / word_list.length) * 100 + "%"} />
        </ProgressBar>

    )
}

const ProgressBar = styled.div`
    background: white;
    width: 99%;
    height: 10px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 15px;

`;

const HighLight = styled.div`
    background: #1FC69D;
    transition: 0.5s;
    width: ${(props) => props.width};
    height: 10px;
    border-radius: 5px;
`;


export default Progress;