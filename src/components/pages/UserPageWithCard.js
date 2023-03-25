import React from "react";
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import EditProfilePopup from "../EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup";
import ImagePopup from "../ImagePopup";
import DeletePopup from "../DeletePopup";
import api from '../../utils/api';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Loader from "../Loader";


function UserPageWithCards (props) {
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsPlacePopupOpen] = React.useState(false);
    const [cardToDelete, setCardToDelete]= React.useState(null);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [isLoader, setIsLoader] = React.useState(false);
    
    
    React.useEffect(()=> {
      setIsLoader(true);
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(res => { 
          const [userInfo, initialCards] = res;
          setCurrentUser(userInfo);
          setCards(initialCards);
        })
        .catch(err => {console.log('Ошибка:' + err)})
        .finally(() => setIsLoader(false))
    }, [])
    
    function handleEditAvatarClick() {setIsEditAvatarPopupOpen(true);}
    function handleEditProfileClick() {setIsEditProfilePopupOpen(true);}
    function handleAddPlaceClick() {setIsPlacePopupOpen(true);}
    function handleCardClick(card) {setSelectedCard(card);}
    function handleDeletePopupOpen(card) {setCardToDelete(card)};
    
    function closeAllPopups() {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsPlacePopupOpen(false);
      setSelectedCard(undefined);
      setCardToDelete(undefined)
    }
  
    function handleCardLike(card) {
      const isLiked = card.likes.some(i=> i._id === currentUser._id);
      const promise = isLiked 
        ? api.deleteLikeCard(card._id) 
        : api.setLikeCard(card._id);
      promise
        .then((newCard) => 
          setCards((cards)=> 
            cards.map((card)=> 
              card._id === newCard._id 
                ? newCard 
                : card )))
      .catch(err => {console.log('Ошибка:' + err)})
    }
  
    function handleCardDelete(card){
      setIsLoader(true);
      api.setDeleteCard(card._id)
      .then(() => setCards((cards) => cards.filter(i => i._id !== card._id)))
      .then(() => closeAllPopups())
      .catch(err => {console.log('Ошибка:' + err)})
      .finally(() => setIsLoader(false))
    }
  
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || cardToDelete
    React.useEffect(()=> {
      function handleCloseEsc(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        } 
      }
      if(isOpen) {
        document.addEventListener("keydown" , handleCloseEsc);
        return () => {
          document.removeEventListener("keydown", handleCloseEsc);
        };
      }
    }, [isOpen])
  
    function handleCloseClickOverlay(evt) {
      if ((evt.target === evt.currentTarget)) {
        closeAllPopups();
      }
    }
  
    function handleUpdateUser(formValues) {
      setIsLoader(true);
      api.setUserInfo(formValues)
        .then(res => {setCurrentUser(res); closeAllPopups()})
        .catch(err => {console.log('Ошибка:' + err)})
        .finally(() => setIsLoader(false))
    }
  
    function handleUpdateAvatar(formValue) {
      setIsLoader(true);
      api.setUserAvatar(formValue)
        .then(res => {setCurrentUser(res); closeAllPopups()})
        .catch(err => {console.log('Ошибка:' + err)})
        .finally(() => setIsLoader(false))
    }
  
    function handleAddPlaceSubmit(formValues) {
      setIsLoader(true);
      api.setNewCard(formValues)
        .then(res => {setCards([res, ...cards]); closeAllPopups()})
        .catch(err => {console.log('Ошибка:' + err)})
        .finally(() => setIsLoader(false))
    }
    
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header 
      to="sign-in"
      text="Выйти"
      email={props.userEmail}
      onClick={props.onClick}
      />
      <Main
        cards = {cards}
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleDeletePopupOpen}
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        handleCloseClickOverlay={handleCloseClickOverlay}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}      
        onClose={closeAllPopups}
        handleCloseClickOverlay={handleCloseClickOverlay}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        handleCloseClickOverlay={handleCloseClickOverlay}
        onAddPlace={handleAddPlaceSubmit}
      />
      <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups}
        handleCloseClickOverlay={handleCloseClickOverlay}
      />
      {/* Вы уверены? */}
      <DeletePopup 
        card={cardToDelete}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
        handleCloseClickOverlay={handleCloseClickOverlay}
      />

      <Loader
        isLoader={isLoader}
      />
    </CurrentUserContext.Provider>
  );
}

export default UserPageWithCards;