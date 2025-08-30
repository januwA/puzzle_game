// @ts-nocheck
import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from 'react-router-dom';
import { Main, Detail } from './main';

// Helper function to render component with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Main Puzzle Game Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders puzzle game title correctly', () => {
    renderWithRouter(<Main />);
    
    expect(screen.getByText('益智游戏')).toBeInTheDocument();
  });

  it('renders two image links correctly', () => {
    renderWithRouter(<Main />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  it('has proper layout structure with flexbox', () => {
    renderWithRouter(<Main />);
    
    const imageContainer = screen.getAllByRole('img')[0].closest('div');
    expect(imageContainer).toHaveStyle({
      display: 'flex',
      gap: '6px'
    });
  });

  it('has correct image sources', () => {
    renderWithRouter(<Main />);
    
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src');
    expect(images[1]).toHaveAttribute('src');
  });
});

describe('Detail Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders detail title correctly', () => {
    renderWithRouter(<Detail />);
    
    expect(screen.getByText('游戏详情')).toBeInTheDocument();
  });

  it('renders button correctly', () => {
    renderWithRouter(<Detail />);
    
    const button = screen.getByText('btn');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('handles button click and logs to console', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    renderWithRouter(<Detail />);
    
    const button = screen.getByText('btn');
    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith(true); // isEmpty({}) returns true
    
    consoleSpy.mockRestore();
  });

  it('displays id parameter from search params', () => {
    // Mock useSearchParams to return a specific id
    vi.mock('react-router-dom', async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useSearchParams: () => [new URLSearchParams('?id=1')]
      };
    });

    renderWithRouter(<Detail />);
    
    expect(screen.getByText('id:1')).toBeInTheDocument();
  });

  it('renders all detail elements', () => {
    renderWithRouter(<Detail />);
    
    // Check title
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('游戏详情');
    
    // Check button
    expect(screen.getByRole('button')).toHaveTextContent('btn');
    
    // Check id display
    expect(screen.getByText(/id:/)).toBeInTheDocument();
  });
});
