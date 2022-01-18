export interface ConnectResult {
    publicKey: string;
    error?: string;
}

interface RabetI {
    close: Promise<ConnectResult>
    connect: Function
    disconnect: Function
    isUnlocked: Function
    on: Function
    sign: Function
}

const Rabet = (): RabetI => {
    // @ts-ignore
    return window.rabet
} 

export default Rabet