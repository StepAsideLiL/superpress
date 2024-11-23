"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import * as df from "date-fns";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function DateTimePicker({
  date,
  onChange,
}: {
  date: Date;
  onChange: (date: Date) => void;
}) {
  const [day, setDay] = useState(df.getDate(date));
  const [month, setMonth] = useState(months[df.getMonth(date)]);
  const [year, setYear] = useState(df.getYear(date));
  const [hour, setHour] = useState(df.getHours(date));
  const [minute, setMinute] = useState(df.getMinutes(date));

  function onDateChange(
    day: number,
    month: string,
    year: number,
    hour: number,
    minute: number
  ) {
    const date = df.parse(
      `${day} ${month} ${year} ${hour}:${minute}`,
      "d MMMM yyyy H:m",
      new Date()
    );
    onChange(date);
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        value={month}
        onValueChange={(value) => {
          setMonth(value);
          onDateChange(day, value, year, hour, minute);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={month} />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        min={1}
        max={df.getDaysInMonth(
          df.parse(`${day} ${month} ${year}`, "d MMMM yyyy", new Date())
        )}
        value={day}
        onChange={(e) => {
          if (e.target.value === "" || Number(e.target.value) <= 0) {
            setDay(1);
            onDateChange(Number(1), month, year, hour, minute);
          } else if (
            Number(e.target.value) >
            df.getDaysInMonth(
              df.parse(`${month} ${year}`, "MMMM yyyy", new Date())
            )
          ) {
            console.log(
              "value",
              df.getDaysInMonth(
                df.parse(`${month} ${year}`, "MMMM yyyy", new Date())
              )
            );
            setDay(
              df.getDaysInMonth(
                df.parse(`${month} ${year}`, "MMMM yyyy", new Date())
              )
            );
            onDateChange(
              df.getDaysInMonth(
                df.parse(`${month} ${year}`, "MMMM yyyy", new Date())
              ),
              month,
              year,
              hour,
              minute
            );
          } else {
            setDay(Number(e.target.value));
            onDateChange(Number(e.target.value), month, year, hour, minute);
          }
        }}
        onWheel={(e) => e.currentTarget.blur()}
        onFocus={(e) => e.target.select()}
        className="text-center"
      />

      <Input
        type="number"
        min={1}
        value={year}
        onChange={(e) => {
          setYear(Number(e.target.value));
          onDateChange(day, month, Number(e.target.value), hour, minute);
        }}
        onWheel={(e) => e.currentTarget.blur()}
        onFocus={(e) => e.target.select()}
        className="text-center"
      />

      <span>at</span>

      <Input
        type="number"
        min={0}
        max={23}
        value={hour}
        onChange={(e) => {
          setHour(Number(e.target.value));
          onDateChange(day, month, year, Number(e.target.value), minute);

          if (e.target.value === "" || Number(e.target.value) < 1) {
            setHour(1);
            onDateChange(day, month, year, 1, minute);
          } else if (Number(e.target.value) >= 23) {
            setHour(23);
            onDateChange(day, month, year, 23, minute);
          } else {
            setHour(Number(e.target.value));
            onDateChange(day, month, year, Number(e.target.value), minute);
          }
        }}
        onWheel={(e) => e.currentTarget.blur()}
        onFocus={(e) => e.target.select()}
        className="text-center"
      />

      <span>:</span>

      <Input
        type="number"
        min={0}
        max={59}
        value={minute}
        onChange={(e) => {
          if (e.target.value === "" || Number(e.target.value) < 0) {
            setMinute(0);
            onDateChange(day, month, year, hour, 0);
          } else if (Number(e.target.value) >= 59) {
            setMinute(59);
            onDateChange(day, month, year, hour, 59);
          } else {
            setMinute(Number(e.target.value));
            onDateChange(day, month, year, hour, Number(e.target.value));
          }
        }}
        onWheel={(e) => e.currentTarget.blur()}
        onFocus={(e) => e.target.select()}
        className="text-center"
      />
    </div>
  );
}
