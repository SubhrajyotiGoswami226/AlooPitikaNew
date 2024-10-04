import React, { useCallback, FC, useState } from 'react';
import styles from '../styles/Home.module.css';
import { withdrawToken } from '@/services/token.service';
import { TxStatus } from './TxStatus';
import { useWallet } from '@alephium/web3-react';
import { node } from '@alephium/web3';
import { TokenFaucetConfig } from '@/services/utils';

export const TokenDapp: FC<{
  config: TokenFaucetConfig
}> = ({ config }) => {
  const { signer, account } = useWallet();
  const addressGroup = config.groupIndex;
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [ongoingTxId, setOngoingTxId] = useState<string>();

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signer) {
      const result = await withdrawToken(signer, withdrawAmount, config.faucetTokenId);
      setOngoingTxId(result.txId);
    }
  };

  const txStatusCallback = useCallback(
    async (status: node.TxStatus, numberOfChecks: number): Promise<any> => {
      if ((status.type === 'Confirmed' && numberOfChecks > 2) || (status.type === 'TxNotFound' && numberOfChecks > 3)) {
        setOngoingTxId(undefined);
      }
      return Promise.resolve();
    },
    [setOngoingTxId]
  );

  return (
    <div className={styles.tokenDappContainer}>
      {ongoingTxId && <TxStatus txId={ongoingTxId} txStatusCallback={txStatusCallback} />}
      <form onSubmit={handleWithdrawSubmit} className={styles.form}>
        <h2 className={styles.title}>Alephium Token Faucet on {config.network}</h2>
        <p className={styles.publicKey}><b>PublicKey:</b> {account?.publicKey ?? '???'}</p>
        <p className={styles.maxTokens}>Maximum 2 tokens can be withdrawn at a time.</p>
        <table className={styles.tokenTable}>
          <thead>
            <tr>
              <td className={styles.tableHeader}>ID</td>
              <th className={styles.tableHeader}>Group</th>
            </tr>
          </thead>
          <tbody>
            <tr key={addressGroup} className={styles.tokenRow}>
              <td className={styles.tokenCell}>{config.faucetTokenId}</td>
              <td className={styles.tokenCell}>{addressGroup}</td>
            </tr>
          </tbody>
        </table>


        <label htmlFor="withdraw-amount" className={styles.label}>Amount</label>
        <input
          type="number"
          id="transfer-amount"
          name="amount"
          max="2"
          min="1"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          className={styles.input}
        />
        <br />
        <input
          type="submit"
          disabled={!!ongoingTxId}
          value="Send Me Token"
          className={styles.submitButton}
        />
      </form>
    </div>
  );
};
