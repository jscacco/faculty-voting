/*
 *  PollItem class just to store the info needed anywhere
 *  a poll needs to be shown
 *
 */
export default class PollItem {
  constructor() {
    this.options = [];
    this.title = '';
    this.description = '';
    this.showResults = true;
    this.order = -1;
    this.type = '';
    this.status = 'pending';
  }

  logData() {
    console.log("Title: " + this.title);
    console.log("Description: " + this.description);
    console.log("Options: " + this.options);
  }

  setType(typ) {
    this.type = typ
  }

  setStatus(status) {
    this.status = status
  }

  setTitle(title) {
    this.title = title
  }

  setDescription(desc) {
    this.description = desc
  }

  addOption(option){
    this.options = [...this.options, option]
  }

  removeOption(option){
    console.log("Poll item delete option");
  }

  setShowResults(bool) {
    this.showResults = bool
  }

  setOrder(order) {
    this.order = order
  }

  setOptions(options) {
    this.options = options
  }

  getInfo() {
    return {
      type: this.type,
      title: this.title,
      description: this.description,
      options: this.options
    }
  }
}
