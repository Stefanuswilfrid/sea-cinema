import Container from "@/components/Container";
import SEO from "@/components/SEO";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@/libs/context";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import AuthCheck from "@/components/AuthCheck";
import { useMutation } from "@/hooks/useMutation";
import { apiClient } from "@/libs/utils/api-client";

// Helper function to fetch products from localStorage
const getProductsFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedProducts = localStorage.getItem('checkouts');
    return storedProducts ? JSON.parse(storedProducts) : [];
  }
  return [];
};

// Helper function to save products back to localStorage
const saveProductsToLocalStorage = (products: any[]) => {
  localStorage.setItem('checkouts', JSON.stringify(products));
};

function Payment() {
  return (
    <AuthCheck>
      <PaymentPage />
    </AuthCheck>
  );
}

function PaymentPage() {
  const { trigger, isMutating } = useMutation('/transaction/ticket', async (url, payload) => {
    return await apiClient.post(url, payload);
  });
  
  const { user: currentUser } = useUser();
  const router = useRouter();
  // const { resetCart } = useContext(CartContext);
  
  // State to store fetched products from localStorage
  const [products, setProducts] = useState<any[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false); // For handling terms and conditions

  // Calculate subtotal and total
  const subtotal = products.reduce((sum, product) => sum + product.totalPrice, 0);
  const additionalFees = 22.32; // Example of additional fees
  const total = subtotal > 0 ? subtotal + additionalFees : 0;

  useEffect(() => {
    // Fetch products from localStorage
    const storedProducts = getProductsFromLocalStorage();
    setProducts(storedProducts);
  }, []);

  const handleRemove = (movieName: string) => {
    const updatedProducts = products.filter(product => product.movieName !== movieName);
    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts);
    toast.success(`${movieName} removed from the cart.`);
  };

  const mapSeatLabelToNumber = (seat: string): number => {
    const row = seat.charCodeAt(0) - 65; // Convert "A" to 0, "B" to 1, etc.
    const seatNumber = parseInt(seat.slice(1), 10); // Convert "5" to 5, etc.
    return row * 10 + seatNumber; // Example calculation, can be customized
  };

  const handlePayNow = () => {
    if (currentUser.balance < total) {
      toast.error("Insufficient balance. Please top up.");
      return;
    }

    const payload = {
      userId: currentUser.id,
      totalCost: total,
      transactions: products.map(product => ({
        
        movieName: product.movieName,
        seats: product.seats, // Convert seat labels to numbers
        totalPrice: product.totalPrice,
        movieUrl: product.movieUrl
      })),
    };

    try {
      trigger(payload);
      toast.success("Payment successful!");
      // localStorage.removeItem("checkouts")
      alert('Payment initiated!');
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    }


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
                  {products.length > 0 ? (
                    products.map((product: any) => (
                      <li key={product.movieName} className="flex space-x-6 py-6">
                        <img
                          alt={product.movieName}
                          src={product.movieUrl}
                          className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                        />
                        <div className="flex-auto">
                          <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                            <div className="flex-auto space-y-1 text-sm font-medium">
                              <h3 className="text-gray-900">
                                <a href={product.href}>{product.movieName}</a>
                              </h3>
                              <p className="text-gray-900">$ {product.totalPrice}</p>
                              <p className="flex gap-2 text-gray-500">SEAT:
                                {product.seats.map((seat: string) => (
                                  <span key={seat}>{seat}</span>
                                ))}
                              </p>
                            </div>
                            <div className="flex flex-none space-x-4">
                              <div className="flex border-l border-gray-300 pl-4">
                                <button
                                  type="button"
                                  onClick={() => handleRemove(product.movieName)}
                                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>No products found in the cart.</p>
                  )}
                </ul>
              </div>

              <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">${subtotal.toFixed(2)}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Additional Fees</dt>
                  <dd className="text-gray-900">${additionalFees.toFixed(2)}</dd>
                </div>
                
                <div className="flex justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base text-primary">${total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>

            <div className="mx-auto w-full max-w-lg">
              <form className="">
                <h2 className="text-lg font-medium text-gray-900">Payment Details</h2>

                <div className="mt-6">
                  <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
                    Current Balance
                  </label>
                  <div className="mt-1">$ {currentUser.balance.toFixed(2)}</div>
                </div>

                <div className="mt-6 flex space-x-2">
                  <div className="flex h-5 items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <label htmlFor="terms" className="text-sm text-gray-500">
                    Terms and Conditions
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handlePayNow}
                  disabled={products.length === 0 || !termsAccepted || currentUser.balance < total}
                  className={`mt-6 w-full rounded-md border border-transparent ${
                    products.length === 0 || !termsAccepted || currentUser.balance < total
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  } px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
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
