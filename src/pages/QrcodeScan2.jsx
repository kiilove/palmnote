import React, { useState } from "react";
import Html5QrcodePlugin from "../components/Html5QrcodePlugin";

const QrcodeScan2 = () => {
  const [first, setfirst] = useState();
  const onNewScanResult = (decodedText, decodedResult) => {
    // handle decoded results here
    setfirst(decodedText);
  };
  return (
    <div className="App">
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
};

export default QrcodeScan2;
