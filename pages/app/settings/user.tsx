import { Formik, Form, Field, ErrorMessage } from "formik";
import SettingsSidebar from "../../../components/SettingsSidebar";
import { trpc } from "../../../util/trpc";
import * as yup from "yup";
import { useAuthedPage } from "../../../util/auth";

const User = () => {
  useAuthedPage();

  const me = trpc.useQuery(["users.me"]);
  const update = trpc.useMutation("users.update");
  const utils = trpc.useContext();

  if (!me.data || !me.data.ok) return <></>;

  return (
    <>
      <SettingsSidebar />
      <div className="m-auto w-1/3">
        <h1 className="font-bold text-2xl">Profile</h1>
        <div className="bg-card dark:bg-card-dark rounded-lg p-5">
          <Formik
            initialValues={{
              username: me.data.user.username,
              avatar: me.data.user.avatar,
              email: me.data.user.email,
            }}
            validationSchema={yup.object().shape({
              email: yup.string().email("Invalid email"),
              username: yup
                .string()
                .min(3, "Too short, username must be at least 3 characters.")
                .max(16, "Too long, username must be under 16 characters."),
            })}
            onSubmit={async (values, { setErrors }) => {
              if (!me.data.ok) return;
              const res = await update.mutateAsync({
                username:
                  values.username !== me.data.user.username
                    ? values.username
                    : undefined,
                email:
                  values.email !== me.data.user.email
                    ? values.email
                    : undefined,
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

              await utils.invalidateQuery(["users.me"]);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-3">
                {/* <label htmlFor="">Avatar</label>
                <Field
                  name="avatar"
                  id="avatar"
                  className="p-3 rounded-lg dark:bg-input-elements-dark"
                />
                <ErrorMessage
                  name="avatar"
                  component="p"
                  className="text-red-500"
                /> */}

                <label htmlFor="username">Username</label>
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

                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="p-3 rounded-lg dark:bg-input-elements-dark"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500"
                />

                <button
                  type="submit"
                  className="p-3 font-bold bg-inndigo rounded-lg mb-3 text-offwhite"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default User;
