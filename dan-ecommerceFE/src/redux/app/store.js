
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

// ✅ Auth Reducer
const initialAuthState = {
  username: null,
  accessToken: null,
  userId: null,
  isLoggedIn: false,
};

function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        username: action.payload.username,
        accessToken: action.payload.accessToken,
        userId: action.payload.userId,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        username: null,
        accessToken: null,
        userId: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}

const initialCartState = {
  totalPrice: 0,
};

function cartReducer(state = initialCartState, action) {
  switch (action.type) {
    case "SET_TOTAL":
      return {
        ...state,
        totalPrice: action.payload,
      };
    default:
      return state;
  }
}

const initialAddressAddedState = {
  addressAddStatus: false,
};

function addressReducer(state = initialAddressAddedState, action) {
  switch (action.type) {
    case "SET_TRUE":
      return { ...state, addressAddStatus: true };
    case "SET_FALSE":
      return { ...state, addressAddStatus: false };
    default:
      return state;
  }
}

const initialDeliverHereState = {
  addressType: null,
  area: null,
  city: null,
  fullName: null,
  houseNo: null,
  landmark: null,
  phoneNumber: null,
  pincode: null,
  state: null,
  _id: null,
};

function deliveryHereAddress(state = initialDeliverHereState, action) {
  switch (action.type) {
    case "SET_DELIVERY_ADDRESS":
      return {
        ...state,
        addressType: action.payload.addressType,
        area: action.payload.area,
        city: action.payload.city,
        fullName: action.payload.fullName,
        houseNo: action.payload.houseNo,
        landmark: action.payload.landmark,
        phoneNumber: action.payload.phoneNumber,
        pincode: action.payload.pincode,
        state: action.payload.state,
        _id: action.payload._id,
      };
    case "REMOVE_DELIVERY_ADDRESS":
      return {
        ...state,
        addressType: null,
        area: null,
        city: null,   
        fullName: null,
        houseNo: null,
        landmark: null,
        phoneNumber: null,
        pincode: null,
        state: null,
        _id: null,
      };
    default:
      return state;
  }
}



// ⬇️ If you have more reducers, you can add them here
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  addressStatus: addressReducer,
  deliveryAddress:deliveryHereAddress,
});




// ✅ Persist Config
const persistConfig = {
  key: "root",
  storage,
};

// ✅ Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Store & Persistor
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
