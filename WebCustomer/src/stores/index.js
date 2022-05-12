import { createContext, useContext } from "react";
import BookingStore from "./booking";
import DepartmentStore from "./department";
import DoctorStore from "./doctor";

class RootStore {
  constructor() {
    this.departmentStore = new DepartmentStore(this);
    this.doctorStore = new DoctorStore(this);
    this.bookingStore = new BookingStore(this);
  }
}

const StoresContext = createContext(new RootStore());

export const useStores = () => useContext(StoresContext);
