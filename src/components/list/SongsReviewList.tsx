import { List } from "@mui/icons-material";
import { Divider } from "@mui/material";
import React, { Fragment, useMemo } from "react";

const SongsReviewList = () => {
  const data = useMemo(
    () => [
      { key: "sdfdf", value: "dfds" },
      { key: "sdfdf", value: "dfds" },
      { key: "sdfdf", value: "dfds" },
      { key: "sdfdf", value: "dfds" },
    ],
    []
  );

  return (
    <div className="min-w-full flex flex-col items-start justify-start gap-1  bg-secondary min-h-[300px] p-5 drop-shadow-2xl rounded-lg">
      <h3 className="capitalize font-semibold text-[1.3rem] text-start mb-3 flex items-center justify-between min-w-full">
        song details :{" "}
        <List
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid #fff",
            padding: 1,
          }}
        />
      </h3>
      {data.map((d) => (
        <Fragment key={d.key + Math.random()}>
          <div
            key={d.key}
            className="item min-w-full flex items-center justify-between gap-2 flex-wrap p-2 drop-shadow-2xl"
          >
            <span className="text-slate-300 font-light capitalize text-[.9rem] font-encode">
              {d.key} :
            </span>
            <span className="text-text font-semibold capitalize font-orbit">
              {d.value}
            </span>
          </div>
          <Divider className="min-w-full bg-primary text-primary border-primary border-[.1px]" />
        </Fragment>
      ))}
    </div>
  );
};

export default SongsReviewList;
