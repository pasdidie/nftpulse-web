export default function ToolboxPage() {
  return (
    <>
      <h1>Toolbox</h1>
      <p>
        The Toolbox is your Swiss Army knife for managing funds across wallet groups.
        It has three modes: <strong>Distribute</strong>, <strong>Collect</strong>,
        and <strong>Drain</strong>.
      </p>

      <h2>Distribute</h2>
      <p>
        Send native tokens (ETH, ANIME, etc.) from a single <strong>mother wallet</strong>
        to all wallets in a group. This is how you fund wallets before a mint.
      </p>

      <h3>How to Use</h3>
      <ol>
        <li>Select your <strong>wallet group</strong> and <strong>chain</strong></li>
        <li>Paste the <strong>mother wallet private key</strong> (the wallet holding the funds)</li>
        <li>Set the <strong>amount per wallet</strong></li>
        <li>Review the total cost, then click <strong>DISTRIBUTE</strong></li>
      </ol>

      <div className="callout callout-info">
        <strong>How it works:</strong> Transactions are sent sequentially with pre-assigned nonces
        for maximum reliability. No transaction confirmation is waited for — just broadcast and move
        to the next. For 100 wallets, this takes about 10-15 seconds.
      </div>

      <figure className="screenshot">
        <div className="bg-white/[0.03] rounded-lg h-40 flex items-center justify-center text-gray-600 text-sm">
          Distribute panel — 0.1 ANIME to 100 wallets, Total: 10.0000 ANIME
        </div>
        <figcaption>Distributing ANIME tokens to 100 wallets</figcaption>
      </figure>

      <h3>Tips</h3>
      <ul>
        <li>Calculate the total needed: <code>amount_per_wallet x number_of_wallets + gas</code></li>
        <li>On L2s, gas is very cheap — 0.01 ETH per wallet is usually more than enough for a mint</li>
        <li>The mother wallet private key is <strong>never stored</strong> — only used in-memory for the operation</li>
      </ul>

      <hr />

      <h2>Collect</h2>
      <p>
        Sweep all remaining <strong>native tokens</strong> from every wallet in a group
        back to a single destination address. Each wallet sends its full balance minus gas.
      </p>

      <h3>How to Use</h3>
      <ol>
        <li>Select your <strong>wallet group</strong> and <strong>chain</strong></li>
        <li>Enter the <strong>destination address</strong> (your main wallet)</li>
        <li>Click <strong>COLLECT</strong></li>
      </ol>
      <p>
        The bot processes wallets in parallel (up to 50 concurrent) for speed.
        Gas estimation is optimized to leave the minimum required for the transfer,
        so you recover the maximum amount possible.
      </p>

      <hr />

      <h2>Drain</h2>
      <p>
        The most powerful Toolbox mode. Drain transfers <strong>everything</strong> — both
        NFTs and native tokens — from all wallets in a group to a single destination.
      </p>

      <h3>How It Works</h3>
      <p>For each wallet, the Drain mode:</p>
      <ol>
        <li><strong>Detects NFTs</strong> on the selected chain (via OpenSea or Blockscout)</li>
        <li><strong>Transfers each NFT</strong> to the destination (ERC-721 and ERC-1155 supported)</li>
        <li><strong>Sweeps remaining native tokens</strong> to the destination</li>
      </ol>

      <h3>How to Use</h3>
      <ol>
        <li>Select your <strong>wallet group</strong> and <strong>chain</strong></li>
        <li>Enter the <strong>destination wallet address</strong></li>
        <li>Click <strong>Scan Balances</strong> to preview the total native balance</li>
        <li>Click <strong>DRAIN ALL</strong></li>
      </ol>

      <figure className="screenshot">
        <div className="bg-white/[0.03] rounded-lg h-48 flex items-center justify-center text-gray-600 text-sm">
          Drain results — 14.16 ANIME drained, 0 NFTs, 99/100 wallets
        </div>
        <figcaption>Drain results showing native tokens recovered and NFTs transferred</figcaption>
      </figure>

      <h3>Drain Summary</h3>
      <p>After draining, you see three metrics:</p>
      <ul>
        <li><strong>Native Drained</strong> — Total native tokens recovered</li>
        <li><strong>NFTs Transferred</strong> — Number of NFTs moved to your wallet</li>
        <li><strong>Wallets Drained</strong> — How many wallets were successfully processed</li>
      </ul>

      <div className="callout callout-warning">
        <strong>NFT transfers require gas.</strong> Make sure wallets have enough native tokens
        to cover the gas for NFT transfers. If a wallet doesn&apos;t have enough gas, NFT
        transfers are skipped and only the native token balance is drained.
      </div>

      <h3>Gas Optimization</h3>
      <p>
        All Toolbox operations use minimal gas buffers (105% of base fee) to maximize
        the amount of tokens you recover. Gas settings are fetched once and shared
        across all transactions in the batch.
      </p>
    </>
  );
}
