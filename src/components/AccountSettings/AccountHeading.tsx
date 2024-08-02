import Link from "next/link";
import React from "react";

interface AccountHeadingProps {
  id: string;
  name: string;
  username: string;
}

const AccountHeading: React.FC<AccountHeadingProps> = ({ name, username,id }) => {
  return (
    <section className="mt-16 mb-8 sm:mb-14">
      <h1 className="text-4xl font-bold">Account</h1>
      <div className="text-lg leading-6 mt-2">
        <span className="font-bold">{name}</span>
        <span className="font-thin text-gray-600">
          {" "}
          , {username} ·{" "}
        </span>
        <Link className="font-bold underline cursor-pointer" href={`/users/${id}`}> Go To Profile</Link>
      </div>
    </section>
  );
};

export default AccountHeading;
