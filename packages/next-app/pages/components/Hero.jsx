import { 
  Heading,
  Text, 
  Flex,
  Box,
  Button,
  Stack,
  Img,
  Spacer,
  SimpleGrid,
  useMediaQuery
} from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

function Hero() {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  return (
    <div>
      <Flex
        alignItems="center"
        w="full"
        px={isLargerThanLG ? '19' : '6'}
        py="10"
        minHeight="20vh"
        justifyContent="space-between"
        flexDirection={isLargerThanLG ? 'row' : 'column'}
      >
        <Box mr={isLargerThanLG ? '6' : '0'} w={isLargerThanLG ? '60%' : 'full'}>
          {/* TITLE */}
          <Flex justifyContent={"left"} alignItems={"center"}>
            <Heading
              className={"text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"}
              fontSize={["3rem", "2.8rem", "2.5rem", "3.3rem", "3.8rem"]}
            >
              Hola Mundo
            </Heading>
          </Flex>
          {/* DESCRIPTION */}
          <Text mb="5" fontSize={isLargerThanLG ? 'lg' : 'base'} opacity={0.7}>
            Una aplicación para enviar y recibir saludos!
          </Text>
          <Stack direction='row' spacing={4}>
          {/* GREET THE WORLD */}
            <Button
              w="200px"
              colorScheme="blue"
              variant="solid"
              h="50px"
              size={isLargerThanLG ? 'lg' : 'md'}
              mb={isLargerThanLG ? '0' : '10'}
              onClick={(e) => {
                e.preventDefault();
                window.location.href='/create-greeting';
                }}
            >
              Saluda al Mundo 👋
            </Button>
          </Stack>
        </Box>
        <Spacer />
        {/* IMAGE */}
        <Flex
          w={isLargerThanLG ? '40%' : 'full'}
          alignItems="center"
          justifyContent="center"
        >
          <Img src="/HolaMundo.png" alt="Hola Mundo Image" />
        </Flex>
      </Flex>
      {/* DASHBOARD */}
      <SimpleGrid minChildWidth='300px' spacing='40px'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </SimpleGrid>

    </div>
  );
}

export default Hero;
