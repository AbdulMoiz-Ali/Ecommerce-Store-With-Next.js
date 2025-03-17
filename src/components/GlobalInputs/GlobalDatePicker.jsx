import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import { Calendar } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import "../../datepicker/datepicker.css";
import { setValues } from "../../../store/slices/MobilePreviewSlice";
import dayjs from "dayjs";

const GlobalDatePicker = ({
  name,
  required,
  validationError,
  label,
  placeholder,
}) => {
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="w-[100%]">
      <Controller
        name={name}
        control={control}
        {...(required && {
          rules: { required: required && `${validationError}` },
        })}
        render={({ field }) => (
          <div className="flex flex-col gap-2 w-[100%]">
            {label && (
              <label htmlFor={name} className="text-white !font-[300] text-sm">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
            <div className="flex flex-col gap-[3px]">
              <DatePicker
                {...field}
                className="border-none"
                format={"DD/MM/YYYY"}
                placeholder={placeholder}
                style={{ backgroundColor: "var(--darkest-bg)", color: "white" }}
                suffixIcon={<Calendar className="text-[var(--primary)]" />}
                value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null}
                onChange={(_, dateString) => {
                  field.onChange(dateString);
                  dispatch(setValues({ name: name, value: dateString }));
                  console.log(dateString);
                }}
              />
              {errors[name] && (
                <span className="text-sm text-red-500">
                  {errors[name]?.message}
                </span>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default GlobalDatePicker;
