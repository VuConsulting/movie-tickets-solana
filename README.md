# 🎬 Movie Ticket NFTs on Solana

A complete movie ticket NFT system built on Solana blockchain, allowing users to purchase movie tickets as unique NFTs with integrated payment processing.

## ✨ Features

- **🎫 NFT Tickets**: Each movie ticket is minted as a unique NFT
- **💳 Payment Integration**: Support for both SOL payments and credit card payments
- **🔗 Wallet Connection**: Seamless integration with Phantom, Solflare, and other Solana wallets
- **📱 Responsive Design**: Beautiful, mobile-friendly interface
- **🔍 Blockchain Explorer**: Direct links to view NFTs on Solana Explorer
- **📤 Share Functionality**: Easy sharing of ticket NFTs

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Blockchain**: Solana (Devnet)
- **Wallets**: Phantom, Solflare, and more
- **Payments**: SOL + Credit Card simulation
- **Styling**: CSS3 with modern gradients and animations

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Phantom or Solflare wallet

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movie-tickets-solana
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 How It Works

### 1. **Browse Movies**
- View available movies with details
- See showtimes, theaters, and seat information
- Check pricing in SOL

### 2. **Connect Wallet**
- Click "Connect Wallet" button
- Choose from supported Solana wallets
- Authorize the connection

### 3. **Purchase Tickets**
- Select a movie and click "Buy Ticket"
- Choose payment method:
  - **SOL Payment**: Direct blockchain transaction
  - **Credit Card**: Simulated traditional payment
- Confirm the transaction

### 4. **Receive NFT**
- Ticket is automatically minted as an NFT
- NFT appears in your connected wallet
- View detailed ticket information
- Share or transfer your ticket NFT

## 🔧 Smart Contract Details

### NFT Minting Process

1. **Create Mint**: New SPL token mint for each ticket
2. **Token Account**: Create associated token account for user
3. **Mint Token**: Mint exactly 1 token (NFT)
4. **Metadata**: Store ticket information on-chain

### Transaction Flow

```typescript
// 1. Create mint
const mint = await createMint(connection, payer, mintAuthority, freezeAuthority, decimals);

// 2. Create token account
const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection, payer, mint, owner
);

// 3. Mint NFT
await mintTo(connection, payer, mint, tokenAccount.address, authority, 1);
```

## 📱 Supported Wallets

- **Phantom** - Most popular Solana wallet
- **Solflare** - Feature-rich Solana wallet
- **And more** - Extensible wallet adapter system

## 🎨 UI Components

### Movie Card
- Movie poster and information
- Showtime and theater details
- Price display in SOL
- Buy button with wallet connection

### Payment Modal
- Movie summary
- Payment method selection
- SOL or credit card options
- Transaction confirmation

### Ticket Display
- NFT ticket visualization
- Blockchain details
- Mint address and explorer link
- Share functionality

## 🔒 Security Features

- **Wallet Integration**: Secure wallet connection
- **Transaction Signing**: User-controlled transaction approval
- **Input Validation**: Comprehensive form validation
- **Error Handling**: Graceful error management

## 🌐 Network Configuration

Currently configured for **Solana Devnet**:
- Network: `https://api.devnet.solana.com`
- Explorer: `https://explorer.solana.com/?cluster=devnet`

To switch to mainnet, update the network configuration in `App.tsx`.

## 📊 Project Structure

```
src/
├── components/
│   ├── MovieTicketApp.tsx    # Main application component
│   ├── PaymentModal.tsx      # Payment processing modal
│   ├── TicketDisplay.tsx     # NFT ticket display
│   └── *.css                 # Component styles
├── types/
│   └── MovieTicket.ts        # TypeScript interfaces
├── utils/                    # Utility functions
├── App.tsx                   # Root component with wallet providers
└── index.tsx                 # Application entry point
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI
   ```bash
   npm i -g vercel
   ```

2. Deploy
   ```bash
   vercel
   ```

### Deploy to Netlify

1. Build the project
   ```bash
   npm run build
   ```

2. Upload `build` folder to Netlify

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_SOLANA_RPC_URL=https://api.devnet.solana.com
REACT_APP_TREASURY_WALLET=your-treasury-wallet-address
```

### Customization

- **Movies**: Update movie data in `MovieTicketApp.tsx`
- **Styling**: Modify CSS files for custom themes
- **Payment**: Integrate real payment processors
- **Network**: Switch between devnet/testnet/mainnet

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join community discussions
- **Documentation**: Check Solana docs for blockchain integration

## 🔮 Future Features

- **Real Payment Processing**: Stripe/PayPal integration
- **Secondary Market**: Ticket resale functionality
- **Mobile App**: React Native version
- **Analytics**: Usage and transaction tracking
- **Admin Panel**: Movie management interface

---

**Built with ❤️ for the Solana ecosystem**