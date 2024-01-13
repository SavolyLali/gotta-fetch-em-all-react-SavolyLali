# Gotta fetch() 'Em All - Pokemon Encounter Game

Welcome to **Gotta fetch() 'Em All**, a captivating Pokémon encounter game that utilizes the PokéApi to provide an immersive experience for Pokémon enthusiasts. This project allows users to explore various Pokémon locations, initiate encounters, and engage in battles to capture new Pokémon.

## Features

### 1. Explore Locations
Discover the many Pokémon locations on the site. Click on a location to begin your Pokémon adventure.

### 2. Encounter Pokémon
- **Location-based Encounters**: When a user clicks on a location, a random Pokémon encounter begins.
- **Dynamic Disappearance**: The selected location disappears after initiating an encounter.

### 3. Battle System
- **Choose Your Pokémon**: At the start of the encounter, see the name and sprite of all your owned Pokémon. Pick one to battle.
- **Turn-based Battles**: Engage in turn-based battles with the encountered Pokémon until one's HP reaches 0.
- **Damage Calculation**: Damage is calculated using the formula: ((((2/5+2)*B*60/D)/50)+2)*Z/255, where B is the attacker's Attack, D is the defender's Defense, and Z is a random number between 217 and 255.

### 4. Capture Pokémon
- **Capture Mechanism**: If the encountered Pokémon's HP reaches 0 before your Pokémon's, it is captured and added to your Pokémon collection.
- **End of Encounter**: If your Pokémon's HP reaches 0 first, the encounter ends.

### 5. User-Friendly Interface
- **Informative Messages**: Receive messages like "This location doesn't seem to have any Pokémon" if no encounter is available.
- **Return to Locations**: After each encounter, the available locations are displayed for the user to choose their next destination.


Enjoy your Pokémon adventure with **Gotta fetch() 'Em All**!