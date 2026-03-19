export default function PortfolioPage() {
  return (
    <>
      <h1>Portfolio</h1>
      <p>
        The Portfolio gives you a unified view of all NFTs across every wallet
        and every supported chain. Track, filter, and manage your collection in one place.
      </p>

      <h2>Viewing Your NFTs</h2>
      <p>
        Navigate to <strong>Portfolio</strong> in the top menu. Your NFTs load in two phases:
      </p>
      <ol>
        <li><strong>Phase 1 (instant)</strong> — Loads NFTs from Ethereum, Base, and AnimeChain</li>
        <li><strong>Phase 2 (background)</strong> — Loads remaining chains (Polygon, Arbitrum, Optimism, etc.)</li>
      </ol>
      <p>
        This two-phase approach means you see results immediately without waiting for
        all 13+ chains to respond.
      </p>

      <figure className="screenshot">
        <div className="bg-white/[0.03] rounded-lg h-48 flex items-center justify-center text-gray-600 text-sm">
          Portfolio grid — NFT cards with images, names, collections
        </div>
        <figcaption>Portfolio showing NFTs from multiple wallets and chains</figcaption>
      </figure>

      <h2>Filters</h2>
      <p>Use the filter bar to narrow down your view:</p>
      <ul>
        <li><strong>Search</strong> — Find by NFT name, collection, or token ID</li>
        <li><strong>Chain</strong> — Filter by blockchain (Ethereum, Base, AnimeChain, etc.)</li>
        <li><strong>Group</strong> — Show NFTs from a specific wallet group only</li>
        <li><strong>Collection</strong> — Filter by NFT collection name</li>
        <li><strong>Hide Spam</strong> — Toggle to hide suspicious/spam NFTs (enabled by default)</li>
      </ul>

      <h2>NFT Details</h2>
      <p>
        Click on any NFT card to see details:
      </p>
      <ul>
        <li>Full image/animation preview</li>
        <li>Token metadata (name, description, attributes)</li>
        <li>Wallet and group information</li>
        <li>Current listings and best offers (from OpenSea)</li>
        <li>Floor price of the collection</li>
      </ul>

      <h2>Listing on OpenSea</h2>
      <p>
        From the NFT detail view, you can <strong>list your NFT for sale</strong> directly
        on OpenSea using Seaport. Set your price and duration, and NFTPulse handles
        the Seaport order creation and signing.
      </p>

      <h2>Activity Sidebar</h2>
      <p>
        Click the <strong>Activity</strong> button (top-right of Portfolio) to open the
        activity stream. It shows real-time events across all your wallets:
      </p>
      <ul>
        <li><strong>Sales</strong> — When one of your NFTs sells</li>
        <li><strong>Listings</strong> — When an NFT is listed</li>
        <li><strong>Offers</strong> — Incoming offers on your NFTs</li>
        <li><strong>Transfers</strong> — NFTs moving between wallets</li>
      </ul>

      <h2>Hidden NFTs</h2>
      <p>
        You can hide NFTs you don&apos;t want to see (spam, unwanted airdrops).
        Hidden NFTs are stored locally in your browser and can be revealed
        at any time with the <strong>Show Hidden</strong> toggle.
      </p>

      <h2>Bulk Operations</h2>
      <p>
        Enable <strong>Select Mode</strong> to select multiple NFTs at once, then:
      </p>
      <ul>
        <li><strong>Bulk Hide</strong> — Hide all selected NFTs</li>
        <li><strong>Select All</strong> — Select all visible NFTs</li>
      </ul>

      <div className="callout callout-info">
        <strong>Tip:</strong> Use the Portfolio to verify that your minted NFTs
        arrived in the correct wallets, then use <strong>Toolbox &rarr; Drain</strong>
        to collect them all to your main wallet.
      </div>
    </>
  );
}
