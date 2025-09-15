export interface MovieTicket {
  id: number;
  title: string;
  description: string;
  price: number; // in SOL
  image: string;
  showtime: string; // ISO date string
  theater: string;
  seat: string;
  minted: boolean;
  mintAddress?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'solana' | 'card';
  icon: string;
}
