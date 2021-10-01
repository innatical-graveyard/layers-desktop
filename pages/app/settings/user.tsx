import { Formik, Form, Field, ErrorMessage } from "formik";
import SettingsSidebar from "../../../components/SettingsSidebar";
import { trpc } from "../../../util/trpc";
import * as yup from "yup";
import { useAuthedPage } from "../../../util/auth";
import React, { useEffect, useRef, useState } from "react";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import Auth from "../../../util/auth";
import { IconButton } from "../../../components/UI/IconButton";
import { Button } from "../../../components/UI/Button";
import { NavigationStack } from "../../../components/NavigationStack";

const User = () => {
  useAuthedPage();

  const { token } = Auth.useContainer();
  const me = trpc.useQuery(["users.me"]);
  const update = trpc.useMutation("users.update");
  const utils = trpc.useContext();
  const [icon, setIcon] = useState<string | undefined>(
    me.data?.ok ? me.data?.user?.avatar : undefined
  );
  const input = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (!me.data || !me.data.ok) return;
    if (icon !== me.data.user.avatar) setIcon(me.data.user.avatar);
  }, [me.data?.ok]);
  if (!me.data || !me.data.ok) return <></>;

  return (
    <NavigationStack
      sidebar={SettingsSidebar}
      backUrl="/app/settings"
      mainContent={({ backButton: BackButton }) => (
        <div className="p-3 sm:m-auto sm:w-1/3">
          <div className="flex mb-2">
            <BackButton />
            <h1 className="ml-2 font-bold text-2xl">Profile</h1>
          </div>
          <div className="bg-card dark:bg-card-dark rounded-xl p-5">
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
                avatar: yup.string().url("Invalid URL"),
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
                  avatar:
                    values.avatar !== me.data.user.avatar
                      ? values.avatar
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
              {({ isSubmitting, setFieldValue, values }) => (
                <Form className="flex flex-col gap-3">
                  <label htmlFor="">Avatar</label>
                  <div className="p-5 dark:bg-input-elements-dark rounded-lg flex items-center">
                    {me.data.ok && (
                      <img
                        src={values.avatar}
                        className="rounded-xl object-cover w-12 h-12"
                      />
                    )}
                    <div className="ml-2">
                      <p className="text-sm">
                        Recommended icon size is 100x100
                      </p>
                      <h6 className="text-md font-bold">
                        Max image size is 16mb
                      </h6>
                    </div>

                    <IconButton
                      icon={faFileUpload}
                      color="bg-inndigo"
                      className="ml-auto w-12 h-12"
                      onClick={() => input.current?.click()}
                      disabled={isUploading}
                    />

                    <input
                      className="hidden"
                      ref={input}
                      type="file"
                      accept=".jpg, .png, .jpeg, .gif"
                      onChange={async (event) => {
                        setIsUploading(true);
                        if (
                          !event.target.files ||
                          event.target.files.length <= 0 ||
                          event.target.files.length > 1
                        )
                          return;
                        const image = event.target.files.item(0);
                        if (!image) return;
                        const formData = new FormData();
                        formData.append("file", image);
                        const res = await fetch(
                          "https://api.cdn.isometric.chat/upload/avatar",
                          {
                            method: "POST",
                            body: formData,
                            headers: {
                              Authorization: token!,
                            },
                          }
                        );
                        const json = await res.json();

                        setFieldValue(
                          "avatar",
                          "https://layers.fra1.cdn.digitaloceanspaces.com/" +
                            json.id
                        );
                      }}
                    />
                  </div>

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

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    color="bg-inndigo"
                    className="rounded-lg mb-3"
                    height="tall"
                  >
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    />
  );
};

export default User;
