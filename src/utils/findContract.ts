import { Contract31337 } from "@/contracts/31337/Contract31337";
import { Contract137 } from "@/contracts/137/Contract137";
import { Contract80001 } from "@/contracts/80001/Contract80001";

export let mapChainContract = new Map([
    [31337, Contract31337],
    [137, Contract137],
    [80001, Contract80001]
]);