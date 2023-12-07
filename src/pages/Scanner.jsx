import React, { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
const brConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
let html5QrCode;

const Scanner = (props) => {
  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader");
  }, []);

  const handleClickAdvanced = () => {
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      props.onResult(decodedText);
      handleStop();
    };
    html5QrCode.start(
      { facingMode: "environment" },
      props.type === "QR" ? qrConfig : brConfig,
      qrCodeSuccessCallback
    );
  };

  const handleStop = () => {
    try {
      html5QrCode
        .stop()
        .then((res) => {
          html5QrCode.clear();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-full">
      <div id="reader" className="w-full h-full" />
      <button onClick={() => handleClickAdvanced()}>
        click pro {props.type}
      </button>
      <button onClick={() => handleStop()}>stop pro</button>
    </div>
  );
};
export default Scanner;
