import styles from '../styles/Home.module.css'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../components/wallet/connectors'
import TokenListRinkeby from '../assets/token-list-rinkeby.json'
import { useState } from 'react'
import useBalance from '../actions/useBalance'

export default function Home() {
  const [selectedToken, setSelectedToken] = useState(TokenListRinkeby[0])

  const { activate, account } = useWeb3React()

  const [balance] = useBalance(
    selectedToken.address,
    selectedToken.decimals
  )

  return (
    <div className={styles.container}>
      <button onClick={() => activate(injected)}>Connect wallet</button>
      {account ? `Connected wallet: ${account}` : 'Wallet not connected'}
      <select onChange={(e) => setSelectedToken(TokenListRinkeby[e.target.value])}>
        {TokenListRinkeby.map((token, index) => (
          <option value={index} key={token.address}>{token.name}</option>
        ))}
      </select>
      {selectedToken.name} balance {balance}
    </div>
  )
}
