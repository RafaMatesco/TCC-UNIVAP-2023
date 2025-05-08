import { FaTimes } from 'react-icons/fa';
import styled from "styled-components";

const FileInfo = styled.div`
    display: flex;
    align-items: center;
    div{
        display: flex;
        flex-direction: column;
        span{
            font-size: 12px;
            color: #999;
            margin-top: 5px;

            button{
                border: 0;
                background: transparent;
                color: #e57878;
                margin-left: 5px;
                cursor: pointer;
            }
        }
    }
`
const nomeArquivo = (arquivo: any)=>{
    if(arquivo.path){
        return arquivo.path
    }
    return arquivo
}
const FileList = (props:{file:any, limpaArquivos:any})=>(
    <FileInfo>
        <div>
            <strong><FaTimes onClick={props.limpaArquivos} /> {nomeArquivo(props.file)}</strong>
            
        </div>
    </FileInfo>
)

export default FileList