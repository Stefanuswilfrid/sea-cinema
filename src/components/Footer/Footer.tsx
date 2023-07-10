import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../Container";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg  border-t-[1px]  mt-20">
      <Container>

      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex items-center flex-col md:flex md:flex-row md:items-center md:justify-between">
          <Link href={"/"}>
            <Image
              src={"/images/compfest-logo.png"}
              alt=""
              width={40}
              height={40}
              className="mb-4 md:mb-0"
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
        <span className="block text-sm text-gray-500 text-center ">
          © 2023{" "}
            SEA- Cinema
          . All Rights Reserved.
        </span>
      </div>
      </Container>
    </footer>
  );
}
