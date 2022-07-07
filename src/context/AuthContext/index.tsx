import { FC, useEffect, useState, createContext } from "react";
import { useCookies } from "react-cookie";

const AUTH_TOKEN = "AUTH_TOKEN";

const sessionStore = window.sessionStorage;

const AuthContext = createContext({});

const AuthProvider: FC = (props) => {
  const { children } = props;

  const walletInSession = sessionStore.getItem("wallet_address");

  const [tonWalletAddress, setTonWalletAddress] = useState<string>(
    walletInSession ? walletInSession : ""
  );
  const [currentSignature, setCurrentSignature] = useState<string>("");

  const [cookies] = useCookies([AUTH_TOKEN]);

  const authToken = cookies.AUTH_TOKEN;
  const [isSigned, setIsSigned] = useState(authToken && true);

  useEffect(() => {
    if (!authToken) {
      setIsSigned(false);
    }
  }, [authToken]);

  const updateAuthData = (walletAddress: string, signature: string) => {
    setTonWalletAddress(walletAddress);
    setCurrentSignature(signature);

    if (signature) {
      setIsSigned(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isSigned,
        tonWalletAddress,
        currentSignature,
        updateAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
