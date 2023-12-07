import { Button, Select, Spin } from "antd";
import React, { useState, useRef, useEffect } from "react";
import QrReader from "react-qr-scanner";
import { useNavigate } from "react-router-dom";

const QrScanner = () => {
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [result, setResult] = useState();
  const [cameras, setCameras] = useState([]);
  const [currentCamera, setCurrentCamera] = useState(null);
  const qrRef = useRef(null);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      const viewBox = document.getElementById("view-box");
      viewBox.style.borderColor = "green"; // 녹색으로 보더 색상 변경

      // 0.5초 후에 노란 박스로 돌아가게 설정
      setTimeout(() => {
        viewBox.style.borderColor = "white"; // 다시 노란색으로 보더 색상 변경
      }, 500);

      const newData = JSON.parse(data?.text);
      console.log(newData);
      setResult(newData.qr);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const previewStyle = {
    height: "200px",
    width: "100%",
  };

  const viewfinderStyle = {
    border: "2px solid red", // 원하는 스타일을 지정
    borderRadius: "10px",
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
    setCurrentCamera(() => cameras[value].deviceId);
  };

  useEffect(() => {
    if (result) {
      // 로딩 상태를 true로 설정
      setIsLoading(true);

      // 0.5초 딜레이 후에 네비게이션 수행
      setTimeout(() => {
        navigate("/treedetail", { state: { qr: result } });

        // 로딩 상태를 false로 설정하여 Spin을 숨깁니다.
        setIsLoading(false);
      }, 1000); // 0.5초 = 500 밀리초
    }
  }, [result]);

  useEffect(() => {
    getCameraDevices();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="w-full h-screen flex justify-center items-center ">
          <Spin size="large" />
        </div>
      )}
      {!isLoading && (
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
                      <Select.Option value={cIdx}>
                        카메라 {cIdx + 1}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </div>
          <div
            className="flex w-full justify-center"
            style={{ position: "relative" }}
          >
            <QrReader
              ref={qrRef}
              delay={100}
              style={{ width: "100%", maxWidth: "1000px" }}
              onError={handleError}
              onScan={handleScan}
              resolution={2500}
              constraints={{
                audio: false,
                video: {
                  deviceId:
                    currentCamera === null
                      ? cameras[3]?.deviceId
                      : currentCamera,
                },
              }}
            />
            <div
              id="view-box"
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", // 중앙 정렬
                border: "10px solid white",
                width: "80%",
                height: "50%",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default QrScanner;
