import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QrScanner from "./pages/QrScanner";
import QrcodeReader from "./pages/QrcodeReader";

import TreeDetail from "./pages/TreeDetail";
import ErrorPage from "./pages/ErrorPage";
import QRCodeScanner from "./pages/QrCodeScanner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qrscanner" element={<QRCodeScanner />} />
        <Route path="/treedetail" element={<TreeDetail />} />
        <Route path="/errorpage" element={<ErrorPage />} />

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
