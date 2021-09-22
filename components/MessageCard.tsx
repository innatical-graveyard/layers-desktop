import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const MessageCard = () => {
  return (
    <div className="flex gap-3 w-full items-center">
      <img
        src="https://cdn.discordapp.com/attachments/888219204417896488/890094423617204254/Screen_Shot_2021-09-21_at_11.37.25_PM.png"
        className="rounded-lg object-cover w-12 h-12"
      />
      <div className="flex flex-col">
        <p className="font-bold">Lleyton</p>
        <p className="font-light text-xs">Let's get to work!</p>
      </div>
      <FontAwesomeIcon icon={faChevronRight} className="ml-auto" />
    </div>
  );
};

export default MessageCard;
