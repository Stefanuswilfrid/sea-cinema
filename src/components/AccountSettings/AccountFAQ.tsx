import React, { ReactElement } from "react";

interface AccountFAQProps {
  title: string;
  description: string;
  icon: ReactElement<any, any>;
}

//const SettingsCard: React.FC<SettingsCardProps> = ({ title, label, icon: IconComponent ,path}) => {

const AccountFAQ: React.FC<AccountFAQProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div
      className="
    bg-white 
      rounded-md 
      border-[1px]
    border-neutral-200 
      overflow-hidden
    "
    >
      <div
        className="
    flex flex-col items-start gap-1 p-5"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[40px] w-[40px] block fill-current text-yellow-600"
          role="presentation"
          aria-hidden="true"
          focusable="false"
        >
          <path d="m21.31 5.91a1.31 1.31 0 1 1 -1.31-1.31 1.31 1.31 0 0 1 1.31 1.31zm-8.31 9.69a1.31 1.31 0 1 0 1.31 1.31 1.31 1.31 0 0 0 -1.31-1.31zm-7-11a1.31 1.31 0 1 0 1.31 1.31 1.31 1.31 0 0 0 -1.31-1.31z"></path>
          <path d="m22 6.5a2.5 2.5 0 0 1 -2 2.45v13.55a.5.5 0 0 1 -1 0v-13.55a2.5 2.5 0 0 1 0-4.9v-2.55a.5.5 0 0 1 1 0v2.56a2.44 2.44 0 0 1 .33.09.5.5 0 0 1 -.33.94h-.01a1.45 1.45 0 0 0 -.99.01 1.49 1.49 0 0 0 0 2.82 1.4 1.4 0 0 0 1 0 1.5 1.5 0 0 0 1-1.41 1.48 1.48 0 0 0 -.09-.52.5.5 0 0 1 .94-.35 2.5 2.5 0 0 1 .16.87zm-7.8 9.83a.5.5 0 0 0 -.29.64 1.48 1.48 0 0 1 .09.52 1.5 1.5 0 0 1 -1 1.41 1.4 1.4 0 0 1 -1 0 1.49 1.49 0 0 1 0-2.82 1.48 1.48 0 0 1 .5-.09 1.52 1.52 0 0 1 .5.08h.01a.5.5 0 0 0 .32-.94 2.46 2.46 0 0 0 -.32-.08v-13.56a.5.5 0 0 0 -1 0v13.55a2.5 2.5 0 0 0 0 4.9v2.55a.5.5 0 0 0 1 0v-2.55a2.5 2.5 0 0 0 1.84-3.32.5.5 0 0 0 -.64-.29zm-7-11a .5.5 0 0 0 -.29.64 1.48 1.48 0 1 1 -1.41-.98 1.47 1.47 0 0 1 .49.08h.01a.5.5 0 0 0 .33-.94 2.44 2.44 0 0 0 -.33-.09v-2.56a.5.5 0 0 0 -1 0v2.55a2.5 2.5 0 0 0 0 4.9v13.55a.5.5 0 0 0 1 0v-13.55a2.5 2.5 0 0 0 1.84-3.32.5.5 0 0 0 -.64-.29z"></path>
        </svg>

        <div className="text-xl font-semibold mt-3">{title}</div>

        <div className="font-light text-neutral-600">{description}</div>

      </div>
    </div>
  );
};
export default AccountFAQ;