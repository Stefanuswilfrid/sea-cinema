/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zrSi0Q96F1v
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function Component() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
     
      <main className="flex-1 py-8 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-violet-500 text-primary-foreground p-8 rounded-2xl">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm">Current Balance</p>
                <p className="text-4xl font-bold">$5,234.56</p>
              </div>
              <CreditCardIcon className="w-12 h-12" />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className=" border text-card-foreground p-6 rounded-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div>
                  <p className="text-sm">Top Up</p>
                  <p className="text-2xl font-bold">Add Funds</p>
                </div>
                <button className="flex items-center bg-black text-white py-2 px-4 rounded-md">
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Top Up
                </button>
              </div>
            </div>
            <div className="border text-card-foreground p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Withdraw</p>
                  <p className="text-2xl font-bold">Cash Out</p>
                </div>
                <button className="flex items-center bg-slate-200 text-black py-2 px-4 rounded-md">
                  <MinusIcon className="w-5 h-5 mr-2" />
                  Withdraw
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Recent Transactions</h2>
            <div className="mt-4 space-y-4">
              <div className="border text-card-foreground p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
                    <ShoppingBagIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Amazon Purchase</p>
                    <p className="text-sm text-muted-foreground">Aug 15, 2023</p>
                  </div>
                </div>
                <p className="text-red-500 font-medium">-$54.99</p>
              </div>
              <div className="border text-card-foreground p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
                    <BriefcaseIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Salary Deposit</p>
                    <p className="text-sm text-muted-foreground">Aug 1, 2023</p>
                  </div>
                </div>
                <p className="text-green-500 font-medium">+$3,500.00</p>
              </div>
              <div className="border text-card-foreground p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
                    <MenuIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Restaurant Dinner</p>
                    <p className="text-sm text-muted-foreground">Aug 10, 2023</p>
                  </div>
                </div>
                <p className="text-red-500 font-medium">-$78.23</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  )
}

function BriefcaseIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}


function CreditCardIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}


function MailsIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="13" x="6" y="4" rx="2" />
      <path d="m22 7-7.1 3.78c-.57.3-1.23.3-1.8 0L6 7" />
      <path d="M2 8v11c0 1.1.9 2 2 2h14" />
    </svg>
  )
}


function MenuIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MinusIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}


function PlusIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function ShoppingBagIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}