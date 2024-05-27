Here's the complete and simple documentation for the `generate-keypair.ts` script, including the TypeScript code:

---

## `generate-keypair.ts` Documentation

### Overview

`generate-keypair.ts` is a TypeScript script used to generate a new keypair for Solana blockchain applications. It uses the `@solana/web3.js` library to create and manage the keypair.

### Prerequisites

- Node.js and npm installed on your machine.
- TypeScript installed globally or in your project.
- `@solana/web3.js` library installed in your project.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Anthonyushie/generate-keypair-.git
   cd generate-keypair
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

### Usage

1. **Run the Script**:
   ```bash
   npx esrun generate-keypair.ts
   npx esrun transfer.ts (destination wallet address)
   ```

   This will generate a new keypair and display the public and private keys, it also will transfer SOL from the sender to the recipient if you run the second script..

### Code Explanation

```typescript
import { Keypair } from '@solana/web3.js';

// Generate a new keypair
const keypair = Keypair.generate();

// Display the public and private keys
console.log('Public Key:', keypair.publicKey.toBase58());
console.log('Secret Key:', Buffer.from(keypair.secretKey).toString('hex'));
```

- **Import**: The script imports the `Keypair` class from the `@solana/web3.js` library.
- **Generate Keypair**: It generates a new keypair using the `Keypair.generate()` method.
- **Display Keys**: The script logs the public key in Base58 format and the secret key in hexadecimal format to the console.

### Notes

- Ensure you have the required dependencies installed before running the script.
- The generated secret key should be stored securely and not shared publicly.

### Contact

For issues or contributions, please visit the [GitHub repository](https://github.com/your-username/generate-keypair).

---

This documentation provides a quick and straightforward guide to using the `generate-keypair.ts` script, including installation, usage, and a brief explanation of the code.
