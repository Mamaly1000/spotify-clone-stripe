"use client";
import React, { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { CircularProgress, TextField } from "@mui/material";
const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debounce = useDebounce<string>(value, 5000);
  useEffect(() => {
    const query = {
      title: debounce.debouncedValue,
    };
    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });
    router.push(url);
  }, [debounce.debouncedValue, router]);
  return (
    <div className="min-w-full p-5 text-white ">
      <div
        className="
        rounded-[5px] bg-secondary drop-shadow-2xl p-5 relative flex items-center justify-center"
      >
        <TextField
          variant="outlined"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          autoFocus
          fullWidth
          color="primary"
          value={value}
          label="search your song title"
          inputProps={{
            style: {
              color: "#ffffff !important",
            },
          }}
          style={{
            borderColor: "inherit",
            color: "#ffffff !important",
          }}
          className="text-text"
          InputLabelProps={{
            sx: {
              background: "var(--secondary-color)",
              textTransform: "capitalize",
            },
          }}
        />
        {debounce.isLoading && (
          <CircularProgress
            sx={{
              position: "absolute",
            }}
            className="right-7"
            color="primary"
          />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
