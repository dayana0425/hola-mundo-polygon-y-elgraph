import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionPanel,
    AccordionButton,
    Button,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
// React 
import React, { useState, useEffect } from "react";
// Wagmi 
import { useContract, useSigner } from 'wagmi';
// Address + ABI 
import { contractAddress } from '../../utils/contractAddress.js';
import contractABI from '../../contracts/ABI/HolaMundo.json';


  export default function Card({ greetingID, ownerAddress, country, name, age, message, crypto, imageURL, timestamp, totalRecieved, totalSent }) {
    // Chakura-UI Toast Messages
    const toast = useToast();
    // Transaction States
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(null);

    // Connect To Contract
    const signer = useSigner();
    const contractOnMumbai = useContract({
        addressOrName: contractAddress,
        contractInterface: contractABI,
        signerOrProvider: signer.data,
    });

    // Toasts for Transaction States
    useEffect(() => {
        if(success) {
            toast({
                title: "Success!",
                status: "success",
                duration: 4000,
                isClosable: false,
                position: "bottom-right",
            });
        }
        if(loading) {
            toast({
                title: "Waiting...",
                status: "loading",
                duration: 4000,
                isClosable: false,
                position: "bottom-right",
            });
        }
    }, [success, loading]);

    // Send Greeting
    const sendGreeting = async (cid) => {
        try {
            // Reset
            setSuccess(false)
            setLoading(false)
            if (contractOnMumbai) {
            // Calling smart contract function: sendGreeting
            const txn = await contractOnMumbai.sendGreeting(greetingID,{ gasLimit: 900000 });
            setLoading(true);
            await txn.wait();
            setLoading(false);
            setSuccess(true);
            } else {
            setSuccess(false)
            setLoading(false)
            alert("Oops! Something went wrong. Please refresh & try again.");
            }
        } catch (error) {
            setSuccess(false)
            setLoading(false)
            alert("Oops! Something went wrong. Please refresh & try again.");
        }
    };

    return (
      <Center py={6}>
        <Box
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
            <Avatar
                size={'xl'}
                src={imageURL}
                alt={'Avatar Alt'}
                mb={4}
                pos={'relative'}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
                Hola Mundo! 🌎
            </Heading>
            {/* ACCORDIAN */}
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                    <AccordionButton _expanded={{ bg: 'blue.200', color: 'white'}}>
                        <Box fontWeight={600} color={'gray.600'} flex='1' textAlign='center'>
                            Sobre Mí
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {/* INFO */}
                        <Text fontWeight={600} color={'gray.600'}>
                            Greeting ID:
                        </Text>
                        <Text color={'gray.500'}>
                            {greetingID}
                        </Text>
                        <Text fontWeight={600} color={'gray.600'}>
                            Address:
                        </Text>
                        <Text color={'gray.500'}>
                            {ownerAddress}
                        </Text>
                        <Text fontWeight={600} color={'gray.600'}>
                            Mi Nombre Es:
                        </Text>
                        <Text color={'gray.500'}>
                            {name}
                        </Text>
                        <Text fontWeight={600} color={'gray.600'}>
                            Años:
                        </Text>
                        <Text color={'gray.500'}>
                            {age}
                        </Text>
                        <Text fontWeight={600} color={'gray.600'}>
                            País:
                        </Text>
                        <Text color={'gray.500'}>
                            {country}
                        </Text>
                        <Text fontWeight={600} color={'gray.600'}>
                            Criptomoneda Favorita:
                        </Text>
                        <Text color={'gray.500'}>
                            {crypto}
                        </Text>
                        <Text fontWeight={600} color={'gray.600'}>
                            Mensaje:
                        </Text>
                        <Text color={'gray.500'}>
                            {message}
                        </Text>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            {/* SENT / RECIEVED */}
            <Text fontWeight={600} color={'gray.600'}>
            Recibido:
            </Text>
            <Text color={'gray.500'}>
                {totalRecieved}
            </Text>
            <Text fontWeight={600} color={'gray.600'}>
                Enviado:
            </Text>
            <Text color={'gray.500'}>
                {totalSent}
            </Text>
            {/* SEND GREETING */}
            <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                colorScheme="blue"
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={(e)=> sendGreeting(e)}>
                Manda Saludos 👋
            </Button>
        </Box>
      </Center>
    );
  }