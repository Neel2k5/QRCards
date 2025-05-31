import { useState } from 'react'
import { FaTrash,FaSave } from 'react-icons/fa';

function Input(props) {
    
    const [ivalue,setIvalue]=useState("");

    function handleOnChange(newValue) {
        setIvalue(()=>newValue);
    }
    function handleOnClickClear(){
        setIvalue("");
    }
    function handleOnClickSave(){
        props.saveCallBack(ivalue);
    }
    return (
        <div className='Input'>
            <input 
            id={props.id}
             type={props.type}
             placeholder={props.placeholder} 
             value={ivalue}
             onChange={(element)=>{handleOnChange(element.target.value);}}
             >
             </input>
             <button 
             onClick={handleOnClickSave}
             ><FaSave/></button>
             <button 
             onClick={handleOnClickClear}
             ><FaTrash/></button>
             
        </div>
    );
}

export default Input;