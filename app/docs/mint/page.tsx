import Image from 'next/image';

export default function MintPage() {
  return (
    <>
      <h1>Mint Engine</h1>
      <p>
        The Mint Engine is the core of NFTPulse. It lets you execute mints across
        multiple wallets simultaneously with gas optimization, auto-detection, and
        pre-simulation. Compatible with <strong>any EVM chain</strong> and any ERC-721 or ERC-1155 contract.
      </p>

      <figure className="screenshot">
        <Image src="/docs/mint-bot.png" alt="Mint Bot interface" width={1200} height={600} className="w-full rounded-lg" />
        <figcaption>The Mint Bot — full configuration panel with contract auto-detection, gas strategies, Smart Retry, and scheduling</figcaption>
      </figure>

      <h2>Setting Up a Mint</h2>

      <h3>1. Select Group & Chain</h3>
      <p>
        Choose the <strong>wallet group</strong> to mint with and the <strong>chain</strong>
        the NFT contract is deployed on. All EVM chains are supported.
      </p>

      <h3>2. Enter Contract Address</h3>
      <p>
        Paste the NFT contract address. NFTPulse will automatically:
      </p>
      <ul>
        <li>Fetch the contract ABI from the block explorer</li>
        <li>Detect all payable mint functions</li>
        <li>Parse function parameters (price, quantity, proof, etc.)</li>
      </ul>

      <div className="callout callout-info">
        <strong>Load from TX</strong> — You can paste a <strong>transaction hash</strong> from an existing
        mint into the &quot;Load from TX&quot; field. The bot will decode the transaction and auto-fill
        the contract address, function, arguments, and price. This is the fastest way to configure a mint.
      </div>

      <h3>3. Configure Parameters</h3>
      <ul>
        <li><strong>Function</strong> — Select the mint function from the dropdown (auto-detected)</li>
        <li><strong>Price per unit</strong> — The mint price in the chain&apos;s native token</li>
        <li><strong>Quantity</strong> — Number of NFTs to mint per wallet (if the function supports it)</li>
        <li><strong>Arguments</strong> — Additional parameters auto-filled from the ABI</li>
      </ul>

      <h3>4. Gas Strategy</h3>
      <p>Choose a gas strategy based on how competitive the mint is:</p>
      <div className="grid grid-cols-2 gap-3 my-4">
        {[
          { name: 'Eco', desc: 'Minimum gas — may take a few blocks to confirm. Best for free mints or non-competitive drops.' },
          { name: 'Normal', desc: 'Reliable inclusion in the next block. Good default for most mints.' },
          { name: 'Fast', desc: 'Top of block priority. For moderately competitive mints.' },
          { name: 'Turbo', desc: 'Maximum priority — first in block. For gas wars and hyped drops.' },
        ].map((s) => (
          <div key={s.name} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-sm font-bold text-white mb-1">{s.name}</div>
            <div className="text-xs text-gray-500">{s.desc}</div>
          </div>
        ))}
      </div>

      <h2>Advanced Features</h2>

      <h3>Smart Retry</h3>
      <p>
        When enabled, NFTPulse <strong>simulates each transaction</strong> before sending it.
        If the simulation fails (e.g. mint not started yet, sold out check), it retries every 2 seconds
        until the simulation passes, then sends the real transaction. No gas is burned on failed simulations.
      </p>
      <p>
        This is perfect for <strong>scheduled mints</strong> — set it up before the mint starts,
        and the bot will automatically execute the second the contract allows it.
      </p>

      <h3>Scheduled Mint</h3>
      <p>
        Set a specific date and time to execute the mint. Combined with Smart Retry,
        this is the most reliable way to hit a mint the moment it opens.
      </p>

      <h3>Whitelist Check</h3>
      <p>
        Before minting, you can check which of your wallets are whitelisted.
        NFTPulse auto-detects common WL check functions on the contract and
        shows eligible/ineligible status per wallet.
      </p>

      <h2>Executing the Mint</h2>
      <p>
        Click <strong>MINT ALL</strong> to start. The Mint Engine will:
      </p>
      <ol>
        <li>Pre-fetch gas data and estimate gas limit once (shared across all wallets)</li>
        <li>Fetch nonces for all wallets in batches</li>
        <li>Send all transactions with optimized gas settings</li>
        <li>Display results in the Transaction Log with links to the block explorer</li>
      </ol>

      <h2>SeaDrop Support</h2>
      <p>
        NFTPulse has built-in support for <strong>SeaDrop</strong> contracts (used by OpenSea drops).
        When a SeaDrop contract is detected, it automatically fetches Merkle proofs for whitelisted
        wallets and fills in the correct mint parameters.
      </p>

      <figure className="screenshot">
        <Image src="/docs/mint-success.png" alt="Mint results 100/100 success" width={1200} height={400} className="w-full rounded-lg" />
        <figcaption>All mints successful — 100/100 wallets minted with transaction hashes and explorer links</figcaption>
      </figure>

      <div className="callout callout-info">
        <strong>After minting</strong>, head to <strong>Portfolio</strong> to verify your NFTs arrived,
        or use <strong>Toolbox &rarr; Drain</strong> to collect everything back to your main wallet.
      </div>
    </>
  );
}
