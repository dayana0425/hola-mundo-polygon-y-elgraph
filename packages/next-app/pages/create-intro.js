import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Select,
    NumberInput,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputField,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Textarea,
    VStack,
    useColorModeValue
  } from '@chakra-ui/react';
  import Navbar from "./components/Navbar";
  import Header from "./Header";

  import React from 'react';

  import { BsPerson } from 'react-icons/bs';
  import countriesJSON from '../data/countries.json';
  import cryptocurrenciesJSON from '../data/cryptocurrencies.json';

  export default function ContactFormWithSocialButtons() {
    const countries = JSON.parse(JSON.stringify(countriesJSON));
    return (
    <div>
    <Header/>
    <Navbar/>
      <Flex
        align="center"
        justify="center"
        id="intro">
        <Box
          borderRadius="lg"
          m={{ base: 5, md: 16, lg: 10 }}
          p={{ base: 5, lg: 16 }}>
          <Box>
            <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
              {/* TITLE */}
              <Heading
                fontSize={{
                  base: '3xl',
                  md: '5xl',
                }}>
                Saluda al Mundo 👋
              </Heading>
              {/* FORM */}
              <Stack
                spacing={{ base: 4, md: 7, lg: 10 }}
                direction={{ base: 'column', md: 'row' }}>
                <Box
                  borderWidth='1px'
                  bg={useColorModeValue('white', 'gray.700')}
                  borderRadius="lg"
                  p={8}
                  color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                  shadow="base">
                  {/* FIELD: NOMBRE */}
                  <VStack spacing={5}>][]
                    <FormControl isRequired>
                      <FormLabel>Nombre</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                            <BsPerson />
                        </InputLeftElement>
                        <Input type="text" name="name" placeholder="Su Nombre"/>
                      </InputGroup>
                    </FormControl>
                    {/* FIELD: EDAD */}
                    <FormControl isRequired>
                      <FormLabel>Edad</FormLabel>
                      <NumberInput allowMouseWheel="true" max={110} min={1} defaultValue="1">
                        <NumberInputField />
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </FormControl>
                    {/* FIELD: PAÍS*/}
                    <FormControl isRequired>
                      <FormLabel>País</FormLabel>
                        <Select placeholder='Selecciona País'>
                            {countries.map((country) => {
                                return (<option key={country.code}>{country.name}</option>);
                            })}
                        </Select>
                    </FormControl>
                    {/* FIELD: CRIPTO*/}
                    <FormControl isRequired>
                      <FormLabel>¿Cuál Es Tu Criptomoneda Favorita?</FormLabel>
                      <Select placeholder='Selecciona Criptomoneda'>
                            {cryptocurrenciesJSON.map((crypto) => {
                                return (<option key={crypto.code}>{crypto.name}</option>);
                            })}
                        </Select>
                    </FormControl>
                    {/* FIELD: MENSAJE */}
                    <FormControl isRequired>
                      <FormLabel>Mensaje</FormLabel>
                      <Textarea
                        name="Message"
                        placeholder="Tu Mensaje"
                        rows={6}
                        resize="none"
                      />
                    </FormControl>
                    {/* SUBMIT */}
                    <Button
                      colorScheme="blue"
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: 'blue.500',
                      }}
                      isFullWidth>
                      Crear Saludo
                    </Button>
                  </VStack>
                </Box>
              </Stack>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </div>
    );
  }