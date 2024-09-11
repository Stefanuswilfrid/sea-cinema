
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import SeatModal from "./Modal/SeatModal";
import LoginModal from "./Modal/LoginModal";
import RegisterModal from "./Modal/RegisterModal";
import TopUpModal from "./Modal/TopUpModal";
import WithdrawModal from "./Modal/WithdrawModal";
import CreateWatchlistModal from "./Modal/CreateWatchlistModal";

const ModalProvider = () => {
 
    return (
        <>
        <TopUpModal/>
        <WithdrawModal/>
        <SeatModal />
      <LoginModal />
      <RegisterModal />
      {/* <CreateWatchlistModal/> */}
      </>
    )
}

export default ModalProvider;
