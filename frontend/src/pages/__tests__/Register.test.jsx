// frontend/src/pages/__tests__/Register.test.jsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';
import API from '../../api';

// ✅ Mock the API module
vi.mock('../../api', () => ({
  default: {
    post: vi.fn(),
  },
}));

// ✅ Helper wrapper with router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Register Component', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it('renders register form', () => {
    renderWithRouter(<Register />);
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/emailid/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('shows error on failed registration', async () => {
    API.post.mockRejectedValueOnce({
      response: { data: { message: 'User already exists' } },
    });

    renderWithRouter(<Register />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'ashish' },
    });
    fireEvent.change(screen.getByPlaceholderText(/emailid/i), {
      target: { value: 'ashish@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() =>
      expect(screen.getByText(/user already exists/i)).toBeInTheDocument()
    );
  });

  it('calls API and navigates on successful registration', async () => {
    const mockNavigate = vi.fn();
    const token = 'mocked-token';

    API.post.mockResolvedValueOnce({
      data: { token, username: 'ashish' },
    });

    renderWithRouter(<Register />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'ashish' },
    });
    fireEvent.change(screen.getByPlaceholderText(/emailid/i), {
      target: { value: 'ashish@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(API.post).toHaveBeenCalledWith('/users/register', {
        username: 'ashish',
        emailid: 'ashish@example.com',
        password: '123456',
      });
      expect(localStorage.getItem('token')).toBe(token);
      expect(localStorage.getItem('username')).toBe('ashish');
    });
  });
});
