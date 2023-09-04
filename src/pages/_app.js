import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";


function ClerkSupabaseApp({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Header />
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default ClerkSupabaseApp;