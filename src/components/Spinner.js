import styled from "styled-components"
import AbcIcon from '@mui/icons-material/Abc';
const Spinner = (props) => {
    return (
        <Outter>
            <AbcIcon style={{
                color: "white",
                fontSize: "360px"
            }} />
        </Outter>
    )

}

const Outter = styled.div`
    background: #1FC69D;
    width : 430px;
    height: 80vh;
    border-radius: 10px;
    position: fixed;
    display : flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition:all 1s;

`;



export default Spinner;