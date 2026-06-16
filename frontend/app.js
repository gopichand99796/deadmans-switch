import {
    CONTRACT_ADDRESS,
    CONTRACT_ABI as ABI
}
from "./abi.js";

import {
    FACTORY_ADDRESS,
    FACTORY_ABI
}
from "./frontendAbi.js";
let factory;
let provider;
let signer;
let contract;

const connectBtn =
document.getElementById(
    "connectBtn"
);

const statusSpan =
document.getElementById(
    "status"
);

connectBtn.onclick =
async () => {

    await window.ethereum.request({
        method:
        "eth_requestAccounts"
    });

    provider =
    new ethers.BrowserProvider(
        window.ethereum
    );

    signer =
    await provider.getSigner();
    factory =
new ethers.Contract(
    FACTORY_ADDRESS,
    FACTORY_ABI,
    signer
);
console.log("FACTORY CREATED");
console.log(factory);
const bal =
await provider.getBalance(
    CONTRACT_ADDRESS
);

document
.getElementById("balance")
.innerText =
ethers.formatEther(bal);
    contract =
    new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
    );

    document.getElementById(
        "walletAddress"
    ).innerText =
    await signer.getAddress();

    loadStatus();
};

async function loadStatus(){

    const status =
    await contract.status();

    const statuses = [
        "Active",
        "Grace Period",
        "Triggered",
        "Cancelled"
    ];

    statusSpan.innerText =
    statuses[status];
}

document
.getElementById(
"checkInBtn"
)
.onclick =
async ()=>{

    const tx =
    await contract.checkIn();

    await tx.wait();

    alert("Checked In");

    loadStatus();
};

document
.getElementById(
"depositBtn"
)
.onclick =
async ()=>{

    const amount =
    document
    .getElementById(
        "depositAmount"
    )
    .value;

    const tx =
    await contract.deposit(
        ethers.ZeroAddress,
        0,
        {
            value:
            ethers.parseEther(
                amount
            )
        }
    );

    await tx.wait();

    alert(
        "Deposit Success"
    );
};

document
.getElementById(
"addBeneficiaryBtn"
)
.onclick =
async ()=>{

    const wallet =
    document
    .getElementById(
        "beneficiaryAddress"
    )
    .value;

    const share =
    document
    .getElementById(
        "share"
    )
    .value;

    const tx =
    await contract
    .addBeneficiary(
        wallet,
        share
    );

    await tx.wait();

    alert(
        "Beneficiary Added"
    );
};
document
.getElementById(
"claimBtn"
)
.onclick =
async ()=>{

    const tx =
    await contract.claim();

    await tx.wait();

    alert(
        "Claimed"
    );
};

const countdown =
document.getElementById(
    "countdown"
);

setInterval(async ()=>{

    if(!contract) return;

    const lastCheckIn =
        await contract.lastCheckIn();

    const interval =
        await contract.checkInInterval();

    const deadline =
        Number(lastCheckIn) +
        Number(interval);

    const remaining =
        deadline -
        Math.floor(Date.now()/1000);

    countdown.innerText =
        remaining > 0
        ? remaining + " sec"
        : "Expired";

},1000);

document
.getElementById(
"cancelBtn"
)
.onclick =
async ()=>{

    if(
        !confirm(
            "Cancel switch?"
        )
    ) return;

    const tx =
    await contract.cancel();

    await tx.wait();

    alert(
        "Cancelled"
    );

    loadStatus();
};



document
.getElementById(
"deploySwitchBtn"
)
.onclick =
async ()=>{

    console.log(
        "DEPLOY CLICKED"
    );

    console.log(
        factory
    );

    const interval =
    document
    .getElementById(
        "intervalInput"
    ).value;

    const grace =
    document
    .getElementById(
        "graceInput"
    ).value;

    console.log(
        interval,
        grace
    );

    const tx =
    await factory
    .createSwitch(
        interval,
        grace
    );

    await tx.wait();

    alert(
        "Switch Deployed"
    );
};
document
.getElementById(
"loadSwitchesBtn"
)
.onclick =
async ()=>{

    const owner =
    await signer.getAddress();

    const switches =
    await factory
    .getSwitchesByOwner(
        owner
    );

    const list =
    document
    .getElementById(
        "switchList"
    );

    list.innerHTML = "";

    switches.forEach(
        addr => {

        const li =
        document
        .createElement("li");

        li.innerText =
        addr;

        list.appendChild(li);

    });
};