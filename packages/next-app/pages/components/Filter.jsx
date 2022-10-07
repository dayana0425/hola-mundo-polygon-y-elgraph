import React, { useState } from "react";
import {
    SimpleGrid,
    Flex,
    Box,
    FormControl,
    FormLabel,
    Select,
    Stack,
    useColorModeValue,
    useMediaQuery
} from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import Card from "./Card";
import countriesJSON from '../../data/countries.json';
import cryptocurrenciesJSON from '../../data/cryptocurrencies.json';

  const ALL_GREETINGS = gql`
      query getGreetings {
          greetings {
            greetingID
            ownerAddress
            country
            name
            age
            message
            crypto
            imageURL
            timestamp
            totalRecieved
          }
        }
      `;
  
  const PAST_24_HOURS_GREETINGS = gql`
    query getGreetings($yesterdayTimestamp: String) {
        greetings(where: {timestamp_gt: $yesterdayTimestamp }) {
            greetingID
            ownerAddress
            country
            name
            age
            message
            crypto
            imageURL
            timestamp
            totalRecieved
        }
    }
  `;
  
  const CRYPTO_AND_COUNTRY_GREETINGS = gql`
    query getGreetings($faveCrypto: String, $personCountry: String) {
        greetings(where: {crypto: $faveCrypto, country: $personCountry}) {
            greetingID
            ownerAddress
            country
            name
            age
            message
            crypto
            imageURL
            timestamp
            totalRecieved
        }
    }
  `;

const COUNTRY_GREETINGS = gql`
    query getGreetings($personCountry: String) {
        greetings(where: {country: $personCountry }) {
            greetingID
            ownerAddress
            country
            name
            age
            message
            crypto
            imageURL
            timestamp
            totalRecieved
        }
    }
`;

const CRYPTO_GREETINGS = gql`
    query getGreetings($faveCrypto: String) {
        greetings(where: {crypto: $faveCrypto }) {
            greetingID
            ownerAddress
            country
            name
            age
            message
            crypto
            imageURL
            timestamp
            totalRecieved
        }
    }
`;

const SORT_GREETINGS = gql`
    query getGreetings {
        greetings(orderBy: totalRecieved orderDirection: desc) {
            greetingID
            ownerAddress
            country
            name
            age
            message
            crypto
            imageURL
            timestamp
            totalRecieved
        }
    }
`;

  
  function Filter() {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    const yesterdayInSecs = Math.floor((new Date().getTime() / 1000) - 86400); // timestamps in solidity are in seconds
    const [yesterdayTimestamp, setYesturdayTimestamp] = useState(yesterdayInSecs.toString());
    const [personCountry, setCountry] = useState("");
    const [faveCrypto, setCrypto] = useState("");
    const [timeSelected, setTime] = useState("");

    const cryptoAndCountryQuery = useQuery(CRYPTO_AND_COUNTRY_GREETINGS, {
        variables: { 
            faveCrypto,
            personCountry
        }
    });
    
    const cryptoQuery = useQuery(CRYPTO_GREETINGS, {
        variables: { 
            faveCrypto
        }
    });

    const countryQuery = useQuery(COUNTRY_GREETINGS, {
        variables: { 
            personCountry
        }
    });

    const allGreetingsQuery = useQuery(ALL_GREETINGS);

    const yesterdayQuery = useQuery(PAST_24_HOURS_GREETINGS, {        
        variables: { 
            yesterdayTimestamp
        }
    })

    const sortQuery = useQuery(SORT_GREETINGS);
    console.log(timeSelected)
    return (
      <div>
        {/* FILTERING OPTIONS */}
        <Flex 
            align="center" 
            justify="center">
            <Box
                borderWidth='1px'
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius="lg"
                p={2}
                color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                shadow="base">
                <Stack direction={ isLargerThanLG ? 'row' : 'column'} spacing={2}>[]
                {/* FIELD: PAÍS */}
                    <FormControl>
                    <FormLabel>País</FormLabel>
                    <Select
                        id={"Country"}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder='Selecciona País'>
                            {countriesJSON.map((country) => {return(
                                <option key={country.code}>
                                    {country.name}
                                </option>);
                            })}
                    </Select>
                    </FormControl>
                    {/* FIELD: CRIPTO */}
                    <FormControl>
                    <FormLabel>Criptomoneda Favorita</FormLabel>
                    <Select
                        id={"Crypto"}
                        onChange={(e) => setCrypto(e.target.value)}
                        placeholder='Selecciona Criptomoneda'>
                            {cryptocurrenciesJSON.map((crypto) => {return(
                                <option key={crypto.code}>
                                    {crypto.name}
                                </option>);
                            })}
                    </Select>
                    </FormControl>
                    {/* FIELD: OTHER */}
                    <FormControl>
                    <FormLabel>Tiempo Creado</FormLabel>
                    <Select
                        id={"Other"}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder='Seleccione Una Opción'>
                            <option>
                                Ultimas 24 Horas
                            </option>
                            <option>
                                Ordenar Por Saludos Recibidos
                            </option>
                    </Select>
                    </FormControl>
                </Stack>
            </Box>
        </Flex>
        {/* DASHBOARD */}
        <SimpleGrid minChildWidth='300px' spacing='40px'>
            { faveCrypto 
            && personCountry 
            && cryptoAndCountryQuery.data 
            && timeSelected == ""
            && cryptoAndCountryQuery.data.greetings.map((greeting) => (
                <Card
                    key={greeting.greetingID}
                    greetingID={greeting.greetingID}
                    ownerAddress={greeting.ownerAddress}
                    country={greeting.country}
                    name={greeting.name}
                    age={greeting.age}
                    message={greeting.message}
                    crypto={greeting.crypto}
                    imageURL={greeting.imageURL}
                    timestamp={greeting.timestamp}
                    totalRecieved={greeting.totalRecieved}
                    totalSent={greeting.totalSent}> 
                </Card>))
            }
            { faveCrypto 
            && personCountry == ""
            && cryptoQuery.data 
            && timeSelected == ""
            && cryptoQuery.data.greetings.map((greeting) => (
                <Card
                    key={greeting.greetingID}
                    greetingID={greeting.greetingID}
                    ownerAddress={greeting.ownerAddress}
                    country={greeting.country}
                    name={greeting.name}
                    age={greeting.age}
                    message={greeting.message}
                    crypto={greeting.crypto}
                    imageURL={greeting.imageURL}
                    timestamp={greeting.timestamp}
                    totalRecieved={greeting.totalRecieved}
                    totalSent={greeting.totalSent}> 
                </Card>))
            }
            { faveCrypto == "" 
            && personCountry 
            && countryQuery.data 
            && timeSelected == ""
            && countryQuery.data.greetings.map((greeting) => ( 
                <Card
                    key={greeting.greetingID}
                    greetingID={greeting.greetingID}
                    ownerAddress={greeting.ownerAddress}
                    country={greeting.country}
                    name={greeting.name}
                    age={greeting.age}
                    message={greeting.message}
                    crypto={greeting.crypto}
                    imageURL={greeting.imageURL}
                    timestamp={greeting.timestamp}
                    totalRecieved={greeting.totalRecieved}
                    totalSent={greeting.totalSent}> 
                </Card>))
            }
            { faveCrypto == "" 
            && personCountry == ""
            && timeSelected == ""
            && allGreetingsQuery.data 
            && allGreetingsQuery.data.greetings.map((greeting) => ( 
                <Card
                    key={greeting.greetingID}
                    greetingID={greeting.greetingID}
                    ownerAddress={greeting.ownerAddress}
                    country={greeting.country}
                    name={greeting.name}
                    age={greeting.age}
                    message={greeting.message}
                    crypto={greeting.crypto}
                    imageURL={greeting.imageURL}
                    timestamp={greeting.timestamp}
                    totalRecieved={greeting.totalRecieved}
                    totalSent={greeting.totalSent}> 
                </Card>))
            }
            { timeSelected == "Ultimas 24 Horas"
            && yesterdayQuery.data 
            && yesterdayQuery.data.greetings.map((greeting) => ( 
                <Card
                    key={greeting.greetingID}
                    greetingID={greeting.greetingID}
                    ownerAddress={greeting.ownerAddress}
                    country={greeting.country}
                    name={greeting.name}
                    age={greeting.age}
                    message={greeting.message}
                    crypto={greeting.crypto}
                    imageURL={greeting.imageURL}
                    timestamp={greeting.timestamp}
                    totalRecieved={greeting.totalRecieved}
                    totalSent={greeting.totalSent}> 
                </Card>))
            }
            { timeSelected == "Ordenar Por Saludos Recibidos"
            && sortQuery.data 
            && sortQuery.data.greetings.map((greeting) => ( 
                <Card
                    key={greeting.greetingID}
                    greetingID={greeting.greetingID}
                    ownerAddress={greeting.ownerAddress}
                    country={greeting.country}
                    name={greeting.name}
                    age={greeting.age}
                    message={greeting.message}
                    crypto={greeting.crypto}
                    imageURL={greeting.imageURL}
                    timestamp={greeting.timestamp}
                    totalRecieved={greeting.totalRecieved}
                    totalSent={greeting.totalSent}> 
                </Card>))
            }
        </SimpleGrid>
      </div>
    );
  }
  
  export default Filter;
  