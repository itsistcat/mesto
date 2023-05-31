export default class Section {
  constructor({ renderer }, containerSelector) {
      this._renderer = renderer;
      this._containerElement = document.querySelector(containerSelector);
  }

  addNewItem(item) {
      this._containerElement.prepend(item);
  }

  addItem(item) {
      this._containerElement.append(item);
  }

  renderItems(items) {
      items.forEach(item => {
          this._renderer(item);
      });
  }
}  