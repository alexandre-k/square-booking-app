import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a toolbar, the main application content', () => {
    render(<App />);
    const toolbarElement = screen.getByRole("toolbar");
    const applicationElement = screen.getByRole("application");
    expect(toolbarElement).toBeInTheDocument();
    expect(applicationElement).toBeInTheDocument();
});

test('renders a menu', () => {
    render(<App isMenuOpenDefault={true} />);
    const menuElement = screen.getByRole("menu");
    expect(menuElement).toBeInTheDocument();
});
