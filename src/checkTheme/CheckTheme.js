
import { useState } from 'react';
import './checkTheme.css';

const CheckTheme = ({getTheme}) =>{
    let [blackTheme, setBlackTheme] = useState(false)

    let classe = ''
    if(blackTheme){
        classe = ' black__theme'
    }


    return(
        <button className={"check__theme"+classe} onClick={()=> {setBlackTheme(!blackTheme); getTheme(blackTheme)}}>
            <span className="off">off</span>
            <span className="circle"></span>
            <span className="on">on</span>
        </button>
    )
}

export default CheckTheme;