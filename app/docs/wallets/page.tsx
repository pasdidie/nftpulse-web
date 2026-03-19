export default function WalletsPage() {
  return (
    <>
      <h1>Wallets</h1>
      <p>
        The Wallets module is where you create, manage, and organize your wallet groups.
        Each group contains individual wallets that can be used for minting and other operations.
      </p>

      <h2>Wallet Groups</h2>
      <p>
        Wallets are organized into <strong>groups</strong>. A group is a collection of wallets
        that you use together for a specific purpose (e.g. one group per mint project).
      </p>

      <h3>Creating a Group</h3>
      <ol>
        <li>Navigate to <strong>Wallets</strong> in the top menu</li>
        <li>Click <strong>+ New Group</strong></li>
        <li>Enter a name (e.g. &quot;animechain-mint&quot;, &quot;azuki-farm&quot;)</li>
        <li>Click Create</li>
      </ol>

      <h3>Generating Wallets</h3>
      <p>
        Once you have a group, click <strong>+ Add</strong> on the group card, then select
        the <strong>Generate</strong> tab. You can generate up to <strong>10,000 wallets</strong> at once.
      </p>
      <ul>
        <li>Wallets are generated locally using cryptographically secure random keys</li>
        <li>Private keys are encrypted with AES-256 before being stored</li>
        <li>Generated wallets are labeled automatically (gen-1, gen-2, etc.)</li>
      </ul>

      <div className="callout callout-warning">
        <strong>Back up immediately!</strong> After generating wallets, click <strong>Export</strong>
        to download the private keys. This is the only time you can access the raw keys.
      </div>

      <h3>Importing Existing Wallets</h3>
      <p>
        You can also import wallets you already have:
      </p>
      <ul>
        <li><strong>Single import</strong> — Paste a private key and optional label</li>
        <li><strong>Bulk import</strong> — Paste multiple private keys (one per line)</li>
      </ul>

      <h2>Managing Wallets</h2>

      <h3>Viewing Balances</h3>
      <p>
        Expand a wallet group to see individual wallets. Use the <strong>chain selector</strong>
        at the top to check balances on any supported chain. The total balance across all wallets
        is displayed at the top.
      </p>

      <figure className="screenshot">
        <div className="bg-white/[0.03] rounded-lg h-40 flex items-center justify-center text-gray-600 text-sm">
          Expanded wallet group showing balances per wallet with chain selector
        </div>
        <figcaption>Wallet balances on AnimeChain — total and per-wallet breakdown</figcaption>
      </figure>

      <h3>Exporting Private Keys</h3>
      <p>
        Click <strong>Export</strong> on a group card to reveal all private keys. You can then
        copy the full list. The format is: <code>address,privateKey,label</code>
      </p>

      <h3>Deleting Wallets</h3>
      <p>
        You can delete individual wallets or an entire group:
      </p>
      <ul>
        <li><strong>Single wallet</strong> — Click the trash icon next to any wallet in the expanded view</li>
        <li><strong>Entire group</strong> — Click <strong>delete</strong> on the group card. You must type the group name to confirm</li>
      </ul>

      <div className="callout callout-danger">
        <strong>Deletion is permanent.</strong> All private keys will be lost.
        Make sure you&apos;ve exported keys and drained all funds before deleting.
      </div>
    </>
  );
}
