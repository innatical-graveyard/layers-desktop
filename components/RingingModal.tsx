import { faPhone, faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { trpc } from "../util/trpc";
import Voice from "../util/voice";
import { IconButton } from "./UI/IconButton";

const RingingModal = () => {
  const { ringing, decline, acceptDMCall } = Voice.useContainer();

  const channel = trpc.useQuery(["channels.channel", { id: ringing! }], {
    enabled: !!ringing,
  });

  const user = trpc.useQuery(
    [
      "users.user",
      {
        id:
          !!channel.data?.ok && channel.data.type === "DM"
            ? channel.data.to
            : "",
      },
    ],
    {
      enabled: !!channel.data?.ok && channel.data.type === "DM",
    }
  );

  return (
    <Transition appear show={!!ringing} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={decline}
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
            <div className="inline-block w-full max-w-xs p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl bg-card dark:bg-card-dark">
              <div className="flex flex-col items-center">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold leading-6 mb-3"
                >
                  Incoming Call
                </Dialog.Title>
                <img
                  src={user.data?.ok ? user.data.user.avatar : ""}
                  className="w-32 h-32 mb-3 rounded-xl"
                />

                <h1>{user.data?.ok ? user.data.user.username : ""}</h1>

                <div className="mt-4 flex w-full gap-3 h-10">
                  <IconButton
                    icon={faPhoneSlash}
                    onClick={decline}
                    color={"bg-danger"}
                    className="flex-1"
                  />

                  <IconButton
                    icon={faPhone}
                    onClick={() => acceptDMCall({ channelID: ringing! })}
                    color={"bg-inndigo"}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RingingModal;
