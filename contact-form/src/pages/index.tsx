import useTranslation from "next-translate/useTranslation";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import FormElement from "@/components/form-element";
import * as Yup from "yup";
import RadioButton from "@/components/radio-button";

export default function Home() {
  const { t } = useTranslation();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required(t("general:required")),
    lastName: Yup.string().required(t("general:required")),
    email: Yup.string()
      .email(t("general:invalidEmail"))
      .required(t("general:required")),
    picked: Yup.string().required(t("general:picked")),
    message: Yup.string().required(t("general:required")),
    checked: Yup.boolean().oneOf([true], t("general:mustBeChecked")),
  });

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  return (
    <section className="w-full h-screen flex justify-center items-center bg-light-green relative">
      {showSuccessMessage && (
        <div
          data-cy="submit_message"
          className="w-full h-max flex justify-center items-center absolute top-5"
        >
          <div className="w-[70%] sm:w-[30%] h-max flex flex-col gap-2 bg-dark-gray text-white p-5 rounded-md">
            <h3 className="font-bold text-base">{t("general:successTitle")}</h3>
            <p className="text-base">{t("general:successDescription")}</p>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-between w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50rem] h-[90%] p-[1.875rem] bg-white rounded-xl">
        <h1
          data-cy="title"
          className="text-xl sm:text-3xl text-dark-gray font-extrabold mb-3"
        >
          {t("general:title")}
        </h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            picked: "",
            message: "",
            checked: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setShowSuccessMessage(true);
              setSubmitting(false);
              resetForm();
            }, 400);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit} className="h-full">
              <div className="w-full h-full grid grid-flow-row justify-between grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5">
                <FormElement
                  dataCy="field_first_name"
                  width="sm:col-span-1"
                  label={t("general:firstName")}
                  name="firstName"
                  type="text"
                  error={touched.firstName && errors.firstName}
                  errorMessage={errors.firstName}
                  errorCy="error_required"
                />

                <FormElement
                  dataCy="field_last_name"
                  width="sm:col-span-1"
                  label={t("general:lastName")}
                  name="lastName"
                  type="text"
                  error={touched.lastName && errors.lastName}
                  errorMessage={errors.lastName}
                  errorCy="error_required"
                />

                <FormElement
                  dataCy="field_email"
                  width="sm:col-span-2"
                  label={t("general:email")}
                  name="email"
                  type="email"
                  error={touched.email && errors.email}
                  errorMessage={errors.email}
                  errorCy="error_required"
                />

                <div
                  data-cy="field_radio_group"
                  className="flex flex-col h-max sm:col-span-2 min-h-[6.875rem]"
                >
                  <label className="text-dark-gray text-base">
                    {t("general:type")}
                    <span className="text-medium-green text-xl ml-1">*</span>
                  </label>

                  <div
                    role="group"
                    aria-labelledby="my-radio-group"
                    className="w-full grid sm:grid-cols-2 gap-5"
                  >
                    <Field
                      component={RadioButton}
                      name="picked"
                      value="One"
                      label={t("general:first")}
                    />

                    <Field
                      component={RadioButton}
                      name="picked"
                      value="Two"
                      label={t("general:second")}
                    />
                  </div>

                  {touched.picked && errors.picked && (
                    <p
                      data-cy="error_selector"
                      className="text-red-500 text-base"
                    >
                      {errors.picked}
                    </p>
                  )}
                </div>

                <FormElement
                  dataCy="field_message"
                  width="sm:col-span-2"
                  label={t("general:message")}
                  name="message"
                  type="text"
                  multiline={true}
                  error={touched.message && errors.message}
                  errorMessage={errors.message}
                />

                <div
                  data-cy="field_checking"
                  className="sm:col-span-2 min-h-[3.625rem]"
                >
                  <label className="text-dark-gray text-base flex gap-3 items-center">
                    <Field type="checkbox" value="One" name="checked" />

                    {t("general:checked")}

                    <span className="text-medium-green text-xl">*</span>
                  </label>

                  {touched.checked && errors.checked && (
                    <p
                      data-cy="error_checking"
                      className="text-red-500 text-base col-span-2"
                    >
                      {errors.checked}
                    </p>
                  )}
                </div>

                <button
                  data-cy="field_button"
                  type="submit"
                  className="sm:col-span-2 bg-medium-green text-white font-bold rounded-md h-[3.125rem]"
                >
                  {t("general:submit")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
