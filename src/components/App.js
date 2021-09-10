import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';

function App () {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState (
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState (false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState (
    false
  );
  const [selectedCard, setSelectedCard] = React.useState ({});
  const [currentUser, setCurrentUser] = React.useState ({});
  const [cards, setCards] = React.useState ([]);

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen (true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen (true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen (true);
  }

  function handleCardClick (card) {
    setSelectedCard (card);
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen (false);
    setIsEditProfilePopupOpen (false);
    setIsAddPlacePopupOpen (false);
    setSelectedCard ({});
  }

  function handleCardLike (card, isLiked) {
    (isLiked ? api.dislikeCard (card._id) : api.likeCard (card._id))
      .then (newCard => {
        setCards (cards =>
          cards.map (item => (item._id === card._id ? newCard : item))
        );
      })
      .catch (error => console.log (error));
  }

  function handleCardDelete (card) {
    api
      .deleteCard (card._id)
      .then (() => {
        setCards (cards => cards.filter (item => item._id !== card._id));
      })
      .catch (error => console.log (error));
  }

  function handleUpdateUser (currentUser) {
    api
      .changeUserInfo (currentUser.name, currentUser.about)
      .then (response => {
        setCurrentUser (response);
        closeAllPopups ();
      })
      .catch (error => console.log (error));
  }

  function handleUpdateAvatar (currentUser) {
    api
      .changeUserAvatar (currentUser.avatar)
      .then (response => {
        setCurrentUser (response);
        closeAllPopups ();
      })
      .catch (error => console.log (error));
  }

  function handleAddPlaceSubmit (card) {
    api
      .addNewCard (card.name, card.link)
      .then (newCard => {
        setCards ([newCard, ...cards]);
        closeAllPopups ();
      })
      .catch (error => console.log (error));
  }

  React.useEffect (() => {
    Promise.all ([api.getUserInfo (), api.getInitialCards ()])
      .then (([userInfo, initialCards]) => {
        setCurrentUser (userInfo);
        setCards (initialCards);
      })
      .catch (error => console.log (error));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <PopupWithForm
        name="card-delete-confirm"
        title="Вы уверены?"
        buttonText="Да"
      />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </CurrentUserContext.Provider>
  );
}

export default App;
