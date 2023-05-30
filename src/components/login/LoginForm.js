import Input from "../../common/Input";
import styles from "./LoginForm.module.css";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loginUser } from "../../services/requestsServices";
import { useState } from "react";
import { useAuthActions } from "../../provider/AuthProvider";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = object({
  email: string().email("Invalid email format").required("email is required"),
  password: string().required("password is required"),
});

const LoginForm = () => {
  const setAuth = useAuthActions();
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const navigate = useNavigate();

  const onSubmit = (values) => {
    loginUser(values)
      .then(({ data }) => {
        console.log(data);
        setAuth(data);
        localStorage.setItem("authState", JSON.stringify(data));
        setError(null);
        navigate(`/${redirect}`);
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          setError(err.response.data.message);
        }
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className={styles.mainContainer}>
      <form onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <Input name="email" formik={formik} label="Email" type="email" />
        <Input
          name="password"
          formik={formik}
          label="Password"
          type="password"
        />
        <button type="submit" className={styles.btn} disabled={!formik.isValid}>
          Login
        </button>
        {error && <p className="error">{error}</p>}

        <Link
          className={styles.link}
          to={`/signup${redirect && `?redirect=${redirect}`}`}
        >
          <p>Not singup yet ?</p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
