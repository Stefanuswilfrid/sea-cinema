import SettingsCard from "@/components/AccountSettings/SettingsCard";
import Container from "@/components/Container";
import { motion } from "framer-motion";
import { IdCard, ToggleLeft } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { Banknote } from "lucide-react";


import React from "react";
import AccountHeading from "@/components/AccountSettings/AccountHeading";
import InfoCard from "@/components/AccountSettings/InfoCard";
import { useSession } from "next-auth/react";
import AuthCheck from "@/components/AuthCheck";
import { CurrentUser } from "@/types";

export default function AccountSettings() {
  const buttons: Array<{
    icon: React.ComponentType;
    text: string;
    label: string;
    path: string;
  }> = [
    {
      icon: IdCard,
      text: "Personal info",
      label: "Provide personal details and how we can reach you",
      path: "/account-settings/personal-info",
    },
    {
      icon: ShieldHalf,
      text: "Login & security",
      label: "Update your password and secure your account",

      path: "/",
    },
    {
      icon: Banknote,
      text: "Payments & payouts",
      label: "Review payments, payouts, coupons and gift cards",

      path: "/",
    },
    {
      icon: ToggleLeft,
      text: "Global Preferences",
      label: "Set your default language , currency, and timezone",
      path: "account-settings/preferences",
    },
  ];
  const { data } = useSession();
  const currentUser = data?.user as CurrentUser;
  console.log("curr", currentUser);

  return (
    <AuthCheck>
      <Container>
        <div className="mx-6  sm:max-w-5xl sm:mx-auto">
          <AccountHeading
            name={currentUser?.name!}
            username={currentUser?.username!}
            id={currentUser?.id}
          />

          <InfoCard />

          <div
            className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-2 
            lg:grid-cols-3
            
            sm:gap-5
          "
          >
            {buttons.map((button, index) => {
              return (
                <motion.div
                  key={index}
                  transition={{ type: "tween", duration: 0.4 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <SettingsCard
                    title={button.text}
                    label={button.label}
                    icon={button.icon}
                    path={button.path}
                  />
                  {(index + 1) % 2 === 0 && <hr className="my-6 sm:hidden" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </AuthCheck>
  );
}
