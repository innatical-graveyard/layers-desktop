import { Dialog, Transition } from "@headlessui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment } from "react";
import { client, trpc } from "../util/trpc";
import { Button } from "./UI/Button";

const AddFriend: React.FC<{ open: boolean; close: () => void }> = ({
  open,
  close,
}) => {
  const addFriend = trpc.useMutation("users.addFriend");
  const utils = trpc.useContext();

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={close}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-modal dark:bg-modal-dark shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                Add Friend
              </Dialog.Title>
              <Formik
                initialValues={{ username: "" }}
                onSubmit={async (values, { setErrors }) => {
                  const search = await client.query("users.user", {
                    username: values.username,
                  });

                  if (!search.ok) {
                    switch (search.error) {
                      case "UserNotFound":
                        setErrors({
                          username:
                            "A user with that username could not be found",
                        });
                      default:
                        return;
                    }
                  }

                  const res = await addFriend.mutateAsync({
                    id: search.user.id,
                  });

                  // TODO: Handle Future Errors, like blocking
                  if (!res.ok) return;

                  await utils.invalidateQuery(["users.friends"]);

                  close();
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mt-2 flex flex-col gap-3">
                      <label htmlFor="id">Username</label>
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
                    </div>

                    <div className="mt-4">
                      <Button
                        type="submit"
                        color="bg-inndigo"
                        disabled={isSubmitting}
                      >
                        Add Friend
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddFriend;
