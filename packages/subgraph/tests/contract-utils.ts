import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NuevoSaludoCreado,
  SaludoRecibido
} from "../generated/Contract/Contract"

export function createNuevoSaludoCreadoEvent(
  saludoId: Bytes,
  saludoDatosCID: string,
  saludador: Address,
  marcaDeTiempo: BigInt
): NuevoSaludoCreado {
  let nuevoSaludoCreadoEvent = changetype<NuevoSaludoCreado>(newMockEvent())

  nuevoSaludoCreadoEvent.parameters = new Array()

  nuevoSaludoCreadoEvent.parameters.push(
    new ethereum.EventParam("saludoId", ethereum.Value.fromFixedBytes(saludoId))
  )
  nuevoSaludoCreadoEvent.parameters.push(
    new ethereum.EventParam(
      "saludoDatosCID",
      ethereum.Value.fromString(saludoDatosCID)
    )
  )
  nuevoSaludoCreadoEvent.parameters.push(
    new ethereum.EventParam("saludador", ethereum.Value.fromAddress(saludador))
  )
  nuevoSaludoCreadoEvent.parameters.push(
    new ethereum.EventParam(
      "marcaDeTiempo",
      ethereum.Value.fromUnsignedBigInt(marcaDeTiempo)
    )
  )

  return nuevoSaludoCreadoEvent
}

export function createSaludoRecibidoEvent(
  saludoId: Bytes,
  de: Address
): SaludoRecibido {
  let saludoRecibidoEvent = changetype<SaludoRecibido>(newMockEvent())

  saludoRecibidoEvent.parameters = new Array()

  saludoRecibidoEvent.parameters.push(
    new ethereum.EventParam("saludoId", ethereum.Value.fromFixedBytes(saludoId))
  )
  saludoRecibidoEvent.parameters.push(
    new ethereum.EventParam("de", ethereum.Value.fromAddress(de))
  )

  return saludoRecibidoEvent
}
