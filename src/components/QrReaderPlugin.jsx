import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrReaderPlugin = ({ onScan }) => {
  const qrRef = useRef(null);
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");

  // 사용 가능한 카메라 목록을 가져오고 후면 카메라를 기본값으로 설정하는 함수
  const fetchCameras = async () => {
    try {
      const availableCameras = await Html5Qrcode.getCameras();
      if (availableCameras && availableCameras.length > 0) {
        setCameras(availableCameras);
        // 후면 카메라를 기본값으로 설정 (일반적으로 마지막 카메라가 후면 카메라)
        setSelectedCameraId(availableCameras[availableCameras.length - 1].id);
      }
    } catch (error) {
      console.error("카메라를 불러오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []);

  useEffect(() => {
    if (!selectedCameraId) return;

    const html5QrCode = new Html5Qrcode("reader-renderbox");
    const config = { fps: 10, qrbox: 250 };

    html5QrCode.start(
      selectedCameraId,
      config,
      (decodedText, decodedResult) => {
        onScan(decodedText);
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );

    return () => {
      html5QrCode
        .stop()
        .catch((err) => console.log("QR 스캐너 중지 중 오류 발생:", err));
    };
  }, [selectedCameraId, onScan]);

  return (
    <div>
      {cameras.length > 1 && (
        <select
          onChange={(e) => setSelectedCameraId(e.target.value)}
          value={selectedCameraId}
        >
          {cameras.map((camera) => (
            <option key={camera.id} value={camera.id}>
              {camera.label || `카메라 ${camera.id}`}
            </option>
          ))}
        </select>
      )}
      <div ref={qrRef} id="reader-renderbox"></div>
    </div>
  );
};

export default QrReaderPlugin;
