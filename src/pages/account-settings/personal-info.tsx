import Breadcrumb from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import { BackRouteButton } from "@/components/Button/RouteButton";
import React from "react";

export default function PersonalInfo() {
  const breadcrumbs = [
    { href: '/account-settings', label: 'Account' },
    { href: '/account-settings/personal-info', label: 'Personal info', current: true },
  ];
  
  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">

<Breadcrumb items={breadcrumbs}/>
          <h1 className="text-4xl font-bold ">Personal Info</h1>

          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <div className="col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div
                  className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
                >
                  <div>Legal Name </div>
                </div>
              </div>
            </div>

            <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
{/* <PersonalFAQ/> */}
            </div>

          </div>
        </div>
      </div>
    </Container>
  );
}
