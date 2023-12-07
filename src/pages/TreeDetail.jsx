import dayjs from "dayjs";
import { Timestamp, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirestoreAddData, useFirestoreQuery } from "../hooks/useFirestore";
import { DatePicker, Descriptions, Spin } from "antd";
import { encodeDate, getToday } from "../functions";
import TextArea from "antd/es/input/TextArea";

import "dayjs/locale/ko";
import locale from "antd/es/date-picker/locale/ko_KR";
import { IoSend } from "react-icons/io5";
const TreeDetail = () => {
  const [descriptionData, setDescriptionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noteContent, setNoteContent] = useState({ noteDate: new Date() });
  const [feeds, setFeeds] = useState([]);
  const [transplantingInfo, setTransplantingInfo] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const textAreaRef = useRef();
  const firestoreQuery = useFirestoreQuery();
  const firestoreAdd = useFirestoreAddData();

  const fetchData = async (propBarcode, propQrcode) => {
    setIsLoading(true);
    const basicCondition = [where("transplantingBarCode", "==", propBarcode)];
    const feedCondition = [where("refQrCode", "==", propQrcode)];
    try {
      await firestoreQuery.getDocuments(
        "transplanting",
        (data) => {
          if (data?.length <= 0) {
            // navigate("/errorpage");
            setIsLoading(false);
            return;
          } else {
            console.log(data);
            setTransplantingInfo({ ...data[0] });
          }
        },
        basicCondition
      );
    } catch (error) {
      console.log(error);
    }

    try {
      await firestoreQuery.getDocuments(
        "treefeed",
        (data) => {
          console.log("Q", data);
          setFeeds([...data]);
        },
        feedCondition,
        "noteDate",
        "desc"
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBasicInfo = (propData, propQrcode) => {
    if (propData?.id) {
      const { id, seedName, seedPurchaseOfficeName, seedSowingDate } =
        propData.sowing;

      const { transplantingBarCode, transplantingBlock, transplantingDate } =
        propData;

      const seedTimestamp = new Timestamp(
        seedSowingDate.seconds,
        seedSowingDate.nanoseconds
      );

      // toDate() 메서드를 사용하여 JavaScript Date 객체로 변환
      const seedDate = seedTimestamp.toDate();

      // dayjs를 사용하여 형식을 변경
      const newSeedDate = dayjs(seedDate).format("YYYY-MM-DD");

      const transplantingTimestamp = new Timestamp(
        transplantingDate.seconds,
        transplantingDate.nanoseconds
      );

      // toDate() 메서드를 사용하여 JavaScript Date 객체로 변환
      const transplantDate = transplantingTimestamp.toDate();

      // dayjs를 사용하여 형식을 변경
      const newTransplantingDate = dayjs(transplantDate).format("YYYY-MM-DD");
      const startDate = new Date(transplantingTimestamp.toDate());
      const endDate = new Date();
      const timeDiff = endDate - startDate;

      const transplantingDayDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
      const newData = [
        {
          key: "0",
          label: "고유번호",
          children: propQrcode,
        },
        {
          key: "1",
          label: "파종일",
          children: newSeedDate,
        },
        {
          key: "2",
          label: "이식일",
          children: newTransplantingDate,
        },
        { key: "3", label: "종자명", children: seedName },
        { key: "4", label: "육묘일수", children: transplantingDayDiff + "일" },
        { key: "5", label: "매입처", children: seedPurchaseOfficeName },
      ];
      console.log(newData);
      setDescriptionData([...newData]);
    }
  };

  const handleAddFeed = async (propData, propQr) => {
    try {
      await firestoreAdd.addData(
        "treefeed",
        { ...propData, refQrCode: propQr },
        () => {
          const feedArray = [...feeds];
          feedArray.push({
            ...propData,
            refQrCode: propQr,
          });
          setFeeds([...feedArray]);
          console.log(feeds);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location?.state) {
      fetchData(location.state.bar, location.state.qr);
    }
  }, [location]);

  useEffect(() => {
    if (transplantingInfo) {
      handleBasicInfo(transplantingInfo, location.state.qr);
    }
  }, [transplantingInfo]);

  return (
    <div className="flex w-full h-full justify-center items-center bg-gray-100">
      {isLoading && (
        <div className="w-full h-screen flex justify-center items-center">
          <Spin />
        </div>
      )}
      {!isLoading && (
        <div
          className="flex flex-col w-full h-full justify-start items-center px-5 bg-white"
          style={{ maxWidth: "1000px" }}
        >
          <div
            className="flex w-full justify-center items-center h-16"
            style={{ fontSize: 20, fontWeight: "bold" }}
          >
            상세보기
          </div>
          <div className="flex w-full p-2 flex-col gap-y-2">
            <span>기본정보</span>
            <Descriptions items={descriptionData} bordered />
          </div>
          <div className="flex w-full p-2 flex-col gap-y-2">
            <div className="flex gap-x-2  rounded-lg">
              <DatePicker
                locale={locale}
                defaultValue={dayjs(new Date())}
                onChange={(e) => {
                  setNoteContent(() => ({
                    ...noteContent,
                    noteDate: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="flex w-full p-2 flex-col gap-y-2">
            <div className="flex gap-x-2 border rounded-lg">
              <TextArea
                rows={2}
                bordered={false}
                style={{ resize: "none" }}
                onChange={(e) =>
                  setNoteContent(() => ({
                    ...noteContent,
                    noteText: e.target.value,
                  }))
                }
              />
              <button
                className="flex justify-center items-center bg-blue-300 rounded-r-lg"
                style={{ width: "40px" }}
                onClick={() => handleAddFeed(noteContent, location?.state.qr)}
              >
                <IoSend
                  className="text-gray-700"
                  style={{ fontSize: "20px" }}
                />
              </button>
            </div>
          </div>
          <div className="flex w-full p-2 flex-col gap-y-2">
            {feeds?.length > 0 &&
              feeds.map((feed, fIdx) => {
                const { noteDate, noteText } = feed;
                console.log(noteDate);
                const noteDateEncode =
                  noteDate === "방금전"
                    ? "방금전"
                    : dayjs(noteDate?.toDate()).format("YYYY-MM-DD HH:mm:ss");
                return (
                  <div className="flex flex-col w-full h-full">
                    <div className="flex">
                      <span
                        className="text-gray-800"
                        style={{ fontSize: "13px" }}
                      >
                        작성일자:{noteDateEncode}
                      </span>
                    </div>
                    <div className="flex w-full border">
                      <TextArea
                        value={noteText}
                        bordered={false}
                        style={{ resize: "none" }}
                        readOnly
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeDetail;
