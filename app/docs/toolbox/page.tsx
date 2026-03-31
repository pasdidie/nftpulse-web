import Image from 'next/image';

export default function ToolboxPage() {
  return (
    <>
      <h1>Toolbox</h1>
      <p>
        The Toolbox is your Swiss Army knife for managing funds across wallet groups.
        It has three modes: <strong>Distribute</strong>, <strong>Collect</strong>,
        and <strong>Drain</strong>. All modes work on <strong>any EVM chain</strong>.
      </p>

      <h2>Distribute</h2>
      <p>
        Send native tokens from a single <strong>mother wallet</strong>
        to all wallets in a group. This is how you fund wallets before a mint.
      </p>

      <figure className="screenshot">
        <Image src="/docs/toolbox-distribute-anime.png" alt="Toolbox distribute panel" width={1200} height={500} className="w-full rounded-lg" />
        <figcaption>Distributing 1 ANIME to 5 wallets on AnimeChain — Total: 5.0000 ANIME</figcaption>
      </figure>

      <h3>How to Use</h3>
      <ol>
        <li>Select your <strong>wallet group</strong> and <strong>chain</strong></li>
        <li>Paste the <strong>mother wallet private key</strong> (the wallet holding the funds)</li>
        <li>Set the <strong>amount per wallet</strong> — the label adapts to the chain&apos;s native token (ETH, ANIME, etc.)</li>
        <li>Review the total cost, then click <strong>DISTRIBUTE</strong></li>
      </ol>

      <div className="callout callout-info">
        <strong>How it works:</strong> Transactions are sent sequentially with pre-assigned nonces
        for maximum reliability. Each send returns immediately (no confirmation wait).
        With Alchemy RPC, 100 wallets takes about 10-15 seconds.
      </div>

      <h3>Tips</h3>
      <ul>
        <li>Calculate the total needed: <code>amount_per_wallet x number_of_wallets</code> + a bit extra for gas</li>
        <li>On L2s (Base, ApeChain, AnimeChain, Abstract, MegaETH), gas is very cheap — 0.001 ETH per wallet is usually enough for a mint + drain</li>
        <li>The mother wallet private key is <strong>never stored</strong> — only used in-memory for the operation</li>
      </ul>

      <hr />

      <h2>Collect</h2>
      <p>
        Sweep all remaining <strong>native tokens</strong> from every wallet in a group
        back to a single destination address. Each wallet sends its full balance minus gas cost.
      </p>

      <h3>How to Use</h3>
      <ol>
        <li>Select your <strong>wallet group</strong> and <strong>chain</strong></li>
        <li>Enter the <strong>destination address</strong> (your main wallet)</li>
        <li>Click <strong>COLLECT</strong></li>
      </ol>
      <p>
        Wallets are processed in parallel (up to 50 concurrent) for speed.
        Gas is optimized to recover the maximum amount (only 5% buffer above base fee).
      </p>

      <hr />

      <h2>Drain</h2>
      <p>
        The most powerful Toolbox mode. Drain transfers <strong>everything</strong> — both
        NFTs and native tokens — from all wallets in a group to a single destination.
      </p>

      <figure className="screenshot">
        <Image src="/docs/drain-results.png" alt="Drain results showing 50/50 wallets drained" width={1200} height={900} className="w-full rounded-lg" />
        <figcaption>Drain results — 49.71 ANIME recovered from 50/50 wallets on AnimeChain</figcaption>
      </figure>

      <h3>How It Works</h3>
      <p>For each wallet, the Drain mode:</p>
      <ol>
        <li><strong>Detects NFTs</strong> on the selected chain (via OpenSea or Blockscout for AnimeChain)</li>
        <li><strong>Transfers each NFT</strong> to the destination — supports ERC-721 (<code>safeTransferFrom</code> with <code>transferFrom</code> fallback) and ERC-1155 (with <code>balanceOf</code> check)</li>
        <li><strong>Sweeps remaining native tokens</strong> to the destination with minimal gas buffer</li>
      </ol>

      <h3>How to Use</h3>
      <ol>
        <li>Select your <strong>wallet group</strong> and <strong>chain</strong></li>
        <li>Enter the <strong>destination wallet address</strong></li>
        <li>Click <strong>Scan Balances</strong> to preview the total native balance across all wallets</li>
        <li>Click <strong>DRAIN ALL (NFTs + ...)</strong></li>
      </ol>

      <h3>Drain Summary</h3>
      <p>After draining, you see three metrics:</p>
      <ul>
        <li><strong>Native Drained</strong> — Total native tokens recovered</li>
        <li><strong>NFTs Transferred</strong> — Number of NFTs moved to your wallet</li>
        <li><strong>Wallets Drained</strong> — How many wallets were successfully processed</li>
      </ul>

      <div className="callout callout-warning">
        <strong>NFT transfers require gas.</strong> Make sure wallets have enough native tokens
        to cover the gas for NFT transfers. If a wallet can&apos;t afford gas for NFT transfer,
        it skips NFTs and only drains the native token balance.
      </div>

      <h3>Gas Optimization</h3>
      <p>
        All Toolbox operations use minimal gas buffers (105% of base fee) to maximize
        the amount of tokens you recover. NFT transfer gas limit is set to 70K (optimized for
        standard ERC-721/1155 transfers). Gas settings are fetched once and shared
        across all transactions.
      </p>
    </>
  );
}
