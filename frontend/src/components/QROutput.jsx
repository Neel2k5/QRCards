import { FaGear, FaRotateRight } from "react-icons/fa6";

function QROutput({qrSRC,genQRCB,resetQRCB}) {
    return (
    <div className="QROutput">
        <div><button onClick={genQRCB}><FaGear/></button>
        <button onClick={resetQRCB}><FaRotateRight/></button></div>
        
      <img src={qrSRC}style={{display:qrSRC===""?"none":"inline-block"}}></img>
    </div>);
}

export default QROutput;