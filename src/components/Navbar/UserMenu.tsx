"use client";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { getServerSession } from "next-auth";


// interface UserMenuProps {
//   currentUser?: SafeUser | null
// }

// export async function getSession() {
//   return await getServerSession(authOptions)
// }

const UserMenu =  () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const { data: session, status } = useSession();
  console.log("se", session);
  console.log("st", status);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >{status== "authenticated" ? <>Hi, {session?.user?.name}</>:""}</div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />

          <div className="hidden md:block">
            <Avatar src={null} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[10vw]
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
            z-50
          "
        >
          <div className="flex flex-col cursor-pointer">
            {status == "authenticated" ? (
              <>
                <MenuItem
                  label="My Balance"
                  onClick={() => router.push("/balance")}
                />
                
                <MenuItem
                  label="Transactions history"
                  onClick={() => router.push("/history")}
                />
               
                <MenuItem label="Log out" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <hr />
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem
                  label="Register"
                  onClick={registerModal.onOpen}
                />{" "}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
