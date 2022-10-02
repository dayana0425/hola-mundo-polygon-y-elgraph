import { Container, Divider, Link, Text } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <>
      <Divider w={"80%"} mx={"auto"} />
      <Container py={"2rem"}>
        <Text textAlign={"center"} fontSize={"1rem"}>
          WAGBI 🚀 {" "}
          <Link isExternal href="https://github.com/dayana0425/hola-mundo-dapp">
            Github
          </Link>
        </Text>
      </Container>
    </>
  );
}

export default Footer;
