export const FACTORY_ADDRESS =
"0x647452De4F95040f4203684aCF18504111444171";

export const FACTORY_ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "creator", type: "address" },
      { indexed: false, internalType: "address", name: "switchAddress", type: "address" }
    ],
    name: "SwitchCreated",
    type: "event"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_delay", type: "uint256" },
      { internalType: "uint256", name: "_gracePeriod", type: "uint256" }
    ],
    name: "createSwitch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" }
    ],
    name: "getSwitchesByOwner",
    outputs: [
      { internalType: "address[]", name: "", type: "address[]" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "ownerSwitches",
    outputs: [
      { internalType: "address", name: "", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  }
];
