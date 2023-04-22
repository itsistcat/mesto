export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this._name = document.querySelector(profileName);
    this._job = document.querySelector(profileJob);
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userDescription: this._job.textContent
    }
  }

  setUserInfo({ userName, userDescription }) {
    this._name.textContent = userName;
    this._job.textContent = userDescription;
  }
}