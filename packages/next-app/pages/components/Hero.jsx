import { 
  Heading,
  Text, 
  Flex,
  Box,
  Button,
  Stack,
  Img,
  Spacer,
  useMediaQuery
} from "@chakra-ui/react";
import React from "react";


function Hero() {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  return (
    <>
    <Flex
      alignItems="center"
      w="full"
      px={isLargerThanLG ? '16' : '6'}
      py="16"
      minHeight="90vh"
      justifyContent="space-between"
      flexDirection={isLargerThanLG ? 'row' : 'column'}
    >
      <Box mr={isLargerThanLG ? '6' : '0'} w={isLargerThanLG ? '60%' : 'full'}>
        {/* TITLE */}
        <Flex justifyContent={"left"} alignItems={"center"}>
          <Heading
            className={"text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"}
            fontWeight={"500"}
            fontSize={["3rem", "2.8rem", "2.5rem", "3.3rem", "3.8rem"]}
          >
            Hola Mundo
          </Heading>
        </Flex>
        {/* DESCRIPTION */}
        <Text mb="5" fontSize={isLargerThanLG ? 'lg' : 'base'} opacity={0.7}>
        ¡Una aplicación para saludar y presentarte al mundo! Encuentra nuevos amigos en la Blockchain.
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
              window.location.href='';
              }}
          >
            Saluda al Mundo 👋
          </Button>
          {/* FIND FRENS */}
          <Button
            w="200px"
            colorScheme="blue"
            variant="solid"
            h="50px"
            size={isLargerThanLG ? 'lg' : 'md'}
            mb={isLargerThanLG ? '0' : '10'}
            onClick={(e) => {
              e.preventDefault();
              window.location.href='/create-intro';
              }}
          >
            Encontrar Amigos 🔎
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
    </>
  );
}

export default Hero;
