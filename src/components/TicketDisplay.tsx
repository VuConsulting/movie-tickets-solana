import React, { useState } from 'react';
import { MovieTicket } from '../types/MovieTicket';
import './TicketDisplay.css';

interface TicketDisplayProps {
  movie: MovieTicket;
  mintAddress: string;
}

const TicketDisplay: React.FC<TicketDisplayProps> = ({ movie, mintAddress }) => {
  const [showDetails, setShowDetails] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="ticket-display">
      <div className="ticket-card">
        <div className="ticket-header">
          <h3>🎫 Your Movie Ticket NFT</h3>
          <button 
            className="toggle-details"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        <div className="ticket-content">
          <img src={movie.image} alt={movie.title} className="ticket-poster" />
          <div className="ticket-info">
            <h4>{movie.title}</h4>
            <p><strong>Theater:</strong> {movie.theater}</p>
            <p><strong>Showtime:</strong> {new Date(movie.showtime).toLocaleString()}</p>
            <p><strong>Seat:</strong> {movie.seat}</p>
            <p><strong>Price Paid:</strong> {movie.price} SOL</p>
          </div>
        </div>

        {showDetails && (
          <div className="ticket-details">
            <div className="nft-info">
              <h4>NFT Information</h4>
              <div className="mint-address">
                <label>Mint Address:</label>
                <div className="address-container">
                  <code>{mintAddress}</code>
                  <button 
                    className="copy-button"
                    onClick={() => copyToClipboard(mintAddress)}
                  >
                    📋
                  </button>
                </div>
              </div>
              <p className="nft-description">
                This is your unique movie ticket NFT stored on the Solana blockchain. 
                You can view it in your wallet or transfer it to others.
              </p>
            </div>

            <div className="blockchain-info">
              <h4>Blockchain Details</h4>
              <p><strong>Network:</strong> Solana Devnet</p>
              <p><strong>Token Standard:</strong> SPL Token</p>
              <p><strong>Supply:</strong> 1 (Unique NFT)</p>
              <p><strong>Status:</strong> ✅ Minted Successfully</p>
            </div>
          </div>
        )}

        <div className="ticket-actions">
          <button 
            className="view-wallet-button"
            onClick={() => window.open(`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`, '_blank')}
          >
            View on Solana Explorer
          </button>
          <button 
            className="share-button"
            onClick={() => {
              const shareText = `I just bought a movie ticket NFT for ${movie.title}! 🎬\nMint Address: ${mintAddress}`;
              navigator.clipboard.writeText(shareText);
              alert('Share text copied to clipboard!');
            }}
          >
            Share Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDisplay;
