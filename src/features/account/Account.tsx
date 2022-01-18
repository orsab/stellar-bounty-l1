import React, { useState } from "react";

import { connectWallet, disconnectWallet } from "./accountFunctions";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styles from "./Account.module.css";
import { Loader } from "../Loader";

export function Account() {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  console.log(account);

  return (
    <div>
      <Loader />

      {account.walletConnected && (
        <div className={styles['flex-column']}>
          <h3>Account: {account.data.account_id}</h3>
          <span className={styles.date}>
            Created by: {account.data.sourceAccount}
          </span>
          <span className={styles.date}>
            Created at: {account.data.createdAt}
          </span>
        </div>
      )}

      <br />
      {!account.walletConnected && (
        <button onClick={() => dispatch(connectWallet())}>Connect</button>
      )}
      {account.walletConnected && (
        <button onClick={() => dispatch(disconnectWallet())}>Disconnect</button>
      )}

      {account.data && (
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {account.data.balances
              .filter((b: any) =>
                ["credit_alphanum4", "credit_alphanum12", "native"].includes(
                  b.asset_type
                )
              )
              .map((b: any, i: number) => (
                <tr key={i}>
                  <td>{b.asset_code ?? "XLM"}</td>
                  <td>{b.balance}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
