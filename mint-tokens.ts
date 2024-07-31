import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import dotenv from "dotenv";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

dotenv.config();
const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("SECRET_KEY");

// Substitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey(
  "65ZsHqdDSaSrPhTJTmxDVnQFY3M8Jcz9pGmcBByoXHN4"
);

// Substitute in your own, or a friend's token account address, based on the previous step.
const recipientPublicKey = new PublicKey(
  "3c9wNfVnXwQSm29jLZWTex7ejs913ux45Yj46jxDiKkG"
);

async function main() {
  // Ensure recipient's associated token account exists
  const recipientAssociatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipientPublicKey
  );

  console.log(`Recipient Associated Token Account: ${recipientAssociatedTokenAccount.address.toBase58()}`);

  try {
    const transactionSignature = await mintTo(
      connection,
      user,
      tokenMintAccount,
      recipientAssociatedTokenAccount.address,
      user,
      10 * MINOR_UNITS_PER_MAJOR_UNITS
    );

    const link = getExplorerLink("transaction", transactionSignature, "devnet");
    console.log(`✅ Success! Mint Token Transaction: ${link}`);
  } catch (error) {
    console.error("Error minting tokens:", error);
  }
}

main().catch((err) => {
  console.error(err);
});
