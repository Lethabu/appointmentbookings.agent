import { render, screen } from '@testing-library/react';
import Dashboard from '../app/dashboard/page';

describe('Dashboard', () => {
  it('renders dashboard headline', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
