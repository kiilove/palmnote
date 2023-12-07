import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QrScanner from "./pages/QrScanner";
import QrcodeReader from "./pages/QrcodeReader";
import QrcodeScan2 from "./pages/QrcodeScan2";
import QrcodeScan3 from "./pages/QrcodeScan3";
import TreeDetail from "./pages/TreeDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qrscanner" element={<QrScanner />} />
        <Route path="/treedetail" element={<TreeDetail />} />

        {/* <Route path="/test" element={<Main children={<AntdTest />} />} />
        <Route
          path="/customerlist"
          element={<Main children={<CustomerList />} />}
        />
        <Route
          path="/customernew"
          element={<Main children={<CustomerNew />} />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
