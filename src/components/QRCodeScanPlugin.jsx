import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

const QRCodeScanPlugin = ({ onQRCodeScanned }) => {
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState(null);
  const qrCodeScannerRef = useRef(null);

  useEffect(() => {
    async function getCameraDevices() {
      try {
        const devices = await Html5Qrcode.getCameras();
        setCameras(devices);
        console.log("Available Camera Devices:", devices);
      } catch (error) {
        console.error("Error fetching camera devices:", error);
      }
    }

    getCameraDevices();
  }, []);

  const startScanner = async (cameraId) => {
    try {
      if (qrCodeScannerRef.current) {
        await qrCodeScannerRef.current.clear();
        await qrCodeScannerRef.current.stop();
      }

      qrCodeScannerRef.current = new Html5Qrcode("qr-code-reader");
      await qrCodeScannerRef.current.start(cameraId, (decodedText) => {
        onQRCodeScanned(decodedText);
      });
    } catch (error) {
      console.error("Error starting scanner:", error);
    }
  };

  const handleCameraChange = (event) => {
    const newCameraId = event.target.value;
    setSelectedCameraId(newCameraId);
    startScanner(newCameraId);
  };

  return (
    <div className="w-full h-full">
      test
      <div>
        <select value={selectedCameraId || ""} onChange={handleCameraChange}>
          <option value="">Select Camera</option>
          {cameras.map((camera) => (
            <option key={camera.id} value={camera.id}>
              {camera.label || `Camera ${camera.id + 1}`}
            </option>
          ))}
        </select>
      </div>
      <video
        id="qr-code-reader"
        style={{ width: "100%", height: "auto" }}
        autoPlay={true}
        muted
      ></video>
    </div>
  );
};

export default QRCodeScanPlugin;
