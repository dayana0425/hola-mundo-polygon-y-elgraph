import { ipfs, json } from "@graphprotocol/graph-ts";
import {
  NewGreetingCreated,
  RecievedGreeting
} from "../generated/Contract/Contract";
import { Greeting, Recieved } from "../generated/schema";
import { integer } from "@protofire/subgraph-toolkit";

export function handleNewGreetingCreated(event: NewGreetingCreated): void {
  let newGreeting = Greeting.load(event.params.greetingId.toHex());
  if (newGreeting == null) {
    newGreeting = new Greeting(event.params.greetingId.toHex());
    newGreeting.greetingID = event.params.greetingId;
    newGreeting.ownerAddress = event.params.greetingOwner;
    newGreeting.timestamp = event.params.timestamp;
    newGreeting.totalRecieved = integer.ZERO;
    newGreeting.totalSent = integer.ZERO;

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
          const fallbackURL =
            "https://ipfs.io/ipfs/bafybeibssbrlptcefbqfh4vpw2wlmqfj2kgxt3nil4yujxbmdznau3t5wi/event.png";
          newGreeting.imageURL = fallbackURL;
        }
      }
    }
    newGreeting.save();
  } 
}

export function handleRecievedGreeting(event: RecievedGreeting): void {
  let id = event.params.greetingId.toHex() + event.params.from.toHex();
  let newRecieved = Recieved.load(id);
  let thisGreeting = Greeting.load(event.params.greetingId.toHex());

  if (newRecieved == null && thisGreeting != null) {
    newRecieved = new Recieved(id);
    newRecieved.greeting = thisGreeting.id;
    newRecieved.from = event.params.from;
    newRecieved.save();

    if(event.params.from === thisGreeting.ownerAddress) {
      thisGreeting.totalSent = integer.increment(thisGreeting.totalSent);
    }
    thisGreeting.totalRecieved = integer.increment(thisGreeting.totalRecieved);
    thisGreeting.save();
  }
}

