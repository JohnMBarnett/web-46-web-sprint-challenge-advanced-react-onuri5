import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from '@testing-library/user-event';

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm />);
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm />)
    const firstName = screen.getByLabelText(/first name:/i);
    const lastName = screen.getByLabelText(/last name:/i);
    const address = screen.getByLabelText(/address:/i);
    const city = screen.getByLabelText(/city:/i);
    const state = screen.getByLabelText(/state:/i);
    const zip = screen.getByLabelText(/zip:/i);
    
    userEvent.type(firstName, 'John');
    userEvent.type(lastName, 'Barnett');
    userEvent.type(address, '123 shaky blvd');
    userEvent.type(city, 'Dallas');
    userEvent.type(state, 'Tx');
    userEvent.type(zip, '76201');

    const button = await screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const message = screen.getByTestId('successMessage');
        const firstNameDisplay = screen.queryByText(/john/i);
        const lastNameDisplay = screen.queryByText(/Barnett/i);
        const addressDisplay = screen.queryByText(/123 shaky blvd/i);
        const cityDisplay = screen.queryByText(/Dallas/i);
        const stateDisplay = screen.queryByText(/Tx/i);
        const zipDisplay = screen.queryByText(/76201/i);

        expect(message).toHaveTextContent(/You have ordered some plants! Woo-hoo!/i);
        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(addressDisplay).toBeInTheDocument();
        expect(cityDisplay).toBeInTheDocument();
        expect(stateDisplay).toBeInTheDocument();
        expect(zipDisplay).toBeInTheDocument();
    });
});
