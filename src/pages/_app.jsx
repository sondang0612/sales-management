import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import "../styles/responsive.css";

import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MainLayout from "../components/layout/MainLayout";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster
        toastOptions={{
          style: { background: "rgb(51,65,85)", color: "#fff" },
          duration: 1500,
        }}
      />
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
