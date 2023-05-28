import React, { useState, useEffect, useCallback } from "react";
import "./indiviual.scss";
import { FormControl, InputAdornment, MenuItem, OutlinedInput, Select } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InputLabel from "@mui/material/InputLabel";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";

function TimerEditor({ slot, onChange = () => null, onDelete = () => null }) {
  const recurrentOptions = [
    { label: "Never Repeat", value: 0 },
    { label: "Daily", value: 1 },
    { label: "Weekly", value: 7 }
    // { label: "Monthly", value: 3 },
    // { label: "Yearly", value: 4 }
  ];
  const endOptions = [
    { label: "Never Stop", value: 0 },
    { label: "Until", value: 1 },
    { label: "Count", value: 2 }
  ];

  const [currentDate, setCurrentDate] = useState(
    slot.currentDate ? moment(slot.currentDate, "YYYY-MM-DD").toDate() : new Date()
  );
  const [repeatOption, setRepeatOption] = useState(slot.repeatType);
  const [repeatEvery, setRepeatEvery] = useState(slot.repeatEvery);
  const [endOption, setEndOption] = useState(slot.endType);
  const [endOptionDate, setEndOptionDate] = useState(
    slot.endDate ? moment(slot.endDate, "YYYY-MM-DD").toDate() : new Date()
  );
  const [endOptionCount, setEndOptionCount] = useState(slot.endCount || 1);
  const [startTime, setStartTime] = useState(moment(slot.startTime, "HH:mm").toDate());
  const [endTime, setEndTime] = useState(moment(slot.endTime, "HH:mm").toDate());

  useEffect(() => {
    const endDate = endOption
      ? endOption === 1
        ? moment(endOptionDate).format("YYYY-MM-DD")
        : moment(currentDate)
            .add(repeatOption * repeatEvery * (endOptionCount - 1), "day")
            .format("YYYY-MM-DD")
      : undefined;
    const sTime = moment(startTime).format("HH:mm");
    const eTime = moment(endTime).format("HH:mm");

    onChange({
      repeatType: repeatOption,
      endType: endOption,
      startTime: sTime,
      endTime: eTime,
      endCount: endOptionCount,
      currentDate: moment(currentDate).format("YYYY-MM-DD"),
      repeatEvery,
      endDate
    });
  }, [repeatEvery, repeatOption, endOption, endOptionCount, endOptionDate, startTime, endTime, currentDate]);

  const handleChangeRepeatType = useCallback((e) => {
    if (Number(e.target.value)) {
      setEndOption(0);
    }
    setRepeatOption(e.target.value);
  }, []);

  const handleChangeEndType = useCallback((e) => {
    setEndOption(e.target.value);
  }, []);

  const handleChangeCurrentDate = useCallback((e) => {
    setCurrentDate(e.toDate());
  }, []);

  const handleChangeEndOptionDate = useCallback((e) => {
    setEndOptionDate(e.toDate());
  }, []);

  const handleChangeTime1 = useCallback((newValue) => {
    setStartTime(newValue.toDate());
  }, []);

  const handleChangeTime2 = useCallback((newValue) => {
    setEndTime(newValue.toDate());
  }, []);

  const handleChangeEndOptionCount = useCallback((e) => {
    setEndOptionCount(+e.target.value);
  }, []);

  const handleChangeRepeatEvery = useCallback((e) => {
    setRepeatEvery(+e.target.value);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-5">
          <DeleteForeverIcon className="!text-4xl cursor-pointer" onClick={onDelete} />
          <div className="grid grid-cols-3 gap-x-12">
            <div className="col-span-2 flex items-center gap-5">
              <TimePicker
                className="w-full"
                ampm={false}
                value={startTime}
                onChange={handleChangeTime1}
                renderInput={(params) => <TextField {...params} />}
              />
              <p className="my-auto text-2xl font-bold">:</p>
              <TimePicker
                className="w-full"
                ampm={false}
                value={endTime}
                onChange={handleChangeTime2}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <DesktopDatePicker
              className="date-range-picker-custom"
              inputFormat="DD-MM-YYYY"
              value={currentDate}
              onChange={handleChangeCurrentDate}
              renderInput={(params) => (
                <TextField {...params} inputProps={{ ...params.inputProps, className: "!pl-2 !text-xs" }} readOnly />
              )}
            />
          </div>
        </div>
        <div className="pl-14 grid grid-cols-3 gap-x-12 gap-y-4">
          <FormControl>
            <InputLabel>Repeat</InputLabel>
            <Select value={repeatOption} label="Repeat" onChange={handleChangeRepeatType}>
              {recurrentOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {repeatOption !== 0 && (
            <>
              <TextField
                type="number"
                label="Repeat every"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 1, defaultValue: 1 }}
                value={repeatEvery}
                onChange={handleChangeRepeatEvery}
                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              />
              <FormControl className="col-start-1">
                <InputLabel>End</InputLabel>
                <Select value={endOption} label="End" onChange={handleChangeEndType}>
                  {endOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {endOption === 1 && (
                <DesktopDatePicker
                  className="date-range-picker-custom"
                  inputFormat="DD-MM-YYYY"
                  value={endOptionDate}
                  onChange={handleChangeEndOptionDate}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{ ...params.inputProps, className: "!pl-2 !text-xs" }}
                      readOnly
                    />
                  )}
                />
              )}
              {endOption === 2 && (
                <TextField
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 1, defaultValue: 1 }}
                  value={endOptionCount}
                  onChange={handleChangeEndOptionCount}
                />
              )}
            </>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default TimerEditor;
