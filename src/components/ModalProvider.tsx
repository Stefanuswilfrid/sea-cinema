
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import SeatModal from "./Modal/SeatModal";
import LoginModal from "./Modal/LoginModal";
import RegisterModal from "./Modal/RegisterModal";

const ModalProvider = () => {
 
    return (
        <>
        <SeatModal />
      <LoginModal />
      <RegisterModal />
      </>
    )
}

export default ModalProvider;
