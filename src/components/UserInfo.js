export default class UserInfo {
  constructor({ profileName, profileJob, profileAvatar  }) {
    this._name = document.querySelector(profileName);
    this._job = document.querySelector(profileJob);
    this._userAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userDescription: this._job.textContent,
    }
  }

  setUserInfo({ userName, userDescription }) {
    this._name.textContent = userName;
    this._job.textContent = userDescription;
  }

  setUserAvatar(profileAvatar) {
    this._userAvatar.src = profileAvatar;
  }
}