
import { useState } from 'react';
import './checkTheme.css';

const CheckTheme = () =>{
    let [active, setActive] = useState(false)

    let classe = ''
    if(active){
        classe = ' active'
    }

    return(
        <button className={"check__theme"+classe} onClick={()=> setActive(!active)}>
            <span className="off">off</span>
            <span className="circle"></span>
            <span className="on">on</span>
        </button>
    )
}

export default CheckTheme;