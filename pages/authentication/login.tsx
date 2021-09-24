import {
  JsonWebKeyChain,
  Keychain,
  SignedMessage,
  SymmetricKey,
} from "@innatical/inncryption";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { usePublicOnlyPage } from "../../util/auth";
import { client, trpc } from "../../util/trpc";
import Auth from "../../util/auth";

const Login = () => {
  usePublicOnlyPage();

  const { setToken, setKeychain } = Auth.useContainer();

  const login = trpc.useMutation("users.login");

  return (
    <div className="h-screen flex">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={yup.object().shape({
          email: yup.string().email("Invalid email"),
          password: yup
            .string()
            .min(8, "Too short, password must be at least 8 characters."),
        })}
        onSubmit={async (values, { setErrors }) => {
          const challange = await client.query("users.challenge", {
            email: values.email,
          });

          if (!challange.ok) {
            switch (challange.error) {
              case "UserNotFound":
                setErrors({
                  email: "A user with that email could not be found",
                });
              default:
                return;
            }
          }

          const key = await SymmetricKey.generateFromPassword(
            values.password,
            challange.salt
          );

          let signed: SignedMessage;
          let keychain: Keychain;

          try {
            keychain = await Keychain.fromJWKChain(
              (await key.decrypt(
                challange.encryptedKeychain
              )) as JsonWebKeyChain
            );

            signed = await keychain.signing.sign(challange.challenge);
          } catch {
            setErrors({
              password: "Invalid password",
            });
            return;
          }

          const res = await login.mutateAsync({
            email: values.email,
            signedChallenge: signed,
          });

          if (!res.ok) {
            switch (res.error) {
              case "UserNotFound":
                setErrors({
                  email: "A user with that email could not be found",
                });
              case "InvalidSignature":
                setErrors({
                  password: "Invalid password",
                });
              default:
                return;
            }
          }

          setToken(res.token);
          setKeychain(keychain);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col m-auto p-10 rounded-lg shadow-md w-1/4">
            <h1 className="text-2xl font-bold mb-3">Isometric Chat</h1>
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
