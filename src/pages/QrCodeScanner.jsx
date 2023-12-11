import React, { useEffect, useState } from "react";
import Html5QrcodePlugin from "../components/Html5QrcodePlugin";
import QrReaderPlugin from "../components/QrReaderPlugin";
import { useNavigate } from "react-router-dom";

const QRCodeScanner = () => {
  const [result, setResult] = useState();

  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      console.log("스캔된 데이터:", data);
      const newData = JSON.parse(data);
      navigate("/treedetail", { state: { ...newData } });
    }
  };

  return (
    <div className="w-full flex h-full flex-col">
      <QrReaderPlugin onScan={handleScan} />
    </div>
  );
};

export default QRCodeScanner;
