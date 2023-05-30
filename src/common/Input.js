import { Field, ErrorMessage } from "formik";
import styles from "./Input.module.css";
import "./Input.module.css";
import { useRef } from "react";

const Input = ({ label, name, formik, type = "text" }) => {
  const ref = useRef();
  const focusHandler = () => {
    ref.current.className = "focused";
    console.log(ref.current);
  };
  const blurHandler = (e) => {
    const value = e.target.value;
    if (!value) {
      ref.current.className = "blur";
    }
  };

  return (
    <div className={styles.formController}>
      <label htmlFor={name} ref={ref} className="blur">
        {label}
      </label>
      <input
        className={styles.input}
        name={name}
        type={type}
        id={name}
        {...formik.getFieldProps(name)}
        onFocus={focusHandler}
        onBlurCapture={blurHandler}
      />
      {formik.errors[name] && formik.touched[name] && (
        <div className={styles.error}>{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default Input;
