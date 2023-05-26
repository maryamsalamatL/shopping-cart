import Input from "../../common/Input";
import { useFormik } from "formik";
import { object, string, ref, array, boolean, number } from "yup";
import { Link } from "react-router-dom";
import { signupUser } from "../../services/requestsServices";
import { useState } from "react";
import { useAuthActions } from "../../provider/AuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
};
const validationSchema = object({
  name: string().required("name is required"),
  email: string().email("Invalid email format").required("email is required"),
  phoneNumber: string()
    .required("phone number is required")
    .matches(/^[0-9]{11}/, "invalid phone number")
    .nullable(),

  password: string().required("password is required"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  // ),
  passwordConfirm: string()
    .required("passwordConfirm is required")
    .oneOf([ref("password"), null], "password must match"),
});

const Signup = () => {
  const [error, setError] = useState(null);
  const setAuth = useAuthActions();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "";

  const onSubmit = (values) => {
    const { name, email, password, phoneNumber } = values;
    const userData = {
      name,
      email,
      password,
      phoneNumber,
    };
    signupUser(userData)
      .then(({ data }) => {
        setAuth(data);

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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input name="name" formik={formik} label="Name" />
        <Input name="email" formik={formik} label="Email" type="email" />
        <Input
          name="phoneNumber"
          formik={formik}
          label="Phone Number"
          type="tel"
        />
        <Input
          name="password"
          formik={formik}
          label="Password"
          type="password"
        />
        <Input
          name="passwordConfirm"
          formik={formik}
          label="Password Confirm"
          type="password"
        />
        <button type="submit">Signup</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to={`/login${redirect && `?redirect=${redirect}`}`}>
          <p>Already login ?</p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
