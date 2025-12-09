import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge Component', () => {
  it('renders correctly with default props', () => {
    render(<Badge>Status</Badge>);
    const badge = screen.getByText(/status/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-gray-100'); // Default variant
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText(/success/i)).toHaveClass('bg-green-100');

    rerender(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText(/warning/i)).toHaveClass('bg-yellow-100');

    rerender(<Badge variant="error">Error</Badge>);
    expect(screen.getByText(/error/i)).toHaveClass('bg-red-100');

    rerender(<Badge variant="info">Info</Badge>);
    expect(screen.getByText(/info/i)).toHaveClass('bg-blue-100');
  });

  it('applies custom class names', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText(/custom/i)).toHaveClass('custom-class');
  });
});
