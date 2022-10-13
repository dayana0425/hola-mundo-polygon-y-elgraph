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
import countriesJSON from '../../data/countries.json'; // lista de paises
import cryptocurrenciesJSON from '../../data/cryptocurrencies.json'; // lista de criptomonedas
    // ~todos los saludos 
    const ALL_GREETINGS = gql`
        query getGreetings {
            saludos {
                saludoId
                saludador
                marcaDeTiempo
                saludosRecibidos
                imageURL
                country
                name
                age
                message
                crypto
            }
        }
    `;

    // saludos desde las ultimas 24 horas
    const PAST_24_HOURS_GREETINGS = gql`
        query getGreetings($yesterdayTimestamp: String) { 
            saludos(where: {marcaDeTiempo_gt: $yesterdayTimestamp }) {
                saludoId
                saludador
                marcaDeTiempo
                saludosRecibidos
                imageURL
                country
                name
                age
                message
                crypto
            }
        }
    `;

    // ~todos los saludos que coincidan con cripto y pais
    const CRYPTO_AND_COUNTRY_GREETINGS = gql`
        query getGreetings($faveCrypto: String, $personCountry: String) {
            saludos(where: {crypto: $faveCrypto, country: $personCountry}) {
                saludoId
                saludador
                marcaDeTiempo
                saludosRecibidos
                imageURL
                country
                name
                age
                message
                crypto
            }
        }
    `;

    // saludos que coinciden con el país
    const COUNTRY_GREETINGS = gql`
        query getGreetings($personCountry: String) {
            saludos(where: {country: $personCountry }) {
                saludoId
                saludador
                marcaDeTiempo
                saludosRecibidos
                imageURL
                country
                name
                age
                message
                crypto
            }
        }
    `;

    // saludos que coinciden con cripto
    const CRYPTO_GREETINGS = gql`
        query getGreetings($faveCrypto: String) {
            saludos(where: {crypto: $faveCrypto }) {
                saludoId
                saludador
                marcaDeTiempo
                saludosRecibidos
                imageURL
                country
                name
                age
                message
                crypto
            }
        }
    `;

    // ordenar saludos
    const SORT_GREETINGS = gql`
        query getGreetings {
            saludos(orderBy: saludosRecibidos orderDirection: desc) {
                saludoId
                saludador
                marcaDeTiempo
                saludosRecibidos
                imageURL
                country
                name
                age
                message
                crypto
            }
        }
    `;

  
  function Filter() {
    const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
    const yesterdayInSecs = Math.floor((new Date().getTime() / 1000) - 86400); // las marcas de tiempo en Solidity están en segundos, por lo que debemos convertirlas a milisegundos
    const [yesterdayTimestamp] = useState(yesterdayInSecs.toString());
    const [personCountry, setCountry] = useState(""); // pais de person
    const [faveCrypto, setCrypto] = useState(""); // favorito cripto
    const [other, setOther] = useState(""); // otro

    // query de cripto y país usando las variables 'faveCrypto' y 'personCountry' como entrada
    const cryptoAndCountryQuery = useQuery(CRYPTO_AND_COUNTRY_GREETINGS, {
        variables: {
            faveCrypto,
            personCountry
        }
    });
    // query de cripto usando el variable 'faveCrypto'
    const cryptoQuery = useQuery(CRYPTO_GREETINGS, {
        variables: { 
            faveCrypto
        }
    });
    // query de pais usando el variable 'personCountry'
    const countryQuery = useQuery(COUNTRY_GREETINGS, {
        variables: { 
            personCountry
        }
    });

    // query de todos los saludos
    const allGreetingsQuery = useQuery(ALL_GREETINGS);

    // query de todos los saludos de ayer
    const yesterdayQuery = useQuery(PAST_24_HOURS_GREETINGS, {        
        variables: { 
            yesterdayTimestamp
        }
    })
    // query para ordena los saludos
    const sortQuery = useQuery(SORT_GREETINGS);

    console.log(allGreetingsQuery)
    return (
      <div>
        {/* OPCIONES DE FILTRO */}
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
                    {/* Campo de Entrada: CRIPTO */}
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
                    {/* Campo de Entrada: OTRO */}
                    <FormControl>
                    <FormLabel>Otro</FormLabel>
                    <Select
                        id={"Other"}
                        onChange={(e) => setOther(e.target.value)}
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
        {/* TABLERO */}
        <SimpleGrid minChildWidth='300px' spacing='40px'>
            { faveCrypto 
            && personCountry
            && other == ""
            && cryptoAndCountryQuery.data 
            && cryptoAndCountryQuery.data.saludos.map((saludo) => (
                <Card
                    key={saludo.saludoId}
                    greetingID={saludo.saludoId}
                    ownerAddress={saludo.saludador}
                    country={saludo.country}
                    name={saludo.name}
                    age={saludo.age}
                    message={saludo.message}
                    crypto={saludo.crypto}
                    imageURL={saludo.imageURL}
                    timestamp={saludo.marcaDeTiempo}
                    totalRecieved={saludo.saludosRecibidos}> 
                </Card>))
            }
            { faveCrypto 
            && personCountry == ""
            && other == ""
            && cryptoQuery.data 
            && cryptoQuery.data.saludos.map((saludo) => (
                <Card
                    key={saludo.saludoId}
                    greetingID={saludo.saludoId}
                    ownerAddress={saludo.saludador}
                    country={saludo.country}
                    name={saludo.name}
                    age={saludo.age}
                    message={saludo.message}
                    crypto={saludo.crypto}
                    imageURL={saludo.imageURL}
                    timestamp={saludo.marcaDeTiempo}
                    totalRecieved={saludo.saludosRecibidos}> 
                </Card>))
            }
            { faveCrypto == "" 
            && personCountry
            && other == ""
            && countryQuery.data 
            && countryQuery.data.saludos.map((saludo) => ( 
                <Card
                    key={saludo.saludoId}
                    greetingID={saludo.saludoId}
                    ownerAddress={saludo.saludador}
                    country={saludo.country}
                    name={saludo.name}
                    age={saludo.age}
                    message={saludo.message}
                    crypto={saludo.crypto}
                    imageURL={saludo.imageURL}
                    timestamp={saludo.marcaDeTiempo}
                    totalRecieved={saludo.saludosRecibidos}>  
                </Card>))
            }
            { faveCrypto == "" 
            && personCountry == ""
            && other == ""
            && allGreetingsQuery.data 
            && allGreetingsQuery.data.saludos.map((saludo) => ( 
                <Card
                    key={saludo.saludoId}
                    greetingID={saludo.saludoId}
                    ownerAddress={saludo.saludador}
                    country={saludo.country}
                    name={saludo.name}
                    age={saludo.age}
                    message={saludo.message}
                    crypto={saludo.crypto}
                    imageURL={saludo.imageURL}
                    timestamp={saludo.marcaDeTiempo}
                    totalRecieved={saludo.saludosRecibidos}> 
                </Card>))
            }
            { other == "Ultimas 24 Horas"
            && yesterdayQuery.data 
            && yesterdayQuery.data.saludos.map((saludo) => ( 
                <Card
                    key={saludo.saludoId}
                    greetingID={saludo.saludoId}
                    ownerAddress={saludo.saludador}
                    country={saludo.country}
                    name={saludo.name}
                    age={saludo.age}
                    message={saludo.message}
                    crypto={saludo.crypto}
                    imageURL={saludo.imageURL}
                    timestamp={saludo.marcaDeTiempo}
                    totalRecieved={saludo.saludosRecibidos}> 
                </Card>))
            }
            { other == "Ordenar Por Saludos Recibidos"
            && sortQuery.data 
            && sortQuery.data.saludos.map((saludo) => ( 
                <Card
                    key={saludo.saludoId}
                    greetingID={saludo.saludoId}
                    ownerAddress={saludo.saludador}
                    country={saludo.country}
                    name={saludo.name}
                    age={saludo.age}
                    message={saludo.message}
                    crypto={saludo.crypto}
                    imageURL={saludo.imageURL}
                    timestamp={saludo.marcaDeTiempo}
                    totalRecieved={saludo.saludosRecibidos}> 
                </Card>))
            }
        </SimpleGrid>
      </div>
    );
  }
  
  export default Filter;
  