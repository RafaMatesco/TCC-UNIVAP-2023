import styled,{css} from "styled-components";

const dragActive = css`
    border-color: #78e5d5;
`
const DropContainer = styled.div`
    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;


    transition:height 0.2s ease;
    ${(props: any)=> props.isDragActive && dragActive }
`
    
export default DropContainer