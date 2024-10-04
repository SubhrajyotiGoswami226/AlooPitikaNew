import React, { useCallback, useRef } from 'react';
import { useTxStatus } from '@alephium/web3-react';
import { node } from '@alephium/web3';

interface TxStatusAlertProps {
  txId: string;
  txStatusCallback(status: node.TxStatus, numberOfChecks: number): Promise<any>;
}

export const TxStatus = ({ txId, txStatusCallback }: TxStatusAlertProps) => {
  const numberOfChecks = useRef(0);
  const callback = useCallback(
    async (status: node.TxStatus) => {
      numberOfChecks.current += 1;
      return txStatusCallback(status, numberOfChecks.current);
    },
    [txStatusCallback]
  );

  const { txStatus } = useTxStatus(txId, callback);

  return (
    <div className="tx-status-container">
      <h3 className="tx-status-header">
        Transaction status: <code>{txStatus?.type || 'unknown'}</code>
      </h3>
      <h3 className="tx-status-header">
        Transaction hash: <code>{txId}</code>
      </h3>
    </div>
  );
};
