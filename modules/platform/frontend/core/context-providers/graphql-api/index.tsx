import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { NormalizedCacheObject } from "@apollo/client";
import { useAuthentication } from "@labset-platform-frontend-core/authentication-context-provider";
import React, { createContext, PropsWithChildren, useMemo } from "react";

interface GraphqlApi {
  client: ApolloClient<NormalizedCacheObject>;
}

const GraphqlApiContext = createContext<GraphqlApi>({
  client: new ApolloClient({ cache: new InMemoryCache() }),
});

interface GraphqlApiProviderProps extends PropsWithChildren {
  clientFactory: (token?: string) => ApolloClient<NormalizedCacheObject>;
}

const GraphqlApiProvider = ({
  children,
  clientFactory,
}: GraphqlApiProviderProps) => {
  const { token } = useAuthentication();

  const value = useMemo(() => {
    const authToken = token === null ? undefined : token;
    return { client: clientFactory(authToken) };
  }, [token]);

  return (
    <GraphqlApiContext.Provider value={value}>
      <ApolloProvider client={value.client}>{children}</ApolloProvider>
    </GraphqlApiContext.Provider>
  );
};

export { GraphqlApiProvider };
