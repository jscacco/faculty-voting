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
    this.optionMap = {};
  }

  logData() {
    console.log("Title: " + this.state.title);
    console.log("Description: " + this.state.description);
    console.log("Options: " + this.state.options);
  }

  setTitle(title) {
    this.title = title
  }

  setDescription(desc) {
    this.description = desc
  }

  addOption(option){
    this.options = [...this.state.options, option]
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

  setOptions() {
    for(var i = 0; i < this.options.length; i++) {
      this.optionMap[this.options[i]] = 0
    }
  }
}
