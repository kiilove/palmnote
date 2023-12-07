import { Button, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import QRCodeScanPlugin from "../components/QRCodeScanPlugin";
import Scanner from "./Scanner";

const QrcodeScan3 = () => {
  const [result, setResult] = useState("");
  const [cameras, setCameras] = useState([]);
  const [currentCamera, setCurrentCamera] = useState(null);
  const qrRef = useRef(null);
  const handleQRCodeScanned = (decodedText) => {
    // 스캔된 QR 코드 처리
    console.log("QR Code Scanned:", decodedText);
  };

  async function getCameraDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameraDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      setCameras(cameraDevices);
      console.log("Available Camera Devices (sorted by label):", cameraDevices);
    } catch (error) {
      console.error("Error fetching camera devices:", error);
    }
  }

  const handleCameraChange = (value) => {
    const selectedDeviceId = cameras[value]?.deviceId;
    setCurrentCamera(selectedDeviceId);
  };

  useEffect(() => {
    getCameraDevices();
  }, []);

  return (
    <div className="w-full flex h-full  flex-col">
      <div
        className="flex w-full gap-x-2 px-2 justify-center items-center bg-gray-100"
        style={{ height: "50px" }}
      >
        <div className="flex w-1/5">
          <Button style={{ height: "40px" }}>돌아가기</Button>
        </div>
        <div className="flex w-full h-full justify-center items-center">
          <Select
            onChange={handleCameraChange}
            style={{
              height: "40px",
              width: "100%",
            }}
          >
            {cameras?.length > 0 &&
              cameras.map((camera, cIdx) => {
                return (
                  <Select.Option value={cIdx}>카메라 {cIdx + 1}</Select.Option>
                );
              })}
          </Select>
        </div>
      </div>
      <div className="flex w-full h-full bg-red-200">
        <Scanner />
      </div>
    </div>
  );
};

export default QrcodeScan3;
