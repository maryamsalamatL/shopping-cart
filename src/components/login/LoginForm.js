import Input from "../../common/Input";
import { useFormik } from "formik";
import { object, string, ref, array, boolean, number } from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/requestsServices";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = object({
  email: string().email("Invalid email format").required("email is required"),
  password: string().required("password is required"),
});

const LoginForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const onSubmit = (values) => {
    loginUser(values)
      .then(({ data }) => {
        console.log(data);
        setError(null);
        navigate("/");
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input name="email" formik={formik} label="Email" type="email" />
        <Input
          name="password"
          formik={formik}
          label="Password"
          type="password"
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to="/signup">
          <p>Not singup yet ?</p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
