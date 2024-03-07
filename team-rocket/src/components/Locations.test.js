import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Locations from './Locations';

describe('Locations Component', () => {
    const locationList = [
        { name: 'canalave-city', url: 'https://pokeapi.co/api/v2/location/1/' },
        { name: 'eterna-city', url: 'https://pokeapi.co/api/v2/location/2/' },
    ];

    test('renders locations with buttons', () => {
        const onClick = jest.fn();
        const { getAllByText } = render(<Locations locationList={locationList} onClick={onClick} />);

        // Check if locations are rendered
        locationList.forEach(location => {
            const locationElements = getAllByText(location.name);
            locationElements.forEach(element => {
                expect(element).toBeInTheDocument();
            });
        });

        // Check if buttons are rendered for each location
        const travelButtons = getAllByText('Travel');
        expect(travelButtons).toHaveLength(locationList.length);

        // Simulate button click and check if onClick is called with correct location
        travelButtons.forEach((button, index) => {
            fireEvent.click(button);
            expect(onClick).toHaveBeenCalledWith(locationList[index]);
        });
    });
});