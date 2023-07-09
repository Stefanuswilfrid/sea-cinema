import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg  border-t-[1px]  mt-20">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href={"/"}>
            <Image
              src={"/images/compfest-logo.png"}
              alt=""
              width={40}
              height={40}
            />
            
            </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
            <li className="mr-4  md:mr-6">
                About
            </li>
            <li className="mr-4  md:mr-6">
                Privacy Policy
            </li>
            <li className="mr-4  md:mr-6">
                Licensing
            </li >
            <li className="mr-4  md:mr-6">
                Contact
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center ">
          © 2023{" "}
            SEA- Cinema
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
