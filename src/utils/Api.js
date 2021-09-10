class Api {
    constructor({ baseUrl, token }) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                headers: {
                    authorization: `${this._token}`
                }
            })
            .then(response => this._checkApiRequest(response));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: {
                    authorization: `${this._token}`
                }
            })
            .then(response => this._checkApiRequest(response));
    }

    changeUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(response => this._checkApiRequest(response));
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(response => this._checkApiRequest(response));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => this._checkApiRequest(response));
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => this._checkApiRequest(response));
    }

    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => this._checkApiRequest(response));
    }

    changeUserAvatar(avatarUrl) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: `${this._token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: avatarUrl
                })
            })
            .then(response => this._checkApiRequest(response));
    }

    _checkApiRequest(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка запроса: ${response.status}`);
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
    token: '6e25370a-d860-45cc-8100-dac5b577cde2'
});

export default api;