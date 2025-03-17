import React from "react";

const MultySelectModal = ({
  options,
  selectedOptions,
  setSelectedOption,
  setModalState,
  top,
  bottom,
  right,
  left,
  optionKey,
  iconKey,
  onClick = "",
}) => {
  return (
    <div
      className={` bg-[var(--dark-bg)] flex flex-col overflow-y-auto gap-1 pt-1 pb-2 px-1 w-[100%] rounded-lg relative z-22`}
      style={{
        position: "absolute",
        bottom: bottom ? bottom : "auto",
        top: top ? top : "auto",
        right: right ? right : "auto",
        left: left ? left : "auto",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      {options.map((option, index) => {
        const isSelected = selectedOptions.includes(option);
        console.log(option);

        return (
          <div
            className={` w-[100%] flex items-center gap-2 cursor-pointer py-1  px-2 text-[14px] ${
              isSelected && "bg-[var(--darker-bg)] font-bold"
            } rounded-sm hover:bg-[var(--darkest-bg)] text-white`}
            key={index}
            onClick={() => {
              setModalState(false);
              if (onClick) {
                onClick(option);
              }
            }}
          >
            <p className=" text-[14px]  text-white">{option}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MultySelectModal;
