import { action, makeObservable, observable } from "mobx";

class DoctorStore {
  departmentId = null;
  list = [];
  currentPage = -1;
  isLastPage = false;

  doctor = null;
  date = null;
  slot = null;

  slots = {};

  constructor() {
    makeObservable(this, {
      departmentId: observable,
      list: observable,
      currentPage: observable,
      isLastPage: observable,
      doctor: observable,
      date: observable,
      slot: observable,
      slots: observable,
      setDepartmentId: action.bound,
      setList: action.bound,
      setCurrentPage: action.bound,
      setIsLastPage: action.bound,
      setDoctor: action.bound,
      setDate: action.bound,
      setSlot: action.bound,
      setSlots: action.bound,
    });
  }

  setDepartmentId(id) {
    this.departmentId = id;
  }

  setList(newList) {
    this.list = newList;
  }

  addList(newList) {
    this.list.push(...newList);
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  setIsLastPage(isLastPage) {
    this.isLastPage = isLastPage;
  }

  setDoctor(doctor) {
    this.doctor = doctor;
  }

  setDate(date) {
    this.date = date;
  }

  setSlot(slot) {
    this.slot = slot;
  }

  setSlots(slots) {
    this.slots = slots;
  }
}

export default DoctorStore;
