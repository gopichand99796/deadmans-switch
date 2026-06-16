// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IDeadMansSwitch {

    enum Status {
        Active,
        GracePeriod,
        Triggered,
        Cancelled
    }

    function checkIn() external;

    function triggerGracePeriod() external;

    function claim() external;

    function cancel() external;

    function deposit(address token, uint256 amount)
        external
        payable;
}