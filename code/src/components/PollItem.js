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
    this.pollType = '';
    this.status = 'pending';
    //this.numInput = 0;
  }

  logData() {
    console.log("Title: " + this.title);
    console.log("Description: " + this.description);
    console.log("Options: " + this.options);
  }

  setType(typ) {
    this.pollType = typ
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

  addPollChoice(option, count=0){
    var opt = {}
    opt["value"] = option;
    opt["count"] = count;
    this.options = [...this.options, opt]
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
      pollType: this.pollType,
      title: this.title,
      description: this.description,
      options: this.options
    }
  }
}
