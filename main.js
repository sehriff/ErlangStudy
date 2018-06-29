//node main.js



const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress,toAddress,amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}


class Block {
    constructor(timestamp, transactions, previousHash=''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = '';
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(  this.previousHash+ this.timestamp+JSON.string(this.transactions)+this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) != Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: "+this.hash);
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block( "01/01/2017","Genesis block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        //newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    minePendingTransactions(minePendingAddress){
        let block = new Block(Data.now(),this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions=[
            new Transaction(null,minePendingAddress,this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress == address){
                    balance -= trans.amount;
                }
                if(trans.toAddress == address){
                    balance += trans.amount;
                }
            }
        }
    }

    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock = this.chian[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash != previousBlock.hash){
                return false
            }
        }
        return true;
    }
}

let savjeeCoin = new BlockChain();
savjeeCoin.createTransaction(new Transaction('address1','address2',100));
savjeeCoin.createTransaction(new Transaction('address2','address1',50));

console.log('\n Starting the miner...');
savjeeCoin.minePendingTransactions('xaviers-address');

console.log('\nBblance of xavier is',savjeeCoin.getBalanceOfAddress('xaviers-address'));
// console.log("Mining block 1...");

console.log('\n Starting the miner...');
savjeeCoin.minePendingTransactions('xaviers-address');


savjeeCoin.addBlock(new Block(1,"10/07/2017",{amount: 4}));
console.log("Mining block 2...");
savjeeCoin.addBlock(new Block(2,"12/07/2017",{amount: 10}));

// console.log('Is blockchian valid?'+savjeeCoin.isChainValid());
// //console.log(JSON.stringify(savjeeCoin,null,4));

// savjeeCoin.chain[1].transactions={amount:100};
// savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash();

// console.log('Is blockchian valid?'+savjeeCoin.isChainValid());














