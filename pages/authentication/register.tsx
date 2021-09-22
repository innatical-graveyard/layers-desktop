import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { Keychain, SymmetricKey } from "@innatical/inncryption";

const Register = () => {
  return (
    <div className="h-screen flex">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={yup.object().shape({
          email: yup.string().email("Invalid email"),
          password: yup
            .string()
            .min(8, "Too short, password must be at least 8 characters."),
          username: yup
            .string()
            .min(3, "Too short, username must be at least 3 characters.")
            .max(16, "Too long, username must be under 16 characters."),
        })}
        onSubmit={async (values) => {
          const keychain = await Keychain.generate();

          const salt = SymmetricKey.generateSalt();
          const key = SymmetricKey.generateFromPassword(values.password, salt);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col m-auto p-10 rounded-lg shadow-md w-1/3">
            <h1 className="text-2xl font-bold mb-3">Octii</h1>
            <label htmlFor="email" className="font-light font-sm mb-1">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="p-3 rounded-lg"
            />
            <ErrorMessage name="email" component="p" className="text-red-500" />

            <label htmlFor="username" className="mt-3 font-light font-sm mb-1">
              Username
            </label>
            <Field name="username" id="username" className="p-3 rounded-lg" />
            <ErrorMessage
              name="username"
              component="p"
              className="text-red-500"
            />

            <label htmlFor="password" className="mt-3 font-light font-sm mb-1">
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className="p-3 rounded-lg"
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
              Register
            </button>
            <Link href="/authentication/login">Registered?</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
