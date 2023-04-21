export default class UserInfo {
    constructor({ profileName, profileJob }) {
      console.log('.profile__name');
      this._userName  = document.querySelector(profileName);
      this._userJob = document.querySelector(profileJob);
    }
  
    getUserInfo() {
      return {
        profileName: this._userName.textContent,
        profileJob: this._userJob.textContent
      }
    }
  
    setUserInfo({ profileName, profileJob }) {
      console.log(this._userName.textContent);
      console.log(this._userJob.textContent);
      this._userName.textContent = profileName;
      this._userJob.textContent = profileJob;

    }
  }