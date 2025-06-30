import { render, screen } from '@testing-library/react';
import Home from '../../appointmentbooking/app/page';

describe('Home', () => {
  it('renders hero headline', () => {
    render(<Home />);
    expect(screen.getByText(/Effortless Appointment Booking/i)).toBeInTheDocument();
  });
  it('renders features section', () => {
    render(<Home />);
    expect(screen.getByText(/Platform Features/i)).toBeInTheDocument();
    expect(screen.getByText(/Multi-Tenant Architecture/i)).toBeInTheDocument();
  });
});
