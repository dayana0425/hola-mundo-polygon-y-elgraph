import { ipfs, json } from "@graphprotocol/graph-ts";
import {
  NewGreetingCreated,
  RecievedGreeting
} from "../generated/Contract/Contract";
import { Greeting } from "../generated/schema";
import { integer } from "@protofire/subgraph-toolkit";

export function handleNewGreetingCreated(event: NewGreetingCreated): void {
  let newGreeting = Greeting.load(event.params.greetingId.toHex());
  if (newGreeting == null) {
    newGreeting = new Greeting(event.params.greetingId.toHex());
    newGreeting.greetingID = event.params.greetingId;
    newGreeting.ownerAddress = event.params.greetingOwner;
    newGreeting.timestamp = event.params.timestamp;
    newGreeting.totalRecieved = integer.ZERO;

    // fetch data from ipfs
    let ipfsData = ipfs.cat(event.params.greetingDataCID + "/data.json");
    if(ipfsData) {
      const value = json.fromBytes(ipfsData).toObject();
      if(value) {
        const name = value.get("name");
        if (name) {
          newGreeting.name = name.toString();
        }
        const age = value.get("age");
        if (age) {
          newGreeting.age = age.toString();
        }
        const country = value.get("country");
        if (country) {
          newGreeting.country = country.toString();
        }
        const crypto = value.get("crypto");
        if (crypto) {
          newGreeting.crypto = crypto.toString();
        }
        const message = value.get("formMessage");
        if (message) {
          newGreeting.message = message.toString();
        }
        const imagePath = value.get("image");
        if (imagePath) {
          const imageURL = "https://ipfs.io/ipfs/" + event.params.greetingDataCID + imagePath.toString();
          newGreeting.imageURL = imageURL;
        } else {
          const fallbackURL = "https://bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu.ipfs.w3s.link/dr-is-tired.jpg";
          newGreeting.imageURL = fallbackURL;
        }
      }
    }
    newGreeting.save();
  } 
}

export function handleRecievedGreeting(event: RecievedGreeting): void {
  let thisGreeting = Greeting.load(event.params.greetingId.toHex());
  if (thisGreeting != null) {
    thisGreeting.totalRecieved = integer.increment(thisGreeting.totalRecieved);
    thisGreeting.save();
  }
}

