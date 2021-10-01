import AddFriend from "../../components/AddFriend";
import FriendCard from "../../components/FriendCard";
import { trpc } from "../../util/trpc";
import { useState } from "react";
import { serverAuthedPage } from "../../util/auth";
export const getServerSideProps = serverAuthedPage;

const Friends = () => {
  const friends = trpc.useQuery(["users.friends"]);
  const [addFriend, setAddFriend] = useState(false);

  return (
    <>
      <AddFriend open={addFriend} close={() => setAddFriend(false)} />
      <div className="p-8 flex-1">
        <div className="flex items-center ml-3 mb-5">
          <h1 className="text-3xl font-bold">Friends</h1>
          <button
            type="button"
            className="px-3 py-2 font-bold bg-inndigo rounded-xl text-offwhite self-right ml-auto"
            onClick={() => setAddFriend(true)}
          >
            Add Friend
          </button>
        </div>
        {friends.data?.ok && (
          <>
            <div className="flex flex-col">
              {friends.data.friends.map((id) => (
                <FriendCard key={id} userId={id} type="friend" />
              ))}
            </div>

            {friends.data.incoming.length > 0 && (
              <h2 className="ml-3 mt-3 mb-1">Incoming</h2>
            )}
            <div className="flex flex-col">
              {friends.data.incoming.map((id) => (
                <FriendCard key={id} userId={id} type="incoming" />
              ))}
            </div>

            {friends.data.outgoing.length > 0 && (
              <h2 className="ml-3 mt-3 mb-1">Outgoing</h2>
            )}
            <div className="flex flex-col">
              {friends.data.outgoing.map((id) => (
                <FriendCard key={id} userId={id} type="outgoing" />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Friends;
