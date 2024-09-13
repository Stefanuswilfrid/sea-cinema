
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import LoginModal from "./Modal/LoginModal";
import RegisterModal from "./Modal/RegisterModal";
import TopUpModal from "./Modal/TopUpModal";
import WithdrawModal from "./Modal/WithdrawModal";
import SelectInterestModal from "./Modal/SelectInterestModal";

const ModalProvider = () => {
 
    return (
        <>
        <TopUpModal/>
        <WithdrawModal/>
      <LoginModal />
      <RegisterModal />
      <SelectInterestModal/>
      </>
    )
}

export default ModalProvider;
