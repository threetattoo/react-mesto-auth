import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext (CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar"
          />
          <button
            type="button"
            className="profile__button-edit-avatar"
            aria-label="Редактировать аватар"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Редактировать профиль"
            onClick={onEditProfile}
          />
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map (card => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
