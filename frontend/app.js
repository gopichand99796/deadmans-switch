import {
    CONTRACT_ADDRESS,
    CONTRACT_ABI as ABI
}
from "./abi.js";

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

const bal =
await provider.getBalance(
    CONTRACT_ADDRESS
);

document
.getElementById(
"balance"
)
.innerText =
ethers.formatEther(
    bal
);