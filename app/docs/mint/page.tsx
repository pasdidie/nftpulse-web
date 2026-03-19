export default function MintPage() {
  return (
    <>
      <h1>Mint Engine</h1>
      <p>
        The Mint Engine is the core of NFTPulse. It lets you execute mints across
        multiple wallets simultaneously with gas optimization, auto-detection, and
        pre-simulation.
      </p>

      <h2>Setting Up a Mint</h2>

      <h3>1. Select Group & Chain</h3>
      <p>
        Choose the <strong>wallet group</strong> to mint with and the <strong>chain</strong>
        the NFT contract is deployed on.
      </p>

      <h3>2. Enter Contract Address</h3>
      <p>
        Paste the NFT contract address. NFTPulse will automatically:
      </p>
      <ul>
        <li>Fetch the contract ABI</li>
        <li>Detect all payable mint functions</li>
        <li>Parse function parameters (price, quantity, proof, etc.)</li>
      </ul>

      <div className="callout callout-info">
        <strong>Tip:</strong> You can also paste a <strong>transaction hash</strong> in the
        &quot;Load from TX&quot; field to auto-fill everything from an existing mint transaction.
      </div>

      <h3>3. Configure Parameters</h3>
      <ul>
        <li><strong>Function</strong> — Select the mint function from the dropdown</li>
        <li><strong>Price per unit</strong> — The mint price in native tokens (ETH, ANIME, etc.)</li>
        <li><strong>Quantity</strong> — Number of NFTs to mint per wallet (if supported)</li>
        <li><strong>Arguments</strong> — Additional parameters auto-filled from the ABI</li>
      </ul>

      <h3>4. Gas Strategy</h3>
      <p>Choose a gas strategy based on mint competitiveness:</p>
      <div className="grid grid-cols-2 gap-3 my-4">
        {[
          { name: 'Eco', desc: 'Minimum gas — may take a few blocks. For non-competitive mints.' },
          { name: 'Normal', desc: 'Reliable inclusion. Good default for most mints.' },
          { name: 'Fast', desc: 'Top of block. For moderately competitive mints.' },
          { name: 'Turbo', desc: 'First in block. Maximum priority. For gas wars.' },
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
        If the simulation fails (e.g. mint not started yet), it retries every 2 seconds
        until the simulation passes, then sends the real transaction.
      </p>
      <p>
        This is perfect for <strong>scheduled mints</strong> — set it up before the mint starts,
        and the bot will automatically execute as soon as the contract allows it.
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
        <li>Pre-fetch gas data and estimate gas once</li>
        <li>Fetch nonces for all wallets in batches</li>
        <li>Send all transactions with optimized gas settings</li>
        <li>Display results in the Transaction Log</li>
      </ol>

      <figure className="screenshot">
        <div className="bg-white/[0.03] rounded-lg h-48 flex items-center justify-center text-gray-600 text-sm">
          Transaction Log showing successful mints with tx hashes
        </div>
        <figcaption>Mint results — 50/50 successful with explorer links</figcaption>
      </figure>

      <h2>SeaDrop Support</h2>
      <p>
        NFTPulse has built-in support for <strong>SeaDrop</strong> contracts (used by OpenSea drops).
        When a SeaDrop contract is detected:
      </p>
      <ul>
        <li>Automatically fetches Merkle proofs for whitelisted wallets</li>
        <li>Fills in the correct mint parameters</li>
        <li>Handles fee recipient configuration</li>
      </ul>

      <div className="callout callout-info">
        <strong>Tip:</strong> After minting, head to <strong>Portfolio</strong> to see your
        newly minted NFTs, or use <strong>Toolbox &rarr; Drain</strong> to collect everything.
      </div>
    </>
  );
}
