import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TreeDetail = () => {
  const [descriptionData, setDescriptionData] = useState([]);
  const location = useLocation();

  const handleBasicInfo = () => {
    if (location.state.prevData?.id) {
      const {
        id,
        isActive,
        seedSowing,
        seedSowingType,
        seedName,
        seedProjectName,
        seedPurchaseOfficeName,
        seedSowingDate,
        dayDiff,
      } = location.state.prevData;

      const timestamp = new Timestamp(
        seedSowingDate.seconds,
        seedSowingDate.nanoseconds
      );

      // toDate() 메서드를 사용하여 JavaScript Date 객체로 변환
      const date = timestamp.toDate();

      // dayjs를 사용하여 형식을 변경
      const newSeedDate = dayjs(date).format("YYYY-MM-DD");

      const newData = [
        {
          key: "1",
          label: "파종일",
          children: newSeedDate,
        },
        {
          key: "2",
          label: "파종",
          children: (
            <span>
              {seedSowing.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <span>{seedSowingType === "weight" ? "kg" : "개"}</span>
            </span>
          ),
        },
        { key: "3", label: "종자명", children: seedName },
        { key: "4", label: "육종일수", children: dayDiff + "일" },
        { key: "5", label: "매입처", children: seedPurchaseOfficeName },
      ];

      setDescriptionData([...newData]);
    }
  };

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <div
        className="flex w-full justify-center items-center h-20"
        style={{ fontSize: 20, fontWeight: "bold" }}
      >
        상세보기
      </div>
    </div>
  );
};

export default TreeDetail;
