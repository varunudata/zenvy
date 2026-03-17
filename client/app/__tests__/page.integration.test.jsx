import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../page';

// Mock Next.js Link component because it usually throws outside of Next.js context
vi.mock('next/link', () => ({
    default: ({ children, href }) => <a href={href}>{children}</a>,
}));

// Mock ProductCard since we only care about integration at page level
vi.mock('../components/ui/ProductCard', () => ({
    default: ({ index }) => <div data-testid={`product-card-${index}`}>Product Card {index}</div>,
}));

describe('Home Page Integration', () => {
    it('renders the hero section correctly', () => {
        render(<Home />);
        const heading = screen.getByText(/Define Your/i);
        expect(heading).toBeInTheDocument();
        const exploreLink = screen.getByRole('link', { name: /Explore Collection/i });
        expect(exploreLink).toHaveAttribute('href', '/shop');
    });

    it('renders 4 product cards in the featured section', () => {
        render(<Home />);
        const newArrivals = screen.getByText(/New Arrivals/i);
        expect(newArrivals).toBeInTheDocument();

        for (let i = 0; i < 4; i++) {
            expect(screen.getByTestId(`product-card-${i}`)).toBeInTheDocument();
        }
    });

    it('renders editorial section correctly', () => {
        render(<Home />);
        const editorialHeading = screen.getByRole('heading', { name: /The Silhouette/i });
        expect(editorialHeading).toBeInTheDocument();

        const shopEditorial = screen.getByRole('link', { name: /Shop Editorial/i });
        expect(shopEditorial).toHaveAttribute('href', '/shop');
    });
});
