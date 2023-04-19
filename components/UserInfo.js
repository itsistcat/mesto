export default class UserInfo {
    constructor({ profileName, profileJob }) {
      this._Name = document.querySelector(profileName);
      this._Job = document.querySelector(profileJob);
    }
  
    getUserInfo() {
      return {
        userName: this._Name.textContent,
        userDescription: this._Job.textContent
      }
    }
  
    setUserInfo({ userName, userDescription }) {
      this._Name.textContent = userName;
      this._Job.textContent = userDescription;
    }
  }