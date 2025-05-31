import { FaArrowUp, FaArrowDown,FaTrash } from 'react-icons/fa';
function Pair({field,description,moveUPCB,moveDOWNCB,removePairCB,id}) {
    
    return (<div className="Pair">
        <div>{"["+field+"]"+description}</div>
        <div>
        <button 
        onClick={()=>{moveUPCB(id)}}
        ><FaArrowUp/></button>
        <button 
        onClick={()=>{moveDOWNCB(id)}}
        ><FaArrowDown/></button>
        <button 
        onClick={()=>{removePairCB(id)}}
        ><FaTrash/></button>
         </div>

    </div>);

}

export default Pair;