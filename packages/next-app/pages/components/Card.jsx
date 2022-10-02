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
  } from '@chakra-ui/react';
  
  export default function Card() {
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
                src={
                    'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                }
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
                            Mi Nombre Es:
                        </Text>
                        <Text color={'gray.500'}>
                            Dayana
                        </Text>
                        <Text fontWeight={600} color={'gray.600'}>
                            Años:
                        </Text>
                        <Text color={'gray.500'}>
                            22
                        </Text>
                        <Text fontWeight={600} color={'gray.600'}>
                            País:
                        </Text>
                        <Text color={'gray.500'}>
                            Argentina
                        </Text>
                        <Text fontWeight={600} color={'gray.600'}>
                            Criptomoneda Favorita:
                        </Text>
                        <Text color={'gray.500'}>
                            Ethereum
                        </Text>
                        <Text fontWeight={600} color={'gray.600'}>
                            Mensaje:
                        </Text>
                        <Text color={'gray.500'}>
                            Hehehe
                        </Text>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            {/* SENT / RECIEVED */}
            <Text fontWeight={600} color={'gray.600'}>
            Recibido:
            </Text>
            <Text color={'gray.500'}>
                50
            </Text>
            <Text fontWeight={600} color={'gray.600'}>
                Enviado:
            </Text>
            <Text color={'gray.500'}>
                20
            </Text>
            {/* SEND GREETING */}
            <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                _focus={{
                    bg: 'purple.500',
                }}>
                Manda Saludos 👋
            </Button>
        </Box>
      </Center>
    );
  }