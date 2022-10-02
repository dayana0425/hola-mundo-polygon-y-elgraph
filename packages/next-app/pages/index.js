import Header from "./Header";
import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useToast } from "@chakra-ui/react";

export default function Home() {
  const toast = useToast();

  useEffect(() => {
    toast({
      title: "Connect Wallet",
      description: "Connect to Polygon Mumbai",
      status: "info",
      duration: 4000,
      isClosable: false,
      position: "bottom-right",
    });
  }, []);
  return (
    <>
      <Header />
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
}
