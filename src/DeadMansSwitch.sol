// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IDeadMansSwitch.sol";

contract DeadMansSwitch is IDeadMansSwitch {

    address public owner;

    uint256 public checkInInterval;
    uint256 public gracePeriod;
    uint256 public lastCheckIn;
    Status public status;

    struct Beneficiary {
        address wallet;
        uint256 sharePercent;
    }

    Beneficiary[] public beneficiaries;

    mapping(address => bool) public isBeneficiary;

    event CheckedIn(
    address owner,
    uint256 timestamp
);

event GracePeriodStarted(
    uint256 deadline
);

event SwitchTriggered(
    uint256 timestamp
);

event Cancelled(
    address owner
);

event BeneficiaryClaimed(
    address beneficiary,
    uint256 amount
);

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Not owner"
        );
        _;
    }

    constructor(
        uint256 _interval,
        uint256 _grace
    ) {
        owner = msg.sender;

        checkInInterval = _interval;
        gracePeriod = _grace;

        lastCheckIn = block.timestamp;

        status = Status.Active;
    }
    function addBeneficiary(
        address wallet,
        uint256 share
    )
        external
        onlyOwner
    {
        require(
    totalShares() + share <= 100,
    "Exceeds 100%"
); 
        beneficiaries.push(
            Beneficiary(
                wallet,
                share
            )
        );

        isBeneficiary[wallet] = true;
    }

    function removeBeneficiary(
        address wallet
    )
        external
        onlyOwner
    {
        isBeneficiary[wallet] = false;
    }
function deposit(
    address,
    uint256
)
    external
    payable
    override
    onlyOwner
{
    require(
        msg.value > 0,
        "No ETH sent"
    );
}
    function totalShares()
    public
    view
    returns(uint256)
{
    uint256 total;

    for(
        uint256 i = 0;
        i < beneficiaries.length;
        i++
    ){
        total += beneficiaries[i]
            .sharePercent;
    }

    return total;
}
   function checkIn()
    external
    override
    onlyOwner
{
    lastCheckIn =
        block.timestamp;

    if(
        status ==
        Status.GracePeriod
    ){
        status =
            Status.Active;
    }

    emit CheckedIn(
        owner,
        block.timestamp
    );
}
function triggerGracePeriod()
    external
    override
{
    require(
        status ==
        Status.Active,
        "Invalid status"
    );

    require(
        block.timestamp >
        lastCheckIn +
        checkInInterval,
        "Too early"
    );

    status =
        Status.GracePeriod;

    emit GracePeriodStarted(
        block.timestamp +
        gracePeriod
    );
}
function claim()
    external
    override
{
    require(
        isBeneficiary[msg.sender],
        "Not beneficiary"
    );

    require(
        status ==
        Status.GracePeriod,
        "Not claimable"
    );

    require(
        block.timestamp >
        lastCheckIn +
        checkInInterval +
        gracePeriod,
        "Grace not expired"
    );

    status =
        Status.Triggered;

    emit SwitchTriggered(
        block.timestamp
    );

    uint256 totalBalance =
        address(this).balance;

    for(
        uint256 i = 0;
        i < beneficiaries.length;
        i++
    ){
        uint256 amount =
            totalBalance *
            beneficiaries[i]
                .sharePercent /
            100;

        payable(
            beneficiaries[i]
                .wallet
        ).transfer(amount);

        emit BeneficiaryClaimed(
            beneficiaries[i]
                .wallet,
            amount
        );
    }
}

  function cancel()
    external
    override
    onlyOwner
{
    require(
        status == Status.Active ||
        status == Status.GracePeriod,
        "Cannot cancel"
    );

    status = Status.Cancelled;

    payable(owner).transfer(
        address(this).balance
    );

    emit Cancelled(owner);
}
}