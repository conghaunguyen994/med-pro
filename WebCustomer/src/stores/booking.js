import { action, makeObservable, observable } from "mobx";

class BookingStore {
  fullName = null;
  phoneNumber = null;
  email = null;
  idCard = null;
  gender = null;
  birthday = null;

  constructor() {
    makeObservable(this, {
      fullName: observable,
      phoneNumber: observable,
      email: observable,
      idCard: observable,
      gender: observable,
      birthday: observable,
      setFullName: action.bound,
      setPhoneNumber: action.bound,
      setEmail: action.bound,
      setIdCard: action.bound,
      setGender: action.bound,
      setBirthday: action.bound,
    });
  }

  setFullName(val) {
    this.fullName = val;
  }

  setPhoneNumber(val) {
    this.phoneNumber = val;
  }

  setEmail(val) {
    this.email = val;
  }

  setIdCard(val) {
    this.idCard = val;
  }

  setGender(val) {
    this.gender = val;
  }

  setBirthday(val) {
    this.birthday = val;
  }
}

export default BookingStore;
