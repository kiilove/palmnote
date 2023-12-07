import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Result status="error" title="해당 데이터를 찾을수 없습니다.">
        <div className="flex w-full justify-center">
          <Button onClick={() => navigate("/")}>돌아가기</Button>
        </div>
      </Result>
    </div>
  );
};

export default ErrorPage;
