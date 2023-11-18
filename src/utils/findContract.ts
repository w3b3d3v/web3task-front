import { Contract31337 } from "src/contracts/31337/Contract31337";
import { Contract137 } from "src/contracts/137/Contract137";
import { Contract80001 } from "src/contracts/80001/Contract80001";
import { Contract418 } from "src/contracts/418/Contract418";

export let mapChainContract = new Map([
  [31337, Contract31337],
  [137, Contract137],
  [80001, Contract80001],
  [418, Contract418],
]);
