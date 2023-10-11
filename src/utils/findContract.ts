import { Contract31337 } from "src/contracts/31337/Contract31337";
import { Contract137 } from "src/contracts/137/Contract137";

export let mapChainContract = new Map([
    [31337, Contract31337],
    [137, Contract137]
]);