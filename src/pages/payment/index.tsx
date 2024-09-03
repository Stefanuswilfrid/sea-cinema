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
import { useUser } from "@/hooks/useUser";
const products = [
  {
    id: 1,
    name: "Women's Basic Tee",
    href: '#',
    price: '$32.00',
    color: 'Gray',
    size: 'S',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-05-product-01.jpg',
    imageAlt: "Front of women's basic tee in heather gray.",
  },
  // More products...
]
function Payment() {
  return (
    <AuthCheck>
      <PaymentPage/>
    </AuthCheck>
  )
  
}

function PaymentPage(){
  const { user: currentUser } = useUser();
  const router = useRouter();

  const { cartItems, addToCart,totalPrice,resetCart } = useContext(CartContext);
  // const currentUsername = session?.user as CurrentUser;

  // const handlePayment = async() => {
  //   if(currentUsername.balance>=totalPrice){
  //     try{
  //       await axios.post('/api/transaction/create', {username: currentUsername.username,cartItems,totalPrice})
  //       .then( async () => {
  //         await update({
  //           user: {
  //             balance: -totalPrice,
  //           },
  //         });
          
  //         toast.success('Payment Successful!');

  //         resetCart()
          
  //         router.push("/")

  //       })
  //       .catch((error) => {
  //         toast.error(error.response.data.error);
  //       })
        

  //     } catch(err){

  //     }
  //   }
  //   else {
  //     toast.error("Balance insufficient, cancel this order or top up your balance first!");
  //   }
    
  // }

  const handleCancelOrder = () =>{
    resetCart()
    router.push("/")
  }
  const handlePayNow = () => {
    alert('Payment initiated!');
  };

  return (
    <Container>
      <SEO title="User Payment Page | SEA Cinema" desc="SEA Cinema User." />
      
      <div className="bg-white">


      <main className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 sm:pb-1 sm:pt-10 lg:px-8 xl:px-2 xl:pt-14">

        <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-2 pt-8">
          <div className="mx-auto w-full max-w-lg">
            <h2 className="sr-only">Order summary</h2>

            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex space-x-6 py-6">
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                    />
                    <div className="flex-auto">
                      <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                        <div className="flex-auto space-y-1 text-sm font-medium">
                          <h3 className="text-gray-900">
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className="text-gray-900">{product.price}</p>
                          <p className="hidden text-gray-500 sm:block">{product.color}</p>
                          <p className="hidden text-gray-500 sm:block">{product.size}</p>
                        </div>
                        <div className="flex flex-none space-x-4">
                          <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Edit
                          </button>
                          <div className="flex border-l border-gray-300 pl-4">
                            <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">$104.00</dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="text-gray-900">$8.32</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="text-gray-900">$14.00</dd>
              </div>
              <div className="flex justify-between">
                <dt>Insurance</dt>
                <dd className="text-green-500">YES</dd>
              </div>
              <div className="flex justify-between">
                <dt>Refundable</dt>
                <dd className="text-red-500">NO</dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-base">Total</dt>
                <dd className="text-base text-primary">$126.32</dd>
              </div>
            </dl>
          </div>

          <div className="mx-auto w-full max-w-lg">


           

            <form className="">
              <h2 className="text-lg font-medium text-gray-900">Payment Details</h2>

              <div className="mt-6">
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Current Balance
                </label>
                <div className="mt-1">
                  $ {currentUser.balance}
                  {/* <input
                    id="email-address"
                    name="email-address"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  /> */}
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <label htmlFor="terms" className="text-sm text-gray-500">
                  Terms and Conditions
                </label>
              </div>

              <button
                type="submit"
                disabled
                className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
              >
                Continue
              </button>
            </form>

          </div>
        </div>
      </main>
    </div>
      
 





    </Container>
  );

}

export default Payment;
