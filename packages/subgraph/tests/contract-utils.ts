import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NewGreetingCreated,
  RecievedGreeting
} from "../generated/Contract/Contract"

export function createNewGreetingCreatedEvent(
  greetingId: Bytes,
  greetingDataCID: string,
  greetingOwner: Address,
  timestamp: BigInt
): NewGreetingCreated {
  let newGreetingCreatedEvent = changetype<NewGreetingCreated>(newMockEvent())

  newGreetingCreatedEvent.parameters = new Array()

  newGreetingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "greetingId",
      ethereum.Value.fromFixedBytes(greetingId)
    )
  )
  newGreetingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "greetingDataCID",
      ethereum.Value.fromString(greetingDataCID)
    )
  )
  newGreetingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "greetingOwner",
      ethereum.Value.fromAddress(greetingOwner)
    )
  )
  newGreetingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return newGreetingCreatedEvent
}

export function createRecievedGreetingEvent(
  greetingId: Bytes,
  from: Address
): RecievedGreeting {
  let recievedGreetingEvent = changetype<RecievedGreeting>(newMockEvent())

  recievedGreetingEvent.parameters = new Array()

  recievedGreetingEvent.parameters.push(
    new ethereum.EventParam(
      "greetingId",
      ethereum.Value.fromFixedBytes(greetingId)
    )
  )
  recievedGreetingEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )

  return recievedGreetingEvent
}
