export default function SafetyPage() {
  return (
    <>
      <h1>Safety & Best Practices</h1>
      <p>
        NFTPulse is a powerful tool. With great power comes great responsibility.
        Follow these guidelines to protect yourself while using the platform.
      </p>

      <div className="callout callout-danger">
        <strong>NFTPulse is in Beta.</strong> While we take security seriously,
        this is early software. Always assume the worst and protect yourself accordingly.
      </div>

      <h2>Use Burner Wallets</h2>
      <p>
        This is the <strong>#1 rule</strong>. Never import or use wallets that hold significant
        assets. NFTPulse generates fresh wallets for you — use those.
      </p>
      <ul>
        <li>Generate dedicated wallet groups for each project/mint</li>
        <li>Only send the exact amount of tokens you need for the mint</li>
        <li>Drain everything back to your main wallet immediately after minting</li>
        <li>Delete wallet groups when you&apos;re done with them</li>
      </ul>

      <h2>Private Key Security</h2>
      <p>
        When you generate wallets, NFTPulse encrypts the private keys with AES-256 before
        storing them. However, you should still:
      </p>
      <ul>
        <li><strong>Export and back up</strong> your private keys immediately after generating wallets</li>
        <li>Store the export file in a secure location (password manager, encrypted drive)</li>
        <li>Never share your private keys with anyone</li>
        <li>The <strong>Mother Wallet Private Key</strong> field in Toolbox is only used in-memory and never stored</li>
      </ul>

      <div className="callout callout-warning">
        <strong>Before deleting a wallet group</strong>, always export private keys first.
        Deletion is permanent — there is no recovery.
      </div>

      <h2>Fund Management</h2>
      <ol>
        <li><strong>Distribute</strong> only what you need — don&apos;t over-fund wallets</li>
        <li><strong>Drain immediately</strong> after a mint is complete</li>
        <li>Use the <strong>Scan Balances</strong> button in Drain mode to verify totals before draining</li>
        <li>Always double-check the <strong>destination wallet address</strong> in Toolbox</li>
      </ol>

      <h2>Gas Management</h2>
      <ul>
        <li>NFTPulse works on <strong>all EVM chains</strong> — gas costs vary greatly between L1 (Ethereum) and L2s</li>
        <li>On L2 chains (Base, AnimeChain, Abstract, MegaETH), gas is very cheap — a small amount goes a long way</li>
        <li>Use the <strong>Eco</strong> gas strategy for non-competitive mints</li>
        <li>Use <strong>Fast</strong> or <strong>Turbo</strong> only for competitive public mints</li>
        <li>The Mint Engine auto-estimates gas — only override if you know what you&apos;re doing</li>
      </ul>

      <h2>During a Mint</h2>
      <ul>
        <li><strong>Smart Retry</strong> — Enable this to simulate transactions before sending. The bot will retry until the simulation passes</li>
        <li><strong>Schedule Mint</strong> — Set the exact start time to avoid being early (wasted gas) or late (sold out)</li>
        <li>Monitor the <strong>Transaction Log</strong> to see which wallets succeeded</li>
        <li>If some wallets fail, you can re-run the mint — it will use the same wallets</li>
      </ul>

      <h2>General Tips</h2>
      <ul>
        <li>Start small — test with 5-10 wallets before scaling to hundreds</li>
        <li>Join the <a href="https://discord.gg/N24YgTBx3V" target="_blank" rel="noopener noreferrer">Discord</a> for real-time support and alerts</li>
        <li>Check the <strong>Dashboard</strong> for an overview of your recent activity</li>
        <li>Report bugs in Discord — you&apos;re helping us build a better tool</li>
      </ul>
    </>
  );
}
