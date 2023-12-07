import { Button, Form, Input, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-start">
      <div
        className="flex w-full h-full bg-white justify-start items-center p-5 flex-col"
        style={{ maxWidth: "1000px", minHeight: "100vh" }}
      >
        <div className="flex h-40 w-full justify-center items-center ">
          <span
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 35,
              fontWeight: "bold",
            }}
          >
            PALM SCAN
          </span>
        </div>
        <Space direction="vertical" size={20}>
          <Form
            layout="inline"
            labelCol={{
              span: 6,
            }}
          >
            <Form.Item label="바코드입력" name="qrValue">
              <Space.Compact>
                <Input />
                <Button type="primary" className="bg-blue-500">
                  검색
                </Button>
              </Space.Compact>
            </Form.Item>
          </Form>
          <Button
            type="primary"
            className="bg-blue-500 w-full h-10"
            onClick={() => {
              navigate("/qrscanner");
            }}
          >
            QR코드스캔
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Home;
