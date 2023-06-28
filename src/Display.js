import React, { useState } from 'react';
import { Container, Col, Row, Button } from "reactstrap";
import './App.css';

const Display = () => {
    const [pokemon, setPokemon] = useState(null);
    const [lastViewed, setLastViewed] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchPokemon = async (id) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            setPokemon(data);
            setLastViewed(pokemon);
        } catch (error) {
            console.log(error);
            setPokemon(null);
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== '' && fetchPokemon(searchQuery)) {
            fetchPokemon(searchQuery);
        } 
    };

    const handleRandom = () => {
        const randomId = Math.floor(Math.random() * 150) + 1;
        fetchPokemon(randomId);
    };

    return (
        <Container fluid className='Background'>
            <Row >
                <Col xs="3" className='Intro'>
                    <h1>Pokémon Search</h1>
                    {/* <div> */}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}

                        />
                        <br />
                        <Button className='SearchButton hoverEff' onClick={handleSearch}>Search</Button>
                        <br />

                        <Button className='SearchButton hoverEff' onClick={handleRandom}>Random Pokémon</Button>
                    {/* </div> */}
                </Col>
                <Col xs="3">
                    <div>

                        {pokemon && (
                            <div className='PokemonCardBackground'>
                                <h2 className=''>{pokemon.name}</h2>
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                <p>#{pokemon.id}</p>
                                <p>Attack: {pokemon.stats[1].base_stat}</p>
                                <p>HP: {pokemon.stats[0].base_stat}</p>
                                <p>Defense: {pokemon.stats[2].base_stat}</p>
                            </div>
                        )}
                    </div>
                </Col>
                <Col xs="3">
                    <div>
                        {lastViewed && (
                            <>
                                <div className='PokemonCardBackgroundLast'>
                                    <h3>{lastViewed.name}</h3>
                                    <img src={lastViewed.sprites.front_default} alt={lastViewed.name} />
                                    <p>#{lastViewed.id}</p>
                                    <p>Attack: {lastViewed.stats[1].base_stat}</p>
                                    <p>HP: {lastViewed.stats[0].base_stat}</p>
                                    <p>Defense: {lastViewed.stats[2].base_stat}</p>
                                </div>
                                <h2>Last Viewed</h2>

                            </>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Display;