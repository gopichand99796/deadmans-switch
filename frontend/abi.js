export const CONTRACT_ADDRESS ="0xCCa625CB3eC072F4e39CBb53E627E21D6FE51e22";

export const CONTRACT_ABI = [
  {
    "type": "event",
    "name": "BeneficiaryClaimed",
    "inputs": [
      {"indexed": false, "internalType": "address", "name": "beneficiary", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Cancelled",
    "inputs": [
      {"indexed": false, "internalType": "address", "name": "owner", "type": "address"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CheckedIn",
    "inputs": [
      {"indexed": false, "internalType": "address", "name": "owner", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "GracePeriodStarted",
    "inputs": [
      {"indexed": false, "internalType": "uint256", "name": "untilTimestamp", "type": "uint256"}
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SwitchTriggered",
    "inputs": [
      {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "anonymous": false
  },
  {
    "type": "function",
    "name": "addBeneficiary",
    "inputs": [
      {"internalType": "address", "name": "beneficiary", "type": "address"},
      {"internalType": "uint256", "name": "shares", "type": "uint256"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "beneficiaries",
    "inputs": [
      {"internalType": "uint256", "name": "index", "type": "uint256"}
    ],
    "outputs": [
      {"internalType": "address", "name": "beneficiary", "type": "address"},
      {"internalType": "uint256", "name": "shares", "type": "uint256"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "cancel",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "checkIn",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "checkInInterval",
    "inputs": [],
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "claim",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deposit",
    "inputs": [
      {"internalType": "address", "name": "recipient", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "gracePeriod",
    "inputs": [],
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isBeneficiary",
    "inputs": [
      {"internalType": "address", "name": "account", "type": "address"}
    ],
    "outputs": [
      {"internalType": "bool", "name": "", "type": "bool"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "lastCheckIn",
    "inputs": [],
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {"internalType": "address", "name": "", "type": "address"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "removeBeneficiary",
    "inputs": [
      {"internalType": "address", "name": "beneficiary", "type": "address"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "status",
    "inputs": [],
    "outputs": [
      {"internalType": "uint8", "name": "", "type": "uint8"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalShares",
    "inputs": [],
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "triggerGracePeriod",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "constructor",
    "inputs": [
      {"internalType": "uint256", "name": "checkInInterval", "type": "uint256"},
      {"internalType": "uint256", "name": "gracePeriod", "type": "uint256"}
    ],
    "stateMutability": "nonpayable"
  }
];
