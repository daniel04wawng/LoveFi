# LoveFi

A playful, on-chain dating and commitment app that helps real people find each other, make verifiable commitments, and celebrate the journey together.

**Team:** Gargi Pathak, Shanthan Sudhini , Faye Hall , Daniel Wang


## Why we built LoveFi

Modern dating is noisy. People struggle to find partners, verify basic trust signals, and maintain long-term commitment. Ghosting and uncertainty derail otherwise promising connections. LoveFi introduces verifiability and aligned incentives. Couples can commit on-chain by staking tokens, unlock milestone rewards as their relationship ages, and invite friends to stake on the relationship’s success. The pooled stake generates yield that powers rewards and the business model.


## What LoveFi does

1. Couples meet and match inside the app.
2. They commit by staking tokens into a shared on-chain vault.
3. A milestone schedule tracks days together and unlocks rewards as time passes.
4. Friends can stake on the couple’s relationship trajectory for extra social fun.
5. Yield from staked assets funds rewards and the protocol treasury.



## Architecture overview

**Front end.** React with TypeScript provides a fast, mobile-first interface. We use component-level state for UI and a thin client to talk to the blockchain and to agent services.

**On-chain.** Flow is the source of truth. Relationship state, stake vaults, and milestone events are encoded in Cadence smart contracts. Key benefits are resource safety, low fees, and great developer ergonomics.

**Wallet and identity.** Dynamic handles authentication and wallet connection with a smooth, modern UX. Users connect once, then interact with Flow seamlessly from the app.

**Agentic matching.** Artificial Superintelligence Alliance agents power preference intake and partner recommendations. The matching loop uses agent tools to parse profile signals, compare embeddings, and propose candidates while respecting user constraints. This makes discovery feel personal and reduces ghosting by improving the quality of first matches.

---

## How we use Flow

We keep the relationship commitment fully on-chain.

* A **RelationshipRegistry** creates a unique resource for each couple and emits `RelationshipCreated`, `MilestoneReached`, and `StakeChanged` events.
* A **LoveStakeVault** holds the staked tokens for a pair. Stake can be increased or withdrawn according to contract rules. Timelocks and grace periods discourage rage quits and reward honest participation.
* A **MilestoneOracle** reads the on-chain relationship age and mints milestone NFTs or releases rewards at day 7, day 30, day 100, and beyond. These milestones drive the UI ring you see in the app.

Contracts are written in **Cadence**, deployed to **Flow testnet** first, and then promoted to mainnet after audits.

flowscan : https://evm-testnet.flowscan.io/tx/0xf29224b7a3795a893a2b0e4fd24df6c66fe801022e6b1f3e367a24ea73867358
---

## Wallet connection with Dynamic

Dynamic provides the authentication, session, and wallet connection layer. In the app, users click Connect and Dynamic returns a ready session. The client then talks to Flow through our adapter. This removes boilerplate, gives us a clean login flow, and keeps future multi-chain options open.

---

## Agentic matching with Artificial Superintelligence Alliance

We integrate ASI Alliance agent tooling to power partner discovery. Agents collect structured preferences, embed profiles, and run agent-to-agent ranking to suggest compatible partners. The result is fewer cold starts, fewer mismatches, and a more respectful first contact flow.

---

## Core features

* Relationship creation, stake, and milestone tracking on Flow
* Wallet login and session management with Dynamic
* Agent-powered match suggestions using ASI Alliance tools
* Social staking from friends that adds fun and improves protocol liquidity
* Yield capture from pooled stakes that funds rewards and revenue

---

## Tech stack

* React
* TypeScript and JavaScript
* Flow blockchain
* Cadence smart contracts
* Flow Client Library
* Dynamic wallet SDK
* ASI Alliance agent tools
* Vite for local dev and bundling
* CSS modules or Tailwind for styling
* Optional Node scripts for deploy automation

---
