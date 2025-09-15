import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, getAccount } from '@solana/spl-token';
import { MovieTicket } from '../types/MovieTicket';
import PaymentModal from './PaymentModal';
import TicketDisplay from './TicketDisplay';
import './MovieTicketApp.css';

const MovieTicketApp: React.FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [tickets, setTickets] = useState<MovieTicket[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieTicket | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mintAddress, setMintAddress] = useState<PublicKey | null>(null);

  // Sample movies data
  const movies: MovieTicket[] = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      description: "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.",
      price: 0.5, // 0.5 SOL
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      showtime: "2024-01-15T19:00:00Z",
      theater: "AMC Century City",
      seat: "A12",
      minted: false
    },
    {
      id: 2,
      title: "Top Gun: Maverick",
      description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past.",
      price: 0.3, // 0.3 SOL
      image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=600&fit=crop",
      showtime: "2024-01-16T20:30:00Z",
      theater: "Regal LA Live",
      seat: "B8",
      minted: false
    },
    {
      id: 3,
      title: "Black Panther: Wakanda Forever",
      description: "The nation of Wakanda is pitted against intervening world powers as they mourn the loss of their king T'Challa.",
      price: 0.4, // 0.4 SOL
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      showtime: "2024-01-17T18:00:00Z",
      theater: "Cinemark Baldwin Hills",
      seat: "C15",
      minted: false
    }
  ];

  useEffect(() => {
    setTickets(movies);
  }, []);

  const handleBuyTicket = async (movie: MovieTicket) => {
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    setSelectedMovie(movie);
    setShowPayment(true);
  };

  const handlePayment = async (paymentMethod: string) => {
    if (!selectedMovie || !publicKey) return;

    setLoading(true);
    try {
      if (paymentMethod === 'solana') {
        await purchaseWithSolana(selectedMovie);
      } else {
        await purchaseWithCard(selectedMovie);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
      setShowPayment(false);
    }
  };

  const purchaseWithSolana = async (movie: MovieTicket) => {
    if (!publicKey) throw new Error('Wallet not connected');

    // Create a simple transaction to send SOL
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey('11111111111111111111111111111111'), // Replace with your wallet address
        lamports: movie.price * LAMPORTS_PER_SOL,
      })
    );

    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'confirmed');

    // Mint NFT ticket
    await mintTicketNFT(movie);
  };

  const purchaseWithCard = async (movie: MovieTicket) => {
    // Simulate card payment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mint NFT ticket
    await mintTicketNFT(movie);
  };

  const mintTicketNFT = async (movie: MovieTicket) => {
    if (!publicKey) throw new Error('Wallet not connected');

    try {
      // Create a new mint for this ticket
      const mint = await createMint(
        connection,
        publicKey, // payer
        publicKey, // mint authority
        null, // freeze authority
        0 // decimals for NFT
      );

      setMintAddress(mint);

      // Create associated token account
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey, // payer
        mint, // mint
        publicKey // owner
      );

      // Mint 1 token (NFT)
      await mintTo(
        connection,
        publicKey, // payer
        mint, // mint
        tokenAccount.address, // destination
        publicKey, // authority
        1 // amount
      );

      // Update ticket as minted
      setTickets(prev => 
        prev.map(ticket => 
          ticket.id === movie.id 
            ? { ...ticket, minted: true, mintAddress: mint.toString() }
            : ticket
        )
      );

      alert(`Ticket NFT minted successfully! Mint Address: ${mint.toString()}`);
    } catch (error) {
      console.error('NFT minting failed:', error);
      throw error;
    }
  };

  return (
    <div className="movie-ticket-app">
      <header className="app-header">
        <h1>🎬 Movie Ticket NFTs</h1>
        <p>Buy movie tickets as NFTs on Solana</p>
        <div className="wallet-buttons">
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>
      </header>

      <main className="app-main">
        <div className="movies-grid">
          {tickets.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.image} alt={movie.title} className="movie-poster" />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p className="movie-description">{movie.description}</p>
                <div className="movie-details">
                  <p><strong>Theater:</strong> {movie.theater}</p>
                  <p><strong>Showtime:</strong> {new Date(movie.showtime).toLocaleString()}</p>
                  <p><strong>Seat:</strong> {movie.seat}</p>
                  <p className="price"><strong>Price:</strong> {movie.price} SOL</p>
                </div>
                <div className="movie-actions">
                  {movie.minted ? (
                    <div className="minted-status">
                      <span className="minted-badge">✅ NFT Minted</span>
                      {movie.mintAddress && (
                        <TicketDisplay 
                          movie={movie} 
                          mintAddress={movie.mintAddress}
                        />
                      )}
                    </div>
                  ) : (
                    <button 
                      className="buy-button"
                      onClick={() => handleBuyTicket(movie)}
                      disabled={!publicKey}
                    >
                      {publicKey ? 'Buy Ticket' : 'Connect Wallet to Buy'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showPayment && selectedMovie && (
        <PaymentModal
          movie={selectedMovie}
          onClose={() => setShowPayment(false)}
          onPayment={handlePayment}
          loading={loading}
        />
      )}
    </div>
  );
};

export default MovieTicketApp;
