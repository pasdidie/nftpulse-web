export default function DocsOverview() {
  return (
    <>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-950/50 border border-green-500/30 text-green-400 text-xs font-medium uppercase tracking-widest mb-6">
        Documentation
      </div>

      <h1>NFTPulse Documentation</h1>
      <p>
        Welcome to the NFTPulse documentation. This guide covers everything you need to know
        to use the platform — from creating your first wallet group to executing multi-wallet
        mints and managing your NFT portfolio across chains.
      </p>

      <div className="callout callout-warning">
        <strong>Beta Software</strong> — NFTPulse is currently in private beta. Features may change,
        and we recommend using <strong>burner wallets</strong> with limited funds. Never use wallets
        that hold significant assets.
      </div>

      <h2>What is NFTPulse?</h2>
      <p>
        NFTPulse is a <strong>non-custodial, multi-chain NFT minting bot</strong> that lets you
        manage thousands of wallets, execute mints at scale, and manage your NFT portfolio — all
        from a single dashboard.
      </p>

      <h3>Key Features</h3>
      <ul>
        <li><strong>Multi-Wallet Management</strong> — Create and manage up to 10,000 wallets per group</li>
        <li><strong>Mint Engine</strong> — Execute mints across all wallets simultaneously with gas optimization</li>
        <li><strong>Toolbox</strong> — Distribute, collect, and drain tokens and NFTs in bulk</li>
        <li><strong>Portfolio</strong> — Track all your NFTs across every supported chain</li>
        <li><strong>5 EVM Chains</strong> — Ethereum, Base, MegaETH, Abstract, AnimeChain</li>
      </ul>

      <h2>How It Works</h2>
      <p>The typical workflow is:</p>
      <ol>
        <li><strong>Sign in</strong> with your Discord account (you need the beta role)</li>
        <li><strong>Create a wallet group</strong> and generate wallets</li>
        <li><strong>Distribute</strong> native tokens to your wallets using the Toolbox</li>
        <li><strong>Mint</strong> NFTs across all wallets with the Mint Engine</li>
        <li><strong>Collect/Drain</strong> everything back to your main wallet when done</li>
      </ol>

      <div className="callout callout-info">
        <strong>Non-Custodial</strong> — Your private keys are generated locally, encrypted with AES-256,
        and stored in our database. They are only decrypted in-memory during active operations. We never
        have access to your raw private keys.
      </div>

      <h2>Supported Chains</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
        {[
          { name: 'Ethereum', symbol: 'ETH' },
          { name: 'Base', symbol: 'ETH' },
          { name: 'MegaETH', symbol: 'ETH' },
          { name: 'Abstract', symbol: 'ETH' },
          { name: 'AnimeChain', symbol: 'ANIME' },
        ].map((chain) => (
          <div key={chain.name} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <div>
              <div className="text-sm font-medium text-white">{chain.name}</div>
              <div className="text-[11px] text-gray-500">{chain.symbol}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>Quick Navigation</h2>
      <div className="grid sm:grid-cols-2 gap-4 my-6">
        {[
          { href: '/docs/getting-started', title: 'Quick Start', desc: 'Set up your first wallet group and do your first mint' },
          { href: '/docs/safety', title: 'Safety & Best Practices', desc: 'Important security guidelines for using the bot' },
          { href: '/docs/wallets', title: 'Wallets', desc: 'Create, manage, export, and delete wallet groups' },
          { href: '/docs/mint', title: 'Mint Engine', desc: 'Configure and execute mints across multiple wallets' },
          { href: '/docs/toolbox', title: 'Toolbox', desc: 'Distribute, collect, and drain tokens and NFTs' },
          { href: '/docs/portfolio', title: 'Portfolio', desc: 'View and manage NFTs across all wallets and chains' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-green-500/30 hover:bg-green-500/[0.03] transition-all group"
          >
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-green-400 transition-colors" style={{ marginTop: 0 }}>
              {item.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed" style={{ marginBottom: 0 }}>
              {item.desc}
            </p>
          </a>
        ))}
      </div>
    </>
  );
}
