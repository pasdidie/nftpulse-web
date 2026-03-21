import Image from 'next/image';

export default function GettingStartedPage() {
  return (
    <>
      <h1>Quick Start</h1>
      <p>
        Get up and running with NFTPulse in under 5 minutes.
        This guide walks you through the entire flow from sign-in to your first mint.
      </p>

      <h2><span className="step-number">1</span> Sign In</h2>
      <p>
        Go to <a href="https://nftpulse-app.xyz" target="_blank" rel="noopener noreferrer">nftpulse-app.xyz</a> and
        click <strong>Sign in with Discord</strong>. You need the beta tester role in our Discord server to access the app.
      </p>

      <figure className="screenshot">
        <Image src="/docs/login.png" alt="NFTPulse login screen" width={1200} height={600} className="w-full rounded-lg" />
        <figcaption>The login page — authenticate with your Discord account</figcaption>
      </figure>

      <h2><span className="step-number">2</span> Create a Wallet Group</h2>
      <p>
        Navigate to <strong>Wallets</strong> in the top nav. Click <strong>+ New Group</strong> to create
        a wallet group. Give it a descriptive name (e.g. &quot;azuki-mint&quot;, &quot;animechain-farm&quot;).
      </p>

      <figure className="screenshot">
        <Image src="/docs/wallets-empty.png" alt="Empty wallet groups page" width={1200} height={400} className="w-full rounded-lg" />
        <figcaption>The Wallets page — click &quot;+ New Group&quot; to get started</figcaption>
      </figure>

      <p>
        Then click <strong>+ Add</strong> on the group card and select <strong>Generate</strong>.
        Enter the number of wallets you want (up to 10,000) and confirm.
      </p>

      <figure className="screenshot">
        <Image src="/docs/wallets-group.png" alt="Wallet group with 5 wallets" width={1200} height={500} className="w-full rounded-lg" />
        <figcaption>A wallet group with 5 generated wallets — showing addresses, labels, and balances per chain</figcaption>
      </figure>

      <div className="callout callout-warning">
        <strong>Important:</strong> After generating wallets, click <strong>Export</strong> to save the
        private keys. This is your only chance to back them up. Losing keys means losing access to those wallets forever.
      </div>

      <h2><span className="step-number">3</span> Fund Your Wallets</h2>
      <p>
        Go to <strong>Toolbox</strong> &rarr; <strong>Distribute</strong> tab. Select your wallet group,
        choose the chain (any EVM chain), paste your <strong>mother wallet private key</strong> (the wallet that holds
        the funds), and set the amount per wallet.
      </p>

      <figure className="screenshot">
        <Image src="/docs/toolbox-distribute.png" alt="Toolbox distribute panel" width={1200} height={500} className="w-full rounded-lg" />
        <figcaption>The Distribute panel — select group, chain, enter private key and amount per wallet</figcaption>
      </figure>

      <p>
        Click <strong>DISTRIBUTE</strong>. The bot sends tokens to each wallet sequentially
        with optimized nonce management. For 100 wallets, this takes about 10-15 seconds.
      </p>

      <div className="callout callout-info">
        <strong>Your private key is never stored.</strong> The mother wallet private key is only used
        in-memory for the operation and discarded immediately after.
      </div>

      <h2><span className="step-number">4</span> Execute a Mint</h2>
      <p>
        Go to the <strong>Mint</strong> page. Configure your mint:
      </p>
      <ol>
        <li>Select your <strong>wallet group</strong> and <strong>chain</strong></li>
        <li>Paste the <strong>contract address</strong> — the bot auto-detects the ABI and mint function</li>
        <li>Or paste a <strong>transaction hash</strong> in &quot;Load from TX&quot; to auto-fill everything</li>
        <li>Set the <strong>price per unit</strong> and choose a <strong>gas strategy</strong></li>
        <li>Optionally enable <strong>Smart Retry</strong> to simulate before sending</li>
        <li>Click <strong>MINT ALL</strong></li>
      </ol>

      <figure className="screenshot">
        <Image src="/docs/mint-bot.png" alt="Mint Bot interface" width={1200} height={600} className="w-full rounded-lg" />
        <figcaption>The Mint Bot — contract address, load from TX, gas strategy (Eco/Normal/Fast/Turbo), Smart Retry toggle, and schedule option</figcaption>
      </figure>

      <h2><span className="step-number">5</span> Drain Everything Back</h2>
      <p>
        After minting, go to <strong>Toolbox</strong> &rarr; <strong>Drain</strong> tab. Select your
        wallet group, chain, and paste your <strong>destination wallet address</strong>.
      </p>

      <figure className="screenshot">
        <Image src="/docs/toolbox-drain.png" alt="Toolbox drain panel" width={1200} height={400} className="w-full rounded-lg" />
        <figcaption>The Drain panel — transfers all NFTs and native tokens from every wallet to your destination</figcaption>
      </figure>

      <p>
        Click <strong>Scan Balances</strong> to preview the total, then <strong>DRAIN ALL</strong>.
        The bot detects all NFTs, transfers them via <code>safeTransferFrom</code>, then sweeps
        remaining native tokens — all in one operation.
      </p>

      <hr />
      <p>
        That&apos;s it! You&apos;ve completed a full mint cycle. Make sure to read the
        <a href="/docs/safety"> Safety & Best Practices</a> page for important security guidelines.
      </p>
    </>
  );
}
