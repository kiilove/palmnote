import { Button, Select } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { QrReader } from "react-qr-reader";

const QrcodeReader = () => {
  const [result, setResult] = useState("");
  const [cameras, setCameras] = useState([]);
  const [currentCamera, setCurrentCamera] = useState(null);
  const qrRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setResult(data?.text);
      console.log(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const previewStyle = {
    height: "200px",
    width: "100%",
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
    setCurrentCamera(cameras[value].deviceId);
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

      <QrReader
        ref={qrRef}
        delay={300}
        style={{ width: "100%", height: "100%" }}
        onError={handleError}
        onScan={handleScan}
        constraints={{
          deviceId:
            currentCamera === null ? cameras[4]?.deviceId : currentCamera,
        }}
      />

      <p>{result}</p>
    </div>
  );
};

export default QrcodeReader;
