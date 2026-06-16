// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import "../src/DeadMansSwitch.sol";
import "forge-std/console.sol";

contract DeadMansSwitchTest is Test {
    DeadMansSwitch dms;
    receive() external payable {}

    function setUp() public {
        dms = new DeadMansSwitch(3600, 1800);
    }

    function testCancel() public {
        console.log(uint256(dms.status()));

        dms.cancel();

        assertEq(uint256(dms.status()), 3);
    }

    function testCheckIn() public {
        vm.warp(block.timestamp + 100);

        dms.checkIn();

        assertEq(dms.lastCheckIn(), block.timestamp);
    }

    function testTriggerGracePeriod() public {
        vm.warp(block.timestamp + 3601);

        dms.triggerGracePeriod();

        assertEq(uint256(dms.status()), 1);
    }
}
