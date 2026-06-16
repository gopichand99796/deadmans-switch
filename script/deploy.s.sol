// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/DeadMansSwitch.sol";

contract Deploy is Script {

    function run() external {

        vm.startBroadcast();

        DeadMansSwitch dms =
            new DeadMansSwitch(
                3600,
                1800
            );

        vm.stopBroadcast();
    }
}