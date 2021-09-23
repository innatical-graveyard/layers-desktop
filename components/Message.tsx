const Message = () => {
  return (
    <div className="flex gap-3">
      <img
        src="https://cdn.discordapp.com/attachments/888219204417896488/890094423617204254/Screen_Shot_2021-09-21_at_11.37.25_PM.png"
        className="rounded-xl object-cover w-12 h-12"
      />

      <div className="flex flex-col">
        <p className="font-bold">
          Lleyton{" "}
          <span className="text-secondary font-normal ml-2">
            Today at 3:00am
          </span>
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi dicta
          error illum natus nam inventore ex consequuntur recusandae eos
          temporibus, perspiciatis nobis quibusdam corporis consectetur debitis
          esse aliquid amet odit?
        </p>
      </div>
    </div>
  );
};

export default Message;
