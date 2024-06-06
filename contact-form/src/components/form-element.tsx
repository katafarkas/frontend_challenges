import React from "react";
import { useField } from "formik";
import clsx from "clsx";

export interface FormProps extends React.HTMLProps<HTMLDivElement> {
  width: string;
  label: string;
  name: string;
  type: string;
  multiline?: boolean;
  error?: string | false | undefined;
  errorMessage?: string;
  dataCy?: string;
  errorCy?: string;
}

const FormElement = ({
  width,
  label,
  name,
  type,
  multiline = false,
  error,
  errorMessage,
  dataCy,
  errorCy,
}: FormProps) => {
  const [field, meta] = useField(name);
  const isError = error || (meta.touched && meta.error);

  return (
    <div
      className={clsx(
        width,
        multiline
          ? "min-h-[9.5rem] sm:min-h-[9.625rem]"
          : "min-h-[5.25rem] sm:min-h-[6.875rem]",
        "flex flex-col"
      )}
    >
      <label htmlFor={name} className="text-dark-gray text-base">
        {label}
        <span className="text-medium-green text-xl ml-1">*</span>
      </label>
      {multiline ? (
        <textarea
          {...field}
          data-cy={dataCy}
          id={name}
          className={clsx(
            isError
              ? "border-red-500 focus:outline-none focus:border-red-500"
              : "border-gray-300 focus:outline-none hover:border-medium-green focus:border-medium-green",
            "border-[0.125rem] cursor-pointer  rounded-md text-dark-gray h-[6.25rem] p-3"
          )}
        />
      ) : (
        <input
          {...field}
          id={name}
          type={type}
          data-cy={dataCy}
          className={clsx(
            isError
              ? "border-red-500 focus:outline-none focus:border-red-500"
              : "border-gray-300 focus:outline-none hover:border-medium-green focus:border-medium-green",
            "border-[0.125rem] cursor-pointer rounded-md text-dark-gray h-[2rem] sm:h-[3.125rem] p-3"
          )}
        />
      )}
      {isError && (
        <p data-cy={errorCy} className="text-red-500 text-base">
          {meta.error || errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormElement;
