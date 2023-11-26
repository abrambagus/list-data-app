"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./_store/store";

export default function Providers({ children }) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    },
  });

  return (
   
      <QueryClientProvider client={queryClient}>
         <Provider store={store}>
        {children}
        </Provider>
      </QueryClientProvider>
  );
}