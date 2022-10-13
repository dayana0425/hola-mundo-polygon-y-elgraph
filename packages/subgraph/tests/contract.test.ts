import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { ExampleEntity } from "../generated/schema"
import { NuevoSaludoCreado } from "../generated/Contract/Contract"
import { handleNuevoSaludoCreado } from "../src/contract"
import { createNuevoSaludoCreadoEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let saludoId = Bytes.fromI32(1234567890)
    let saludoDatosCID = "Example string value"
    let saludador = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let marcaDeTiempo = BigInt.fromI32(234)
    let newNuevoSaludoCreadoEvent = createNuevoSaludoCreadoEvent(
      saludoId,
      saludoDatosCID,
      saludador,
      marcaDeTiempo
    )
    handleNuevoSaludoCreado(newNuevoSaludoCreadoEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExampleEntity created and stored", () => {
    assert.entityCount("ExampleEntity", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "saludoId",
      "1234567890"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "saludoDatosCID",
      "Example string value"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "saludador",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "marcaDeTiempo",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
