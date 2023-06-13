import { noop } from "lodash";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

type AuthenticationStatus = "loading" | "authenticated" | "not-authenticated";

interface Authentication {
  status: AuthenticationStatus;
  token: string | null;
  actions: {
    signIn: (claim: string) => void;
    signOut: () => void;
  };
}

const AuthenticationContext = createContext<Authentication>({
  status: "loading",
  token: null,
  actions: {
    signIn: () => noop(),
    signOut: () => noop(),
  },
});

const useAuthentication = () => useContext(AuthenticationContext);

interface AuthenticationProviderProps extends PropsWithChildren {
  product: {
    key: string;
    gatewayUrl: string;
  };
}

const AuthenticationProvider = ({
  children,
  product,
}: AuthenticationProviderProps) => {
  const authTokenKey = `labset.${product.key}.auth`;

  const [status, setStatus] = useState<AuthenticationStatus>("loading");
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(authTokenKey)
  );

  const signIn = (claim: string) => {
    if (status !== "loading") return;
    fetch(`${product.gatewayUrl}/auth/claim/token`, {
      credentials: "include",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ claim }),
    }).then(({ headers }) => {
      const auth = headers.get(`x-labset-${product.key}-auth-token`);
      if (auth === null) {
        setToken(null);
        setStatus("not-authenticated");
        localStorage.removeItem(authTokenKey);
      } else {
        setToken(auth);
        setStatus("authenticated");
        localStorage.setItem(authTokenKey, auth);
      }
    });
  };

  const signOut = () => {
    fetch(`${product.gatewayUrl}/auth/sign-out`, {
      method: "GET",
      cache: "no-cache",
      credentials: "include",
    }).then(() => {
      setToken(null);
      setStatus("not-authenticated");
      localStorage.removeItem(authTokenKey);
      location.href = "/";
    });
  };

  const value = useMemo(() => {
    return { status, token, actions: { signIn, signOut } };
  }, [status, token]);

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export {
  AuthenticationProvider,
  Authentication,
  AuthenticationStatus,
  useAuthentication,
};
