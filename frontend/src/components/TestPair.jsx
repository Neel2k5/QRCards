import { FaTrash,FaSave } from 'react-icons/fa';
function TestPair(props) {
    return (
        <div className="TestPair">
            <div id="tpc1" >{props.tpc1?"["+props.tpc1+"]":"[field]"}</div>
            <div id="tpc2">{props.tpc2?props.tpc2:"description"}</div>
            <span>
                <button 
             onClick={props.saveTPCB}
             ><FaSave/></button>
             <button 
             onClick={props.cleanTPCB}
             ><FaTrash/></button>
            </span>
            
        </div>
    );

}

export default TestPair;
