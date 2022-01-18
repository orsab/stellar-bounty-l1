import { RootState } from '../../app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Rabet, { ConnectResult } from '../rabet/Rabet';
import Stellar from '../stellar/Stellar';

export interface AccountState {
    data?: any
    walletConnected: boolean;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AccountState = {
    status: 'idle',
    walletConnected: false
};
export const accountData = (state: RootState) => state.account;

export const connectWallet = createAsyncThunk(
    'account/connect',
    async () => {
        if (Rabet) {
            const wallet = await Rabet().connect()
            const account = await getAccountData(wallet.publicKey)
            console.log(account)

            return {
                ...wallet,
                account: {
                    account_id: account.account_id,
                    balances: account.balances,
                    createdAt: account.createdAt,
                    sourceAccount: account.source_account,
                }
            }
        }
    }
)
export const disconnectWallet = createAsyncThunk(
    'account/disconnect',
    async () => {
        if (Rabet) {
            await Rabet().disconnect()

            return {
                walletConnected: false
            }
        }
    }
)

const getAccountData = async (wallet:string) => {
    if (Stellar) {
        const stellar = new Stellar(wallet, false)
        const account = await stellar.account()

        const tx = await stellar.transactionBySequence(account.sequence)
        console.log({r:tx.records[0]})

        account.createdAt = tx.records[0].created_at
        account.source_account = tx.records[0].source_account
        return account
    }
}

export const loadAccount = createAsyncThunk(
    'account/load',
    getAccountData
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectWallet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(connectWallet.rejected, (state) => {
                state.status = 'failed';
                state.data = null
                state.walletConnected = false
            })
            .addCase(connectWallet.fulfilled, (state, action) => {
                state.status = 'idle';
                state.data = action.payload.account;
                state.walletConnected = true
            })

            .addCase(disconnectWallet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(disconnectWallet.rejected, (state, action) => {
                state.status = 'failed';
                state.walletConnected = false
                state.data = null
            })
            .addCase(disconnectWallet.fulfilled, (state, action) => {
                state.status = 'idle';
                state.walletConnected = !!action.payload?.walletConnected
                state.data = null
            })
    },
});

// export const { connect } = accountSlice.actions;

export default accountSlice.reducer;