import { Field } from "formik";
import React, { HTMLProps } from "react";

export interface RadioProps extends HTMLProps<HTMLDivElement> {
  value: string;
  label: string;
}

const RadioButton = ({ value, label }: RadioProps) => {
  return (
    <label className="text-dark-gray text-base cursor-pointer border-[0.125rem] border-gray-300 focus:outline-none hover:border-medium-green active:border-medium-green rounded-md h-[2rem] sm:h-[3.125rem] flex items-center gap-3 px-3 sm:p-3">
      <Field type="radio" name="picked" value={value} />
      {label}
    </label>
  );
};

export default RadioButton;
