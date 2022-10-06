# Hola Mundo DApp 👋 
### Desarrollo de Blockchain de Pila Completa en Español ✨
---

![Figure 1](./images/HolaMundoScreenshot.png)

---

<p>

Un proyecto inicial para configurar rápidamente la creación de tu DApp en Polygon y con El Graph. 

En este proyecto de ejemplo, es un juego de enviar y recibir saludos en Polygon. La persona que recibe la mayor cantidad de saludos gana! Este proyecto incluye El Graph para que usuarios puedan filtrar entre todos los usuarios para encontrar ciertas  personas a la que desea saludar usando GraphQL.

</p>

---

# 🤖 Stack De Tech e Información De Redes

#### Stack De Tech utilizado: 
 - Javascript
 - React
 - Next.js
 - Tailwind CSS 
 - Chakra UI
 - Rainbow Wallet
 - IPFS / Web3 Storage
 - The Graph
 - GraphQL
 - WAGMI
 - Hardhat
 - Ethers.js
#### Red de Blockchain: 
 - Polygon Mumbai: https://mumbai.polygonscan.com/
 #### Otras Características: 
 - Monorepo
  
 ---

# 🏄‍♂️ Inicio Rápido

#### Antes de clonar este proyecto, asegúrate de tener instalado lo siguiente en tu máquina (en este orden)!
* [Node.js](https://nodejs.org/en/) 
* [Yarn](https://classic.yarnpkg.com/en/docs/install/)
* [Git](https://git-scm.com/downloads)

#### Puedes verificar ejecutando estos comandos en tu terminal para revisar si ya los tienes instalados:

```bash
node -v
npm -v
yarn -v
git --version
```
#### Fork y clonar
* Primero, `Fork` este proyecto haciendo clic en el botón de `Fork` en la esquina superior derecha de la página del repositorio.
![Figure 2](./images/fork.png)
* Segundo, abre tu terminal y ejecuta el siguiente comando con tu usuario de github.
  
```bash
git clone https://github.com/<TU-USUARIO>/hola-mundo-dapp
```
#### Instala todas las dependencias del proyecto

* En el directorio raíz instala las dependencias del proyecto ejecutando `yarn install`

```bash
cd hola-mundo-dapp
yarn install
```
---

# 🛠 Configuración de Entorno y Wallet

#### Crea una wallet de desarollo con Metamask, una cuenta de Alchemy, de Web3Storage y una de PolygonScan
* [Metamask](https://metamask.io/) 
   * IMPORTANTE: se recomienda crear una wallet solamente para desarrollo, ¡evita usar tu wallet normal!
   * Guarda la llave privada de esta wallet de desarrollo en tus notas. 
* [Alchemy](https://www.alchemy.com/)
  * Genera una clave api GRATIS para mumbai.
  * Guarda tu clave en tus notas.
* [PolygonScan](https://polygonscan.com/apis)
  * Genera una clave api GRATIS.
  * Guarda tu clave en tus notas.
* [Web3Storage](https://web3.storage/)
  * Genera una clave api GRATIS.
  * Guarda tu clave en tus notas.
  
> **¿Porque se necessita claves de api?**
> Las claves API brindan autorización para nuestro proyecto para que podamos realizar solicitudes al servicio que queremos usar. 
Los servicios asignan una clave única para cada aplicación. La clave es una cadena de letras y números.

#### Agrega las redes Testnet para Polygon Mumbai en Metamask:
* Cómo agregar Polygon Mumbai Testnet en Metamask: https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/

> **¿Que es una <i>red de prueba</i>?**
> Polygon Mainnet cuesta dinero real, pero existen redes de prueba como Mumbai que los desarrolladores utilizan para probar sus contratos inteligentes y cuesta dinero falso. Todas las blockchains tienen sus propias redes de prueba.

#### Fondea tu Cuenta con MATIC de prueba:
* [Polygon Faucet (Mumbai Network)](https://faucet.polygon.technology/)

> **¿Que es un <i>faucet?</i>?**
> Un faucet es un lugar donde puedes solicitar dinero de prueba para probar tu DApp. Hay límites sobre cuánto y con qué frecuencia puedes hacer una solicitud.

#### Configurar Variables de Entorno:

```bash
# navegue a la carpeta 'hardhat'
cd packages/hardhat 
# copie el contenido dentro de .env.example a .env.local
cp .env.example .env.local

# navegue a la carpeta 'next-app'
cd packages/next-app
# copie el contenido dentro de .env.example a .env.local
cp .env.example .env.local
```
* Agregue las claves que guardó en el archivo `.env.local`

> **¿Por qué necesitamos establecer variables de entorno?**
> En nuestro archivo .env.local es donde almacenaremos las claves API que utilizará nuestra DApp. Es una buena práctica no exponerlos en nuestro código y almacenarlos en un archivo que estará oculto.

---

# 📱 Ejecutar frontend en localhost

* En la misma ventana, ejecutar el comando `yarn dev`

```bash
yarn dev
```
* Abre http://localhost:3000 para ver la interfaz de la aplicación!

---

# 🚀 Despliega tu front-end en Vercel!
[Clic Para Desplegar](https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app)

---

# ❓ Necesitas ayuda?
* Mándame un mensaje por twitter o telegram: @hello-dayana
* Abre un Github Issue

---

# 📚 Recursos
Solidity: https://docs.soliditylang.org/en/v0.8.15/
<br/>
Next.js: https://nextjs.org/docs
<br/>
Tailwind CSS: https://tailwindcss.com/docs/installation
<br/>
Flowbit Components: https://flowbite.com/
<br/>
Hardhat: https://hardhat.org/getting-started/
<br/>
Ethers.js: https://docs.ethers.io/v5/
<br/>
Rainbow Kit: https://www.rainbowkit.com/docs/introduction 
<br/>
Wagmi: https://wagmi.sh/docs/getting-started
<br/>
Markdown Cheatsheet: 
https://www.markdownguide.org/cheat-sheet/
<br/>
Solidity Tutorial: Crypto Zombies (Español)
https://cryptozombies.io/es/course
<br/>
Visual Studio Code:
https://code.visualstudio.com/
<br/>
Dev Setup for Mac:
https://www.youtube.com/watch?v=KwYqtbSwnH8
<br/>
The Git Book (Español):
https://git-scm.com/book/es/v2
<br/>
Atlassian Git Guru:
https://www.atlassian.com/git/tutorials
<br/> Git Commands Cheatsheet:
https://www.hostinger.com/tutorials/basic-git-commands
</br>
Canva (Use for Pitch Deck):
https://www.canva.com/
</br>
Miro (DApp Planning Whiteboard):
https://miro.com/
</br>
Figma (DApp Wireframes):
https://www.figma.com/
</br>
Notion for File Sharing/Collaborating:
https://www.notion.so/ce46ba1864254908a4f24c3815125262?v=7d9b9a55be0748148b6b9d0b6e5f3b63
</br>
Notion Template for Hackathons (By Women in Web3):
https://womeninweb3.notion.site/womeninweb3/Mini-Hack-Community-Template-65e5ee56505a49ec8c0a884ca4c63be0

---

# ⭐️ Si te ha gustado este proyecto, ¡dale una estrella!
![Figure 3](./images/star.png)

---

# 🚀 WAGMI
