class Stellar {
    server:any
    wallet:string = ''

    constructor(wallet:string, isTestnet=false){
        if(isTestnet){
            //@ts-ignore
            this.server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        }
        else{
            //@ts-ignore
            this.server = new StellarSdk.Server('https://horizon.stellar.org');
        }

        this.wallet = wallet
    }

    async transactionBySequence(cursor:string){
        return this.server.transactions()
        .forAccount(this.wallet)
        .cursor(cursor)
        .order('asc')
        .limit(1)
        .call()
    }

    async account(){
        return this.server.loadAccount(this.wallet)
    }
}

export default Stellar