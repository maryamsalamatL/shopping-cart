import { Field, ErrorMessage } from "formik";

const Input = ({ label, name, formik, type = "text" }) => {
  return (
    <div className="formController">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        id={name}
        {...formik.getFieldProps(name)}
      />
      {formik.errors[name] && formik.touched[name] && (
        <div>{formik.errors[name]}</div>
      )}
      {/* <Field name={name} type={type} id={name} /> */}
      {/* {formik.errors[name] && formik.touched[name] && (
        <ErrorMessage name={name} component="span" className="error" />
      )} */}
    </div>
  );
};

export default Input;
