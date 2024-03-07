import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Areas from './Areas';

describe('Areas Component', () => {
    const areaList = [
        {name: 'canalave-city-area', url: 'https://pokeapi.co/api/v2/location-area/1/'},
        {name: 'eterna-city-area', url: 'https://pokeapi.co/api/v2/location-area/2/'},
    ];

    test('renders areas with buttons', () => {
        const onClick = jest.fn();
        const onBackClick = jest.fn();
        const {getAllByText, getByText} = render(
            <Areas areaList={areaList} onClick={onClick} onBackClick={onBackClick}/>
        );

        areaList.forEach(area => {
            const areaElements = getAllByText(area.name);
            areaElements.forEach(element => {
                expect(element).toBeInTheDocument();
            });
        });

        const travelButtons = getAllByText('Travel');
        expect(travelButtons).toHaveLength(areaList.length);

        travelButtons.forEach((button, index) => {
            fireEvent.click(button);
            expect(onClick).toHaveBeenCalledWith(areaList[index]);
        });
    });
});
