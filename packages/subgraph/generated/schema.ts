// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Saludo extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Saludo entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Saludo must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Saludo", id.toString(), this);
    }
  }

  static load(id: string): Saludo | null {
    return changetype<Saludo | null>(store.get("Saludo", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get saludoId(): Bytes {
    let value = this.get("saludoId");
    return value!.toBytes();
  }

  set saludoId(value: Bytes) {
    this.set("saludoId", Value.fromBytes(value));
  }

  get saludador(): Bytes {
    let value = this.get("saludador");
    return value!.toBytes();
  }

  set saludador(value: Bytes) {
    this.set("saludador", Value.fromBytes(value));
  }

  get marcaDeTiempo(): BigInt {
    let value = this.get("marcaDeTiempo");
    return value!.toBigInt();
  }

  set marcaDeTiempo(value: BigInt) {
    this.set("marcaDeTiempo", Value.fromBigInt(value));
  }

  get saludosRecibidos(): BigInt {
    let value = this.get("saludosRecibidos");
    return value!.toBigInt();
  }

  set saludosRecibidos(value: BigInt) {
    this.set("saludosRecibidos", Value.fromBigInt(value));
  }

  get name(): string | null {
    let value = this.get("name");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set name(value: string | null) {
    if (!value) {
      this.unset("name");
    } else {
      this.set("name", Value.fromString(<string>value));
    }
  }

  get age(): string | null {
    let value = this.get("age");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set age(value: string | null) {
    if (!value) {
      this.unset("age");
    } else {
      this.set("age", Value.fromString(<string>value));
    }
  }

  get country(): string | null {
    let value = this.get("country");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set country(value: string | null) {
    if (!value) {
      this.unset("country");
    } else {
      this.set("country", Value.fromString(<string>value));
    }
  }

  get crypto(): string | null {
    let value = this.get("crypto");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set crypto(value: string | null) {
    if (!value) {
      this.unset("crypto");
    } else {
      this.set("crypto", Value.fromString(<string>value));
    }
  }

  get message(): string | null {
    let value = this.get("message");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set message(value: string | null) {
    if (!value) {
      this.unset("message");
    } else {
      this.set("message", Value.fromString(<string>value));
    }
  }

  get imageURL(): string | null {
    let value = this.get("imageURL");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set imageURL(value: string | null) {
    if (!value) {
      this.unset("imageURL");
    } else {
      this.set("imageURL", Value.fromString(<string>value));
    }
  }
}
