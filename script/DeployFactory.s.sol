// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/SwitchFactory.sol";

contract DeployFactory is Script {
    function run() external {
        vm.startBroadcast();

        new SwitchFactory();

        vm.stopBroadcast();
    }
}