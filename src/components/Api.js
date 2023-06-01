export default class Api {
  constructor(option) {
    this._url = option.url;
    this._headers = option.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }


  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers
    }) 
  }

  editUserInfo(name, about) {
    return this._request(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
  }

  // Обновление аватара
  editUserAvatar(avatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
  }

  getCards() {
    return this._request(`${this._url}cards`, {
      headers: this._headers
    })
  }

  // Добавление новой карточки в галерею
  addNewCards(name, link) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })

  }
  // Удаление карточки
  deleteCards(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  // Добавление лайка
  addLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  // Удаление лайка
  deleteLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }
}