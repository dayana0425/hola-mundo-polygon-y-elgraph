import React, { useState, useEffect } from "react";
import {
    Heading,
    Avatar,
    Box,
    Center,
    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionPanel,
    AccordionButton,
    Button,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import CardText from "./CardText.jsx";
import { useContract, useSigner } from 'wagmi';
import { contractAddress } from '../../utils/contractAddress.js';
import contractABI from '../../contracts/ABI/HolaMundo.json';


export default function Card({ greetingID, ownerAddress, country, name, age, message, crypto, imageURL, timestamp, totalRecieved }) {

    const toast = useToast();

    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(null);

    const signer = useSigner();
    const contractOnMumbai = useContract({
        addressOrName: contractAddress,
        contractInterface: contractABI,
        signerOrProvider: signer.data,
    });

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

    const enviarSaludo = async (e) => {
        try {
            setSuccess(false)
            setLoading(false)
            if (contractOnMumbai) {
            const txn = await contractOnMumbai.enviarSaludo(greetingID,{ gasLimit: 900500 });
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
      <Center py={6} px={3}>
        <Box
          maxW={'300px'}
          w={'full'}
          bg={useColorModeValue('purple.100', 'purple.900')}
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
            <Heading fontSize={'2xl'} fontFamily={'body'}> Hola Mundo! 🌎 </Heading>
            {/* Sobre Mí */}
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton _expanded={{ bg: 'purple.200', color: 'purple.500'}}>
                        <Box fontWeight={700} color={'purple.500'} flex='1' textAlign='center'> 
                            Sobre Mí
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <CardText boldText={"Greeting ID:"} text={greetingID}/>
                        <CardText boldText={"Address:"} text={ownerAddress}/>
                        <CardText boldText={"Mi Nombre Es:"} text={name}/>
                        <CardText boldText={"País:"} text={country}/>
                        <CardText boldText={"Criptomoneda Favorita:"} text={crypto}/>
                        <CardText boldText={"Mensaje:"} text={message}/>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            {/* RECIBIDO SALUDOS */}
            <CardText boldText={"Recibido:"} text={totalRecieved}/>
            {/* ENVIAR SALUDO */}
            <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                colorScheme="blue"
                bg="purple.400"
                color="white"
                _hover={{ bg: 'blue.500' }}
                onClick={(e)=> enviarSaludo(e)}>
                Enviar Saludo 👋
            </Button>
        </Box>
      </Center>
    );
}