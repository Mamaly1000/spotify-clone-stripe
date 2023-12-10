import CustomHeader from "../Header";
import AccountContent from "./components/AccountContent";

const Account = () => {
  return (
    <main className="relative min-w-full max-w-full flex flex-col bg-gradient-to-b from-primary to-secondary items-start justify-start  min-h-screen overflow-auto max-h-screen">
      <CustomHeader /> 
      <AccountContent />
    </main>
  );
};

export default Account;
