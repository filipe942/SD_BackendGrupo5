import { waitFor } from '@testing-library/react';
import { render, fireEvent, screen } from '@testing-library/react';
import EventsTable from '../components/EventsTable';
import "@testing-library/jest-dom";

jest.mock('@trpc/client', () => {
  const originalModule = jest.requireActual('@trpc/client');
  return {
    ...originalModule,
    createTRPCProxyClient: jest.fn(() => ({
      UpdateEvent: {
        mutate: jest.fn(() => Promise.resolve({ message: 'success' })),
      },
      DeleteEvent: {
        mutate: jest.fn(() => Promise.resolve({ message: 'success' })),
      },
    })),
  };
});

describe('EventsTable', () => {
  const mockEvents = [
    {
      _id: '1',
      local: 'Local A',
      date: new Date('2023-01-01'),
      time: '10:00',
      participants: '100',
    },
  ];

  const mockGetData = jest.fn();

  test('Renders the events table correctly?', () => {
    render(<EventsTable events={mockEvents} getData={mockGetData} />);
  });

  test('Allows editing and saving an event?', async () => {
    render(<EventsTable events={mockEvents} getData={mockGetData} />);

    // Simulate clicking the edit button for the first event
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]); // Click the first edit button

    // Change values in the input fields
    const localInput = screen.getByDisplayValue('Local A');
    fireEvent.change(localInput, { target: { value: 'Local B' } });

    // Now save the event by clicking the save button
    const saveButtons = screen.getAllByText('Save');
    fireEvent.click(saveButtons[0]); // Click the first save button

    // Wait for any asynchronous operations like network requests to complete
    await waitFor(() => expect(mockGetData).toHaveBeenCalledTimes(1));
  });
});
