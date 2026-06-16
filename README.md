# Dead Man's Switch

A blockchain-based inheritance system built using Solidity, Foundry, Ethereum Sepolia, and ethers.js.

The project implements a "Dead Man's Switch" mechanism where an owner must periodically check in. If the owner becomes inactive and misses the required check-ins, beneficiaries can claim the funds according to predefined share percentages.

---

## Overview

A Dead Man's Switch is a mechanism that automatically executes when its owner stops responding.

In this implementation:

* The owner deploys a switch contract.
* ETH can be deposited into the contract.
* Beneficiaries are assigned percentage shares.
* The owner must periodically call `checkIn()`.
* If the owner misses a check-in, the contract enters a grace period.
* If the grace period expires, beneficiaries can claim the funds.
* The owner may cancel the switch at any time before triggering.

---

## Features

### DeadMansSwitch Contract

* Owner-controlled inheritance contract
* ETH deposits
* Beneficiary management
* Check-in mechanism
* Grace period handling
* Automated inheritance claims
* Contract cancellation
* Event emission for all major state changes

### SwitchFactory Contract

* Deploys new DeadMansSwitch instances
* Stores switches created by users
* Retrieves switches owned by an address

### Frontend

* Wallet connection using MetaMask
* View current contract status
* Live countdown timer
* Deposit ETH
* Add beneficiaries
* Check In functionality
* Claim functionality
* Cancel Switch functionality
* Factory panel for deploying and listing switches

---

## Smart Contracts

### DeadMansSwitch.sol

Main inheritance contract.

Key Functions:

* `deposit()`
* `checkIn()`
* `triggerGracePeriod()`
* `claim()`
* `cancel()`
* `addBeneficiary()`
* `removeBeneficiary()`

### IDeadMansSwitch.sol

Interface used to interact with the DeadMansSwitch contract.

### SwitchFactory.sol

Factory contract responsible for deploying DeadMansSwitch instances.

Functions:

* `createSwitch()`
* `getSwitchesByOwner()`

---

## State Machine

Active
↓
Miss Check-In
↓
Grace Period
↓
Grace Expires
↓
Triggered
↓
Beneficiaries Claim Funds

Owner may cancel at any time while the contract is Active or in Grace Period.

---

## Testing

Implemented using Foundry.

Tests include:

* checkIn()
* triggerGracePeriod()
* cancel()

Time-based testing is implemented using:

```solidity
vm.warp(...)
```

to simulate the passage of time without waiting in real life.

Run tests:

```bash
forge test
```

---

## Deployment

### Network

Sepolia Testnet

### Deployed Contracts

#### DeadMansSwitch

Contract Address:

0x1EeB7dB9A415178905e2F5222637Fc9401353b23

#### SwitchFactory

Contract Address:

PASTE_YOUR_FACTORY_ADDRESS_HERE

---

## Frontend

Frontend is built using:

* HTML
* CSS
* JavaScript
* ethers.js v6

Run locally using VS Code Live Server.

---

## Project Structure

```text
src/
├── DeadMansSwitch.sol
├── IDeadMansSwitch.sol
└── SwitchFactory.sol

script/
├── Deploy.s.sol
└── DeployFactory.s.sol

test/
└── DeadMansSwitch.t.sol

frontend/
├── index.html
├── app.js
├── abi.js
├── frontendAbi.js
└── style.css
```

---

## Tech Stack

* Solidity
* Foundry
* OpenZeppelin
* Ethereum Sepolia
* ethers.js v6
* MetaMask

---

## Future Improvements

* Full ERC20 token support
* Ownership-aware factory deployment
* Better beneficiary dashboard
* Multiple switch management from frontend
* Improved UI/UX

---

## Author

Built as a blockchain smart contract project using Foundry and Ethereum.
