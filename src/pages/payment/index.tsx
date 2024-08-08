import Container from "@/components/Container";
import SEO from "@/components/SEO";
import React from "react";
import { CartContext } from "@/libs/context";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import AuthCheck from "@/components/AuthCheck";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { CurrentUser } from "@/types";

function Payment() {
  return (
    <AuthCheck>
      <PaymentPage/>
    </AuthCheck>
  )
  
}

function PaymentPage(){
  const { data: session, status , update} = useSession();
  const router = useRouter();

  const { cartItems, addToCart,totalPrice,resetCart } = useContext(CartContext);
  const currentUsername = session?.user as CurrentUser;

  const handlePayment = async() => {
    if(currentUsername.balance>=totalPrice){
      try{
        await axios.post('/api/transaction/create', {username: currentUsername.username,cartItems,totalPrice})
        .then( async () => {
          await update({
            user: {
              balance: -totalPrice,
            },
          });
          
          toast.success('Payment Successful!');

          resetCart()
          
          router.push("/")

        })
        .catch((error) => {
          toast.error(error.response.data.error);
        })
        

      } catch(err){

      }
    }
    else {
      toast.error("Balance insufficient, cancel this order or top up your balance first!");
    }
    
  }

  const handleCancelOrder = () =>{
    resetCart()
    router.push("/")
  }

  return (
    <Container>
      <SEO title="User Payment Page | SEA Cinema" desc="SEA Cinema User." />
      <div className="my-12 relative mx-auto w-full bg-white border rounded-lg">
        <div className="grid min-h-min grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 ">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Payment Checkout
                <span className="mt-2 block h-1 w-10 bg-violet-500 sm:w-20"></span>
              </h1>
              <form action="" className="mt-10 flex flex-col space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Username
                  </label>
                  <div
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm 
                  placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 
                  text-gray-400"
                  >
                    {session?.user?.name}
                  </div>
                  
                </div>
                <div className="relative">
                  <label
                    htmlFor="card-number"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Card number
                  </label>
                  <div
                    className="block w-full 
                    rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm 
                    placeholder-gray-300 shadow-sm outline-none transition focus:ring-2  text-gray-400
                    "
                  >

                    XXXX-XXXX-XXXX-XXXX

                  </div>
                  
                </div>
                
                
              </form>
              <p className="mt-16 text-center text-sm font-semibold text-gray-500">
                By placing this order you agree to the{" "}
                <a
                  href="#"
                  className="whitespace-nowrap text-violet-500 underline hover:text-violet-600"
                >
                  Terms and Conditions
                </a>
              </p>
              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center 
            rounded bg-violet-500 py-2.5 px-4 text-base font-semibold tracking-wide text-white 
            outline-none ring-offset-2 transition hover:scale-110 duration-300 focus:ring-2 focus:ring-violet-500 sm:text-lg"
              onClick={handlePayment}
              
              >
                Place Order
              </button>

              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center 
            rounded  py-2.5 px-4 text-base font-semibold tracking-wide text-violet-500 
            outline-none ring-offset-2 transition hover:scale-110 duration-300 focus:ring-2 focus:ring-violet-500 sm:text-lg"
              onClick={handleCancelOrder}
              
              >
                Cancel Order
              </button>
            </div>
          </div>
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 className="sr-only">Order summary</h2>
            <div>
              <div className="absolute inset-0 h-full w-full bg-violet-600 pr-5"></div>
            </div>
            <div className="relative">
              <ul className="space-y-5">
                {cartItems.map((item) => (
                  <li className="flex justify-between pr-4">
                  <div className="inline-flex ">
                    <div className="ml-3 ">
                      <p className="text-base font-semibold text-white ">
                        {item.quantity} X {item.name} 
                      </p>
                      <p className="text-sm font-medium text-white text-opacity-80">
                        Movie Ticket
                      </p>
                      
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">${item.price}</p>
                </li>
                ) 
                   
                )}
                
              </ul>
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2 pr-4">
                <p className="flex justify-between text-lg font-bold text-white">
                  <span>Total price:</span>
                  <span>${totalPrice}</span>
                </p>
                
              </div>
            </div>
            
            <div className="relative mt-10 flex">
              <p className="flex flex-col">
                <span className="text-sm font-bold text-white">
                  Money Back Guarantee
                </span>
                <span className="text-xs font-medium text-white">
                  within 30 days of purchase
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );

}

export default Payment;
