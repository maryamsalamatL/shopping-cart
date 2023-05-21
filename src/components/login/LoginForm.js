import Input from "../../common/Input";
import { useFormik } from "formik";
import { object, string, ref, array, boolean, number } from "yup";
import { Link } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = object({
  name: string().required("name is required"),
  email: string().email("Invalid email format").required("email is required"),
  password: string()
    .required("password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

const LoginForm = () => {
  const onSubmit = (values) => {};
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
        <Link to="/signup">
          <p>Not singup yet ?</p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
