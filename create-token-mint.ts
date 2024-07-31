// This uses "@metaplex-foundation/mpl-token-metadata@2" to create tokens
import dotenv from "dotenv";
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
dotenv.config();
const user = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));

console.log(
  `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

// Subtitute in your token mint account
const tokenMintAccount = new PublicKey("65ZsHqdDSaSrPhTJTmxDVnQFY3M8Jcz9pGmcBByoXHN4");

const metadataData = {
  name: "Uliboy",
  symbol: "ULIBOY",
  // Arweave / IPFS / Pinata etc link using metaplex standard for off-chain data
  uri: "https://arweave.net/1234",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
};

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
  [
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    tokenMintAccount.toBuffer(),
  ],
  TOKEN_METADATA_PROGRAM_ID
);

const metadataPDA = metadataPDAAndBump[0];

const transaction = new Transaction();

const createMetadataAccountInstruction =
  createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: tokenMintAccount,
      mintAuthority: user.publicKey,
      payer: user.publicKey,
      updateAuthority: user.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        collectionDetails: null,
        data: metadataData,
        isMutable: true,
      },
    }
  );

transaction.add(createMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [user]
);

const transactionLink = getExplorerLink(
  "transaction",
  transactionSignature,
  "devnet"
);

console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);

const tokenMintLink = getExplorerLink(
  "address",
  tokenMintAccount.toString(),
  "devnet"
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);

































// import { createMint } from "@solana/spl-token";
// import dotenv from "dotenv";
// import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
// import { Connection, clusterApiUrl } from "@solana/web3.js";
// dotenv.config();

// const connection = new Connection(clusterApiUrl("devnet"));

// const user = getKeypairFromEnvironment("SECRET_KEY");

// console.log(
//   `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
// );

// // This is a shortcut that runs:
// // SystemProgram.createAccount
// // token.createInitializeMintInstruction
// // See https://www.soldev.app/course/token-program
// const tokenMint = await createMint(connection, user, user.publicKey, null, 2);

// const link = getExplorerLink("address", tokenMint.toString(), "devnet");

// console.log(`✅ Finished! Created token mint: ${link}`);