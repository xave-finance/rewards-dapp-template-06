import { Map } from "immutable";
const { REACT_APP_BUILD_MODE } = process.env;
var apiPrefix = "";



export function clearToken() {
  localStorage.removeItem("id_token");
}

export function getToken() {
  try {
    const idToken = JSON.parse(localStorage.getItem("id_token"));
    return new Map({ idToken });
  } catch (err) {
    clearToken();
    return new Map();
  }
}

export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = (number) => {
    return number > 1 ? "s" : "";
  };
  const number = (num) => (num > 9 ? "" + num : "0" + num);
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + " day" + numberEnding(days);
      } else {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return "a few seconds ago";
  };
  return getTime();
}

export function stringToInt(value, defValue = 0) {
  if (!value) {
    return 0;
  } else if (!isNaN(value)) {
    return parseInt(value, 10);
  }
  return defValue;
}
export function stringToPosetiveInt(value, defValue = 0) {
  const val = stringToInt(value, defValue);
  return val > -1 ? val : defValue;
}

export function getUserAddress(param) {
  var ret = param;
  if (param.toString().indexOf("0x", 0) === -1) {
    const apiUrl = apiPrefix + "/idtoaddress?id=" + param;

    return new Promise((resolve, reject) => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          let retA = data.value;
          resolve(retA);
        })
        .catch((error) => {
          console.log(error);
          resolve("0x0000000000000000000000000000000000000000");
        });
    });
  } else {
    return ret;
  }
}

export const convertBalance = (val, f = 2) => Number(val).toFixed(f);
