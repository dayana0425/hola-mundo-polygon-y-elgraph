import { ipfs, json } from "@graphprotocol/graph-ts";
import {
  Contract,
  NuevoSaludoCreado,
  SaludoRecibido
} from "../generated/Contract/Contract"
import { Saludo } from "../generated/schema";
import { integer } from "@protofire/subgraph-toolkit";

export function handleNuevoSaludoCreado(event: NuevoSaludoCreado): void {
  let nuevoSaludo = Saludo.load(event.params.saludoId.toHex());
  if (nuevoSaludo == null) {
    nuevoSaludo = new Saludo(event.params.saludoId.toHex());
    nuevoSaludo.saludoId = event.params.saludoId;
    nuevoSaludo.saludador = event.params.saludador;
    nuevoSaludo.marcaDeTiempo = event.params.marcaDeTiempo;
    nuevoSaludo.saludosRecibidos = integer.ZERO;

    let ipfsData = ipfs.cat(event.params.saludoDatosCID + "/data.json");
    
    if(ipfsData) {
      const value = json.fromBytes(ipfsData).toObject();
      if(value) {
        const name = value.get("name");
        if (name) {
          nuevoSaludo.name = name.toString();
        }
        const age = value.get("age");
        if (age) {
          nuevoSaludo.age = age.toString();
        }
        const country = value.get("country");
        if (country) {
          nuevoSaludo.country = country.toString();
        }
        const crypto = value.get("crypto");
        if (crypto) {
          nuevoSaludo.crypto = crypto.toString();
        }
        const message = value.get("formMessage");
        if (message) {
          nuevoSaludo.message = message.toString();
        }
        const imagePath = value.get("image");
        if (imagePath) {
          const imageURL = "https://ipfs.io/ipfs/" + event.params.saludoDatosCID + imagePath.toString();
          nuevoSaludo.imageURL = imageURL;
        } else {
          const fallbackURL = "https://bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu.ipfs.w3s.link/dr-is-tired.jpg";
          nuevoSaludo.imageURL = fallbackURL;
        }
      }
    }
    nuevoSaludo.save();
  } 
}

export function handleSaludoRecibido(event: SaludoRecibido): void {
  let esteSaludo = Saludo.load(event.params.saludoId.toHex());
  if (esteSaludo != null) {
    esteSaludo.saludosRecibidos = integer.increment(esteSaludo.saludosRecibidos);
    esteSaludo.save();
  }
}
