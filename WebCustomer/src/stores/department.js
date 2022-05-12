import { action, makeObservable, observable } from "mobx";

class DepartmentStore {
  list = [];

  constructor() {
    makeObservable(this, {
      list: observable,
      setList: action.bound,
    });
  }

  setList(newList) {
    this.list = newList;
  }
}

export default DepartmentStore;
