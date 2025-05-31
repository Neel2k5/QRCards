import TestPair from './components/TestPair';
import Input from './components/Input';
import Bar from './components/Bar';
import Pair from './components/Pair';
import PreviewBox from './components/PreviewBox';
import { useEffect, useState } from 'react';
import MessageBox from './components/MessageBox';
import { FaLightbulb } from 'react-icons/fa';
import QROutput from './components/QROutput';
function App() {
  
  const [testPair,setTestPair]= useState(()=>{return {tpc1:"field",tpc2:"description",size:0}});
  const [pairList,setPairList]= useState([]);
  const [byteCount,setByteCount]=useState(0);
  const [qrSRC,setQRSRC]=useState("");

  function handlePairAddition(){

    const pair = {field:testPair.tpc1,description:testPair.tpc2};
    pair.size=testPair.tpc1.length+testPair.tpc2.length+3;
    setTestPair(()=>{return {tpc1:"field",tpc2:"description",size:0}});

    setPairList(
      (prev)=>{
        if(!prev.some((value)=>{return value.field===pair.field})
          &&pair.field!=="field"
          &&pair.description!=="description"
          &&pair.field&&pair.description){
          return [...prev,pair];
        }
        else {
          return prev;
          

        }
      }
    );
          
  }
  
  function RenderPair(field,description,id,moveUPCB,moveDOWNCB,removePairCB) {
    return (<Pair field={field} description={description} id={id} key={id}
       moveDOWNCB={moveDOWNCB} moveUPCB={moveUPCB} removePairCB={removePairCB} />);
  }
  function HandlePairRemoval(id){
    setPairList((prev)=>prev.filter((ignoredValue,index)=>index!==id));
  }
  function HandlePairMoveUP(id) {
    setPairList((prev)=>{
      if(id===0)return prev;
      let newArr = [...prev];
      [newArr[id-1],newArr[id]]=[newArr[id],newArr[id-1]];
      return newArr;
    })
  }
  function HandlePairMoveDOWN(id) {
    setPairList((prev)=>{
      if(id===prev.length-1)return prev;
      let newArr = [...prev];
      [newArr[id+1],newArr[id]]=[newArr[id],newArr[id+1]];
      return newArr;
    })
  }

  async function generateQRByAPI() {
    const payload = pairList.map((i)=>{return "["+i.field+"]"+i.description+"\n";}).join("");
    
    const response = await fetch("/api/qrgen",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: payload }),
      }
    );
    if(!response.ok)return;
    const responseData = await response.json();
    console.log(responseData);
    setQRSRC(responseData.data)
  }




  //update byte count
  useEffect(()=>{
    setByteCount(()=>{
      return pairList.reduce((bytes,pair)=>{return bytes+pair.size;},0);
    })
  },[pairList]);
  return (
    <>
      <Bar><h3>QR Card</h3></Bar>
      <div className='Input-Container'>
        <Input
        id="field"
        type="text"
        placeholder="Enter Field..."
        saveCallBack={
          (value)=>{
            
            setTestPair(
              (prev)=>{
                
                return {...prev,tpc1:value.trim(),size:prev.size+value.trim().length};

              }
            )
          }
        }
        />
        <Input 
        id="value"
        type="text"
        placeholder="Enter Desc..."
        saveCallBack={
          (value)=>{
            
            setTestPair(
              (prev)=>{
                return {...prev,tpc2:value.trim(),size:prev.size+value.trim().length};
              }
            )
          }
        }
        />

      <MessageBox icon = {<FaLightbulb />} description="For better functionality the QR code should have maximum 1500 bytes of data"/>
      <TestPair
      tpc1={testPair.tpc1}
      tpc2={testPair.tpc2}
      cleanTPCB={
        ()=> setTestPair( {tpc1:"field",tpc2:"description"})
      }
      saveTPCB={
       handlePairAddition
      }
      />
      <div className="ByteCounter">
        Available Bytes : {1500-byteCount}
      </div>
      <PreviewBox>
      
      {pairList.map((pair,index)=>{
        return RenderPair(pair.field,pair.description,index,HandlePairMoveUP,HandlePairMoveDOWN,HandlePairRemoval);
      })}
      </PreviewBox>


      <QROutput qrSRC={qrSRC} 
                resetQRCB={()=>setQRSRC("")}
                genQRCB={generateQRByAPI}
                
                />

      </div>
      
      
      
    </>
  )
}

export default App
