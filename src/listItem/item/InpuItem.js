import {useState, useEffect} from 'react'



const InputItem = ({label, id, disabled, onChangeValue, name, valueProp, type}) =>{
    
    let [value, setValue] = useState('')
    useEffect(()=>{
        setValue(valueProp)
    })


    return(
        <li className="item" id={'inp-'+id}>
            <label htmlFor={id}>{label}</label>
            <input type={type || 'text'} 
                id={id}
                value={value}
                disabled={disabled}
                name={name}
                onChange={(e)=> {setValue(value); onChangeValue(e)}}
            />
        </li>
    )
}


export default InputItem;