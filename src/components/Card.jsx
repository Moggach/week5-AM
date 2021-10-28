import React from 'react';
import Counter from './Counter';
import '../css/App.css';

const USER_URL = 'https://api.github.com/users/';

function Card({ name }) {
  const [user, setUser] = React.useState();
  const [cards, addCard] = React.useState([
    {
      id: 43313455,
      name: 'Anna Cunnane',
      avatar_url: 'https://avatars.githubusercontent.com/u/43313455?v=4',
      public_repos: 17,
      html_url: 'https://github.com/Moggach',
    },
    {
      id: 37059,
      name: 'D Sofer',
      avatar_url: 'https://avatars.githubusercontent.com/u/37059?v=4',
      public_repos: 56,
      html_url: 'https://github.com/sofer',
    },
    {
      id: 72146072,
      name: 'Michael Williams',
      avatar_url: 'https://avatars.githubusercontent.com/u/72146072?v=4',
      public_repos: 18,
      html_url: 'https://github.com/MJOW1999',
    },
  ]);

  React.useEffect(() => {
    fetch(USER_URL + name)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);

        return user;
      });
  }, [name]);

  React.useEffect(() => {
    let temp = [...cards];
    temp.push(user);
    addCard(temp);
  }, [user]);

  const cardList = cards.filter((card) => card !== undefined);
  function handleRemove(id) {
    const newList = cardList.filter((card) => card.id !== id);
    addCard(newList);
  }
  return (
    <div>
      {cardList.map((card) => (
        <div className="card" key={card.id}>
          <h1>{card.name}</h1>
          <img className="avatar" src={card.avatar_url} alt={card.name} />
          <p>Repos: {card.public_repos}</p>
          <a href={card.html_url}>Profile 🔗</a>

          <Counter />

          <button
            className="trash-button"
            onClick={() => handleRemove(card.id)}
          >
            Remove this card 🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

export default Card;
