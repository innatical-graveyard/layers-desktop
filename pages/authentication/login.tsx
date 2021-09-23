import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as yup from "yup";

const Login = () => {
  return (
    <div className="h-screen flex">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={{
          email: yup.string().email("Invalid email"),
          password: yup
            .string()
            .min(8, "Too short, password must be at least 8 characters."),
        }}
        onSubmit={() => {}}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col m-auto p-10 rounded-lg shadow-md w-1/4">
            <h1 className="text-2xl font-bold mb-3">Octii</h1>
            <label htmlFor="email" className="font-light font-sm mb-1">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="p-3 rounded-lg bg-input-elements dark:bg-input-elements-dark"
            />
            <ErrorMessage name="email" component="p" className="text-red-500" />

            <label htmlFor="password" className="mt-3 font-light font-sm mb-1">
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className="p-3 rounded-lg bg-input-elements dark:bg-input-elements-dark"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="p-3 font-bold bg-inndigo rounded-lg mt-8 mb-3 text-offwhite"
            >
              Login
            </button>
            <Link href="/authentication/register">Not Registered?</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
