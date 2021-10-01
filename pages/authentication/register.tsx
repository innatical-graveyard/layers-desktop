import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { Keychain, SymmetricKey } from "@innatical/inncryption";
import { trpc } from "../../util/trpc";
import Auth, { usePublicOnlyPage } from "../../util/auth";
import React from "react";
import { Button } from "../../components/UI/Button";

const Register = () => {
  usePublicOnlyPage();

  const { updateToken, setKeychain } = Auth.useContainer();
  const register = trpc.useMutation("users.register");

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
        onSubmit={async (values, { setErrors }) => {
          const keychain = await Keychain.generate();

          const salt = SymmetricKey.generateSalt();
          const key = await SymmetricKey.generateFromPassword(
            values.password,
            salt
          );

          const res = await register.mutateAsync({
            username: values.username,
            email: values.email,
            encryptedKeychain: await key.encrypt(await keychain.toJWKChain()),
            publicKeychain: await keychain.toJWKPublicChain(),
            salt,
          });

          if (!res.ok) {
            switch (res.error) {
              case "UsernameTaken":
                return setErrors({
                  username: "This username is already in use",
                });
              case "EmailInUse":
                return setErrors({
                  email: "This email is already in use",
                });
              default:
                return;
            }
          }
          updateToken(res.token);
          setKeychain(keychain);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col m-auto p-10 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold mb-3">Isometric Chat</h1>
            <label htmlFor="email" className="font-light font-sm mb-1">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="p-3 rounded-lg dark:bg-input-elements-dark"
            />
            <ErrorMessage name="email" component="p" className="text-red-500" />

            <label htmlFor="username" className="mt-3 font-light font-sm mb-1">
              Username
            </label>
            <Field
              name="username"
              id="username"
              className="p-3 rounded-lg dark:bg-input-elements-dark"
            />
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
              className="p-3 rounded-lg dark:bg-input-elements-dark"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500"
            />

            <Button
              type="submit"
              className="rounded-lg"
              height="tall"
              color="bg-inndigo"
              disabled={isSubmitting}
            >
              Register
            </Button>
            <Link href="/authentication/login">Registered?</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
