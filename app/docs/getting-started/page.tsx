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
        <div className="bg-white/[0.03] rounded-lg h-48 flex items-center justify-center text-gray-600 text-sm">
          Login screen — Sign in with Discord button
        </div>
        <figcaption>The login page with Discord authentication</figcaption>
      </figure>

      <h2><span className="step-number">2</span> Create a Wallet Group</h2>
      <p>
        Navigate to <strong>Wallets</strong> in the top nav. Click <strong>+ New Group</strong> to create
        a wallet group. Give it a descriptive name (e.g. &quot;azuki-mint&quot;, &quot;animechain-farm&quot;).
      </p>
      <p>
        Then click <strong>+ Add</strong> on the group card and select <strong>Generate</strong>.
        Enter the number of wallets you want (up to 10,000) and confirm.
      </p>

      <div className="callout callout-warning">
        <strong>Important:</strong> After generating wallets, click <strong>Export</strong> to save the
        private keys. This is your only chance to back them up.
      </div>

      <figure className="screenshot">
        <div className="bg-white/[0.03] rounded-lg h-48 flex items-center justify-center text-gray-600 text-sm">
          Wallet group card with Add / Export / Delete buttons
        </div>
        <figcaption>A wallet group showing 100 wallets with balance display</figcaption>
      </figure>

      <h2><span className="step-number">3</span> Fund Your Wallets</h2>
      <p>
        Go to <strong>Toolbox</strong> &rarr; <strong>Distribute</strong> tab. Select your wallet group,
        choose the chain, paste your <strong>mother wallet private key</strong> (the wallet that holds
        the funds), and set the amount per wallet.
      </p>
      <p>
        Click <strong>DISTRIBUTE</strong>. The bot sends tokens to each wallet sequentially
        with optimized nonce management. For 100 wallets, this takes about 10-15 seconds.
      </p>

      <figure className="screenshot">
        <div className="bg-white/[0.03] rounded-lg h-48 flex items-center justify-center text-gray-600 text-sm">
          Distribute panel — chain selector, amount, distribute button
        </div>
        <figcaption>Distributing 0.1 ANIME to 100 wallets</figcaption>
      </figure>

      <h2><span className="step-number">4</span> Execute a Mint</h2>
      <p>
        Go to the <strong>Mint</strong> page. Configure your mint:
      </p>
      <ol>
        <li>Select your <strong>wallet group</strong> and <strong>chain</strong></li>
        <li>Paste the <strong>contract address</strong></li>
        <li>The bot auto-detects the mint function and parameters</li>
        <li>Set the <strong>price per unit</strong> and <strong>gas strategy</strong></li>
        <li>Optionally enable <strong>Smart Retry</strong> to simulate before sending</li>
        <li>Click <strong>MINT ALL</strong></li>
      </ol>

      <figure className="screenshot">
        <div className="bg-white/[0.03] rounded-lg h-48 flex items-center justify-center text-gray-600 text-sm">
          Mint panel — contract address, function, gas strategy, MINT ALL button
        </div>
        <figcaption>Mint configuration with auto-detected contract parameters</figcaption>
      </figure>

      <h2><span className="step-number">5</span> Drain Everything Back</h2>
      <p>
        After minting, go to <strong>Toolbox</strong> &rarr; <strong>Drain</strong> tab. Select your
        wallet group, chain, and paste your <strong>destination wallet address</strong>.
      </p>
      <p>
        Click <strong>Scan Balances</strong> to preview the total, then <strong>DRAIN ALL</strong>.
        The bot transfers all NFTs and remaining native tokens back to your wallet.
      </p>

      <figure className="screenshot">
        <div className="bg-white/[0.03] rounded-lg h-48 flex items-center justify-center text-gray-600 text-sm">
          Drain panel — scan balances, drain all NFTs + tokens
        </div>
        <figcaption>Draining NFTs and ANIME tokens back to the main wallet</figcaption>
      </figure>

      <hr />
      <p>
        That&apos;s it! You&apos;ve just completed a full mint cycle. Check the
        <a href="/docs/safety"> Safety & Best Practices</a> page for important security guidelines.
      </p>
    </>
  );
}
