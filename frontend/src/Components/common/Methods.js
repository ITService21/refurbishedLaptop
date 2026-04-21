import { parse, format } from "date-fns";
import Cookies from "js-cookie";
import dayjs from "dayjs";
export const downloadCsv = (fileTitle, columns = [], data = []) => {
  if (data.length === 0) {
    alert("No data to download.");
    return;
  }
  const csvRows = [];
  const headers = columns.map((col) => col.title);
  csvRows.push(headers.join(","));
  const getNestedValue = (obj, path) => {
    if (typeof path === "string") {
      return obj[path];
    }
    return path.reduce((acc, key) => acc && acc[key], obj);
  };
  data.forEach((row) => {
    const values = columns.map((col) => getNestedValue(row, col.dataIndex));
    csvRows.push(values.join(","));
  });
  const csvContent = `data:text/csv;charset=utf-8,${csvRows.join("\n")}`;
  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = `${fileTitle}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function capitalizeFirstLetterEachWord(text) {
  if (!text || typeof text !== "string") return text;
  return text
    ?.split(" ")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");
}

export function textFormate(text) {
  const formattedText = {
    parking_approved: "Parking Approved",
    hm_rejected: "HM Rejected",
    hm_approved: "HM Approved",
    hm_pending: "HM Pending",
    driver_left: "Driver Left",
    drop_ended: "Drop Ended",
    parked: "Parked",
    pendingprocurement: "Procurement Pending",
    assigned: "Assigned",
    maintainance: "Maintenance",
    "maintainance minor-repair": "Maintenance Minor Repair",
    "maintainance major-repair": "Maintenance Major Repair",
    "under-recovery": "Under Recovery",
    recovery_initiated: "Recovery Initiated",
    police_station: "Police Station",
    assigned_requested: "Assign Requested",
    ready_in_workshop: "Ready In Workshop",
    temp_drop: "Temp Drop",
    permanent_drop: "Permanent Drop",
    "verification failed": "Verification Failed",
    "in verification": "In Verification",
    active: "Active",
    captured: "Captured",
    paid: "Paid",
    failed: "Failed",
    ontrip: "On Trip",
    offline: "Offline",
    enroute: "Enroute",
    yes: "Yes",
    no: "No",
    force_recovery_required: "Force Recovery Required",
    no_recovery_required: "No Recovery Required",
    "expiring soon": "Expiring Soon",
    expired: "Expired",
    credit: "Credit",
    waiver: "Waiver",
    debit: "Debit",
    "parking rejected": "Parking Rejected",
    exchange: "Exchange",
    recovery: "Recovery",
    "forced car drop": "Forced Car Drop",
    forced_car_drop: "Forced Car Drop",
    rta: "RTA",
    Rta: "RTA",
    procured: "Procured",
    rtd: "RTD",
    Rtd: "RTD",
    default: "Default",
    pending: "Pending",
    completed: "Completed",
    successful: "Successful",
    verified: "Verified",
    generated: "Generated",
    done: "Done",
    received: "Received",
    rejected: "Rejected",
    blocked: "Blocked",
    requested: "Requested",
    recovered: "Recovered",
    approved: "Approved",
    inactive: "Inactive",
    "va to be assigned": "VA To Be Assigned",
    theft: "Theft",
    "total-loss": "Total Loss",
    "tenure-expired": "Tenure Expired",
    "Car drop": "Car Drop",
    Recovery: "Recovery",
  };
  return formattedText[text];
}

// export function convertToISTFormatted(dateString, time = false) {
//   if (!dateString) return "";

//   const date = new Date(dateString);

//   // Convert to IST
//   const istOffset = 5.5 * 60 * 60 * 1000;
//   const istDate = new Date(date.getTime() + istOffset);

//   const day = String(istDate.getDate()).padStart(2, "0");

//   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
//                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const month = monthNames[istDate.getMonth()];

//   const year = String(istDate.getFullYear()).slice(-2);

//   const datePart = `${day} ${month} '${year}`;

//   if (!time) return datePart;

//   const hours = String(istDate.getHours()).padStart(2, "0");
//   const minutes = String(istDate.getMinutes()).padStart(2, "0");
//   const seconds = String(istDate.getSeconds()).padStart(2, "0");

//   return `${datePart}, ${hours}:${minutes}:${seconds}`;
// }

export function capitalizeWords(str) {
  return str
    ?.split(" ")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    ?.join(" ");
}

// export function generateQueryUrl(params) {
//   console.log(params,'params ')
//   const queryString = Object.entries(params)
//     .filter(
//       ([key, value]) => value !== "" && value !== null && value !== undefined
//     ) // Filter out empty, null, or undefined values
//     .map(
//       ([key, value]) =>
//         `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
//     ) // Encode key-value pairs
//     .join("&");
//   return `${queryString}`;
// }
export function generateQueryUrl(params) {
  const queryString = Object.entries(params)
    .filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined
    ) // Filter out empty, null, or undefined values
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        // If the value is an array, create a key-value pair for each element
        return value.map(
          (val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
        );
      } else {
        // Otherwise, return a single key-value pair
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
    })
    .join("&"); // Join all key-value pairs with '&'

  return `${queryString}`;
}

export function getCSV(dataArray, name, download = true) {
  // Check if the array is not empty
  if (!dataArray.length) return;

  // Extract the keys (header row)
  const headers = Object.keys(dataArray[0]);

  // Create rows for CSV from the data array
  const csvRows = [
    headers.join(","), // Header row
    ...dataArray.map((row) => {
      return headers
        .map((header) => {
          const value = row[header];
          // Handle null or undefined values
          return value === null || value === undefined ? "" : `"${value}"`;
        })
        .join(",");
    }),
  ];

  // Join rows to create a single string
  const csvString = csvRows.join("\n");

  // Create a Blob object with the CSV data
  const blob = new Blob([csvString], { type: "text/csv" });
  const file = new File([blob], "data.csv", { type: "text/csv" });
  if (download) {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name}.csv`; // Specify the file name

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by revoking the object URL after the download
    URL.revokeObjectURL(link.href);
  }
  return file;
}

export const antdTableCSVDownload = (fileTitle, columnData, data) => {
  const updateKeyValue = () => {
    return columnData.map((obj) => ({
      // ...obj,
      dataIndex: obj.dataIndex,
      key: obj.key,
      title: obj.title?.props?.children || obj?.title,
    }));
  };
  const columns = updateKeyValue();

  if (data.length === 0) {
    alert("No data to download.");
    return;
  }
  const csvRows = [];
  const headers = columns.map((col) => col.title);
  csvRows.push(headers.join(","));
  const getNestedValue = (obj, path) => {
    if (typeof path === "string") {
      return obj[path];
    }
    return path.reduce((acc, key) => acc && acc[key], obj);
  };
  data.forEach((row) => {
    const values = columns.map((col) => getNestedValue(row, col.dataIndex));
    csvRows.push(values.join(","));
  });

  const csvContent = `data:text/csv;charset=utf-8,${csvRows.join("\n")}`;
  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = `${fileTitle}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function downloadCSVData(data, name) {
  // Create a blob with the CSV data
  const csvData = data;
  const blob = new Blob([csvData], { type: "text/csv" });

  // Create a link to download the CSV file
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${name}.csv`;
  link.click();
}

export const Devices = (type) => {
  const deviceOrder = ["e-s-m", "s-m", "m-t", "l-t", "l-d", "e-l-d"]; // Ordered list of device types

  // Determine the current device type based on window width
  let currentDevice = "e-l-d";
  if (window.innerWidth < 576) {
    currentDevice = "e-s-m";
  } else if (window.innerWidth < 768) {
    currentDevice = "s-m";
  } else if (window.innerWidth < 992) {
    currentDevice = "m-t";
  } else if (window.innerWidth < 1200) {
    currentDevice = "l-t";
  } else if (window.innerWidth < 1400) {
    currentDevice = "l-d";
  }

  // If a type is provided, check if the current device is equal to or less than the type
  if (type) {
    const currentIndex = deviceOrder.indexOf(currentDevice);
    const typeIndex = deviceOrder.indexOf(type);

    // Return true if currentDevice is less than or equal to the type
    return currentIndex <= typeIndex;
  }

  // Return the current device type if no type is provided
  return currentDevice;
};

export const getDateTime = (
  includeDate = true,
  includeTime = true,
  dateFormat = "YYYY-MM-DD",
  dayOffset = 0
) => {
  const now = new Date();

  // Adjust the date based on the dayOffset parameter
  now.setDate(now.getDate() + dayOffset); // Add the offset to today's date

  let result = "";

  // Format date based on the provided format
  if (includeDate) {
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(now.getDate()).padStart(2, "0");

    // Convert dateFormat to lower case for case-insensitivity
    const format = dateFormat.toLowerCase();

    switch (format) {
      case "yyyy-mm-dd":
        result += `${yyyy}-${mm}-${dd}`;
        break;
      case "dd/mm/yyyy":
        result += `${dd}/${mm}/${yyyy}`;
        break;
      case "mm-dd-yyyy":
        result += `${mm}-${dd}-${yyyy}`;
        break;
      default:
        result += `${yyyy}-${mm}-${dd}`; // Fallback to default
    }
  }

  // Add time if required
  if (includeTime) {
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    if (result) {
      result += " "; // Add a space if date is included
    }
    result += `${hh}:${min}:${ss}`;
  }
  return result.trim(); // Return the final formatted string
};

export const fieldContainsValue = (value) => {
  if (
    !value ||
    value === null ||
    value === "" ||
    (Array?.isArray(value) && value?.length <= 0)
  ) {
    return false;
  } else {
    return true;
  }
};

export const getFormattedLargeNumber = (num, decimalPlaces = 2) => {
  num = parseInt(num);
  if (num <= 1000) {
    return num?.toFixed(decimalPlaces);
  }
  let result = "";

  // If the number is less than 1000, return it as is
  if (num < 1000) {
    return num.toString();
  }

  // Define thresholds for different units
  const units = [
    { value: 1e12, suffix: " T" }, // 1 trillion
    { value: 1e9, suffix: " B" }, // 1 billion
    { value: 1e7, suffix: " Cr" }, // 10 million
    { value: 1e5, suffix: " L" }, // 100 thousand
    { value: 1e3, suffix: " K" }, // 1 thousand
    { value: 1e2, suffix: " hundred" }, // 100
    { value: 1e6, suffix: " M" }, // 1 million
    { value: 1, suffix: "" }, // base case
  ];

  // Iterate through the units to find the appropriate one
  for (let i = 0; i < units.length; i++) {
    if (num >= units[i].value) {
      // Calculate the value in the current unit
      let formattedValue = num / units[i].value;

      // Check if the formatted value is a whole number
      if (formattedValue % 1 === 0) {
        return formattedValue.toFixed(0) + units[i].suffix; // No decimal places
      } else {
        return formattedValue.toFixed(2) + units[i].suffix; // Two decimal places
      }
    }
  }

  return num.toString(); // Fallback for very small numbers
};
// export const setQueries = (newQueries) => {
//   // Get the current URL
//   const currentUrl = new URL(window.location.href);
//   // Get the existing search parameters
//   const searchParams = new URLSearchParams(currentUrl.search);
//   // Append new queries to the existing search parameters
//   for (const key in newQueries) {
//     if (newQueries.hasOwnProperty(key)) {
//       searchParams.set(key, newQueries[key]);
//     }
//   }
//   // Update the URL without reloading the page
//   currentUrl.search = searchParams.toString();
//   window.history.pushState({}, "", currentUrl);
//   // window.history.replaceState({}, "", currentUrl);
// };
export const setQueries = (newQueries) => {
  // Get the current URL
  const currentUrl = new URL(window.location.href);

  // Get the existing search parameters
  const searchParams = new URLSearchParams(currentUrl.search);

  // Update the search parameters with new queries
  for (const key in newQueries) {
    if (newQueries.hasOwnProperty(key)) {
      // Set or update the query parameter
      searchParams.set(key, newQueries[key]);
    }
  }

  // Update the URL's search parameters without reloading the page
  currentUrl.search = searchParams.toString();

  // Replace the current history entry with the updated URL
  window.history.replaceState({}, "", currentUrl.toString());
};

export const getQueries = () => {
  // Get the current URL
  const currentUrl = new URL(window.location.href);

  // Get the existing search parameters
  const searchParams = new URLSearchParams(currentUrl.search);

  // Check if there are any search parameters
  if (!searchParams.has("")) {
    // Create an object to hold the query parameters
    const queries = {};

    // Iterate over the search parameters and populate the object
    for (const [key, value] of searchParams.entries()) {
      queries[key] = value;
    }

    // Return the queries object if there are any parameters
    return Object.keys(queries).length > 0 ? queries : null;
  }

  // Return null if there are no query parameters
  return null;
};
export const getTableFilterQuery = (keys = []) => {
  const currentUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentUrl.search);
  const filteredQueries = [];
  keys.forEach((key) => {
    if (searchParams.has(key)) {
      if (key === "filters") {
        const filtersParam = searchParams.get("filters");
        const queryString = filtersParam.slice(1, -1);
        const pairs = queryString.split(",");
        pairs.forEach((pair) => {
          filteredQueries.push(pair);
        });
      } else if (key === "summary") {
        const filtersParam = searchParams.get("summary");
        const queryString = filtersParam.slice(1, -1);
        const pairs = queryString.split(",");
        pairs.forEach((pair) => {
          filteredQueries.push(pair);
        });
      } else {
        filteredQueries.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(
            searchParams.get(key)
          )}`
        );
      }
    }
  });
  const queryString = filteredQueries.join("&");
  return queryString.length > 0 ? queryString : "";
};

export const removeUrlQuery = (keysToRemove) => {
  // Get the current URL
  const currentUrl = window.location.href;

  // Find the position of the '?' character to separate the base URL from the query string
  const queryStartIndex = currentUrl.indexOf("?");

  // If there is no query string, just return
  if (queryStartIndex === -1) {
    return; // No query parameters to remove
  }

  // Extract the base URL and the query string
  const baseUrl = currentUrl.substring(0, queryStartIndex);
  const queryString = currentUrl.substring(queryStartIndex + 1);

  // Split the query string into key-value pairs
  const queryPairs = queryString.split("&");

  // Create an array to hold the filtered query parameters
  const filteredPairs = [];

  // Check if keysToRemove is an array and has elements
  if (Array.isArray(keysToRemove) && keysToRemove.length > 0) {
    // Create a Set for faster lookup
    const keysToRemoveSet = new Set(keysToRemove);

    // Iterate over the query pairs
    queryPairs.forEach((pair) => {
      const [key] = pair.split("=");
      // If the key is not in the keysToRemove set, keep it
      if (!keysToRemoveSet.has(decodeURIComponent(key))) {
        filteredPairs.push(pair);
      }
    });
  } else {
    // If no keys are provided, remove all keys
    // Do nothing, as filteredPairs will remain empty
  }

  // Construct the new query string
  const newQueryString = filteredPairs.join("&");

  // Update the URL using history.replaceState
  const newUrl = `${baseUrl}${newQueryString ? "?" + newQueryString : ""}`;
  window.history.replaceState({}, "", newUrl);
};

export const keysContainsValues = (
  obj = {},
  value = [],
  multiple = false,
  response = "array"
) => {
  const resultKeys = [];
  const resultObject = {};

  // Function to check if a value matches any in the value array
  const matchesValue = (val) => {
    if (Array.isArray(val)) {
      return val.some((item) => value.includes(item));
    }
    return value.includes(val);
  };

  // Traverse the object
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key];

      // Check if the value matches the condition
      if (matchesValue(val)) {
        if (response === "array") {
          resultKeys.push(key);
        } else if (response === "object") {
          resultObject[key] = val;
        }
      }
    }
  }

  // Return the appropriate response
  return response === "array" ? resultKeys : resultObject;
};

export const textBeautifyFunction = (text = "") => {
  if (typeof text !== "string") return "";

  // Normalize input to lowercase for matching
  const lowerText = text?.toLowerCase();

  // Handle special cases
  if (lowerText?.startsWith("hm_approved")) {
    return (
      "HM Approved" +
      text
        .slice(11)
        .replace(/[_\-.]+/g, " ")
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    );
  }

  if (lowerText?.startsWith("rta")) {
    // Only 'rta' (case insensitive) as a whole word or prefix, then beautify the rest
    return (
      "RTA" +
      text
        .slice(3)
        .replace(/[_\-.]+/g, " ")
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    );
  }

  if (lowerText?.startsWith("rtd")) {
    // Similarly for 'rtd'
    return (
      "RTD" +
      text
        .slice(3)
        .replace(/[_\-.]+/g, " ")
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    );
  }

  if (lowerText?.startsWith("upi")) {
    return "UPI";
  }

  if (lowerText?.startsWith("csv")) {
    return "CSV";
  }
  if(lowerText?.startsWith("pendingprocurement")){
    return "Pending Procurement"
  }

  // Default beautify function for all other cases
  // return text
  //   .replace(/[_\-.]+/g, " ")
  //   .split(" ")
  //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //   .join(" ");

  const acronyms = new Set(["ID", "IFSC"]); // add more as needed

  return text
    .replace(/[_\-.]+/g, " ") // replace underscores, hyphens, dots with space
    .split(" ")
    .map((word) => {
      const upperWord = word.toUpperCase();
      if (acronyms.has(upperWord)) {
        return upperWord;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

export const getDayDate = (day, offset = 0, format = "dd-mm-yyyy") => {
  // Convert the input day to lowercase for consistency
  day = day.toLowerCase();

  // Days of the week mapping
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  // Validate the input day
  if (!daysOfWeek.includes(day)) {
    throw new Error(
      "Invalid day. Please provide a valid day of the week (e.g., 'sunday', 'monday', etc.)."
    );
  }

  // Get today's date
  const today = new Date();
  const todayDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Find the index of the specified day
  const targetDayIndex = daysOfWeek.indexOf(day);

  // Calculate the last occurrence of the specified day
  const daysDifference = (todayDay - targetDayIndex + 7) % 7; // Days until the last occurrence of the target day
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() - (daysDifference + 7 * offset));

  // Helper function to format the date
  const formatDate = (date, format) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    switch (format.toLowerCase()) {
      case "dd-mm-yyyy":
        return `${day}-${month}-${year}`;
      case "mm-dd-yyyy":
        return `${month}-${day}-${year}`;
      case "yyyy-mm-dd":
        return `${year}-${month}-${day}`;
      default:
        throw new Error(
          "Invalid format. Please use 'dd-mm-yyyy', 'mm-dd-yyyy', or 'yyyy-mm-dd'."
        );
    }
  };

  // Format and return the target date
  return formatDate(targetDate, format);
};

export const convertObjToFixedIntegers = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Check if the value is a Date object
        if (obj[key] instanceof Date) {
          // Skip conversion for Date objects
          continue;
        }
        // If the value is an object (not a Date), recursively traverse it
        convertObjToFixedIntegers(obj[key]);
      } else if (typeof obj[key] === "number") {
        // If the value is a number (including decimals), round it to the nearest integer
        obj[key] = Math.round(obj[key]);
      } else if (typeof obj[key] === "string") {
        // Check if the string is in a date format (YYYY-MM-DD)
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (datePattern.test(obj[key])) {
          // Skip conversion for date strings
          continue;
        }
        // If the value is a string, check if it represents a number
        const parsedNumber = parseFloat(obj[key]);
        if (!isNaN(parsedNumber)) {
          // Convert the parsed number to a rounded integer
          obj[key] = Math.round(parsedNumber);
        }
      }
    }
  }
  return obj;
};

export const formatReadableDate = (
  dateInput,
  includeTime = false,
  format = "yyyy-mm-dd",
  monthName = false,
  is2DigitYear= false
) => {
  // Parse the input into a Date object
  const date = new Date(dateInput);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "";
  }

  // Extract date components
  const year = date.getFullYear();
  const month = date.getMonth(); // Months are 0-based
  const day = date.getDate();

  let formattedDate;

  if (monthName) {
    const monthNames = [
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
    if(is2DigitYear){
      const twoDigitYear = String(year)?.slice(2);
    formattedDate = `${day} ${monthNames[month]} ’${twoDigitYear}`;
    }
    else{
      formattedDate = `${day} ${monthNames[month]} ${year}`;
    }
  } else {
    const monthStr = String(month + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");

    // Format the date based on the provided format string
    switch (format) {
      case "yyyy-mm-dd":
        formattedDate = `${year}-${monthStr}-${dayStr}`;
        break;
      case "dd-mm-yyyy":
        formattedDate = `${dayStr}-${monthStr}-${year}`;
        break;
      case "mm-dd-yyyy":
        formattedDate = `${monthStr}-${dayStr}-${year}`;
        break;
      default:
        throw new Error(
          "Unsupported format. Use 'yyyy-mm-dd', 'dd-mm-yyyy', 'mm-dd-yyyy', or monthName=true."
        );
    }
  }

  // If includeTime is true, format the time
  if (includeTime) {
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedTime = date.toLocaleString(undefined, timeOptions);
    return `${formattedDate}, ${formattedTime}`;
  }

  // Return only the formatted date if includeTime is false
  return formattedDate;
};

export const downloadUrlImage = async (url, fileName = "data") => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("There was an error downloading the image:", error);
  }
};
export const indexedMonths = [
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

const getValueFromPath = (obj, path) => {
  if (Array.isArray(path)) {
    return path.reduce((acc, key) => acc && acc[key], obj);
  } else if (typeof path === "string") {
    return path.split(".").reduce((acc, key) => acc && acc[key], obj);
  }
  return undefined;
};
export const verticalHeaderCsvDownload = ({ data, columns, csvTitle }) => {
  const csvRows = [];
  const headers = columns
    .filter((item) => item.show)
    .map((column) => {
      csvRows.push(column.title);
    });
  data.forEach((row) => {
    const values = columns
      .filter((item) => item.show)
      .map((column) => {
        const value = getValueFromPath(row, column.dataIndex);
        return Array.isArray(value) ? value.join(", ") : value;
      });
    for (let index = 0; index < values.length; index++) {
      csvRows[index] = [csvRows[index], values[index]].join(",");
    }
  });
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", `${csvTitle}.csv`);
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const roundToDecimal = (value, decimals = 2) => {
  if (isNaN(value) || value === null || value === undefined) return 0; // Handle invalid cases
  return Number(parseFloat(value).toFixed(decimals));
};

export function formatIndianNumber(value, includeDecimal = true) {
  if (isNaN(value)) return value;

  let [integer, decimal] = value.toString().split(".");

  // Correct regex for Indian numbering system
  integer = integer.replace(/\B(?=(\d{3})(\d{2})*(?!\d))/g, ",");

  return includeDecimal && decimal ? `${integer}.${decimal}` : integer;
}

// export function formatToFinancialContext(num) {
//   if (isNaN(num)) {
//     return "Invalid input";
//   }

//   // Convert the number to a float
//   num = parseFloat(num);

//   // If the number is less than 1000, return it as is
//   if (num < 1000) {
//     return num.toString();
//   }

//   // Define thresholds for different units
//   const units = [
//     { value: 1e12, suffix: " T" }, // 1 trillion
//     { value: 1e9, suffix: " B" }, // 1 billion
//     { value: 1e7, suffix: " Cr" }, // 10 million
//     { value: 1e5, suffix: " L" }, // 100 thousand
//     { value: 1e3, suffix: " K" }, // 1 thousand
//     { value: 1e2, suffix: " hundred" }, // 100
//     { value: 1e6, suffix: " M" }, // 1 million
//     { value: 1, suffix: "" }, // base case
//   ];

//   // Iterate through the units to find the appropriate one
//   for (let i = 0; i < units.length; i++) {
//     if (num >= units[i].value) {
//       // Calculate the value in the current unit
//       let formattedValue = num / units[i].value;

//       // Check if the formatted value is a whole number
//       if (formattedValue % 1 === 0) {
//         return formattedValue.toFixed(0) + units[i].suffix; // No decimal places
//       } else {
//         return formattedValue.toFixed(2) + units[i].suffix; // Two decimal places
//       }
//     }
//   }

//   return num.toString(); // Fallback for very small numbers
// }

export function formatToFinancialContext(num) {
  if (isNaN(num)) {
    return "Invalid input";
  }

  num = parseFloat(num);

  if (num >= 1e7) {
    return (num / 1e7).toFixed(2) + " Cr"; // Crores
  } else if (num >= 1e5) {
    return (num / 1e5).toFixed(2) + " L"; // Lakhs
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + " K"; // Thousands
  } else {
    return num.toString(); // Less than 1,000
  }
}

export function parseCsvFileToArray(file) {
  const fileName = file?.name?.toLowerCase();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    if (!fileName?.endsWith(".csv")) {
      reject(new Error("Only CSV files are supported."));
      return;
    }

    reader.onload = (e) => {
      const text = e?.target?.result;
      const lines = text?.split("\n")?.filter((line) => line?.trim());

      if (lines.length === 0) {
        resolve([]);
        return;
      }

      const headers = parseCsvLine(lines[0]);

      const data = lines
        .slice(1)
        .map((line) => {
          const values = parseCsvLine(line);
          const isEmptyRow = values.every((v) => v === "");
          if (isEmptyRow) return null;

          return headers.reduce((obj, header, i) => {
            obj[header] = values[i] || "";
            return obj;
          }, {});
        })
        .filter(Boolean);

      resolve(data);
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

// Helper to parse a CSV line with quoted fields
function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"'; // escaped quote
      i++; // skip next
    } else if (char === '"') {
      inQuotes = !inQuotes; // toggle quote state
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

export function getTotalOfKeys({ data = [], keys = [] }) {
  const result = {};

  keys?.forEach((keyPath) => {
    const path = keyPath?.split(".");
    const finalKey = path[path.length - 1];

    const total = data.reduce((sum, item) => {
      let value = item;
      for (let key of path) {
        value = value?.[key];
        if (value === undefined) break;
      }
      return sum + (typeof value === "number" ? value : 0);
    }, 0);

    result[finalKey] = (result[finalKey] || 0) + total;
  });

  return result;
}

export const isFieldDisabled = ({
  fieldConfig,
  userRole,
  driverStatus,
  fieldValue,
  updatedValue,
}) => {
  // const rbac = {
  //   'email':{
  //     driver_status:[],
  //     roles:[],
  //     oneTimeEditMode:[],
  //     allTimeEditMode:['finance','admin']
  //   }
  // }
  if (!fieldConfig) return true;

  const {
    driver_status = [],
    oneTimeEditMode = [],
    allTimeEditMode = [],
  } = fieldConfig;

  if (driverStatus && !driver_status.includes(driverStatus)) return true;

  if (allTimeEditMode.includes(userRole)) return false;

  if (oneTimeEditMode.includes(userRole)) {
    const hasFieldValue =
      fieldValue !== undefined && fieldValue !== null && fieldValue !== "";
    const hasUpdatedValue =
      updatedValue !== undefined &&
      updatedValue !== null &&
      updatedValue !== "";

    if (hasFieldValue && !hasUpdatedValue) return true;

    return false;
  }

  return true;
};

export function ManualFilterData(dataArray, filters, columns) {
  // Check if dataArray is an array
  if (!Array.isArray(dataArray)) {
    throw new Error("First argument must be an array.");
  }

  // Check if filters is an object
  if (typeof filters !== "object" || filters === null) {
    throw new Error("Second argument must be an object.");
  }

  // Check if columns is an array
  if (!Array.isArray(columns)) {
    throw new Error("Third argument must be an array.");
  }

  // Create a mapping of column keys to their dataIndex
  const columnMap = {};
  columns.forEach((column) => {
    if (column.dataIndex) {
      columnMap[column.dataIndex] = column.key; // Assuming column has a key property
    }
  });

  // Filter the data based on the filters
  return dataArray.filter((item) => {
    return Object.keys(filters).every((filterKey) => {
      const filterValue = filters[filterKey];
      const dataKey = columnMap[filterKey];

      // If the filter value is null, we skip filtering for that key
      if (filterValue === null) {
        return true;
      }

      // If the filter value is an array, check if the item's value is in the array
      if (Array.isArray(filterValue)) {
        return filterValue.includes(item[dataKey]);
      }

      // Otherwise, check for equality
      return item[dataKey] === filterValue;
    });
  });
}
export function adjustEndDateByMinusOne(rangeStr = "") {
  const [start, end] = rangeStr?.split(" - ");
  const endDate = new Date(end);
  if (isNaN(endDate)) return rangeStr; // Handle invalid date

  // Subtract one day
  endDate?.setDate(endDate?.getDate() - 1);

  // Format to YYYY-MM-DD
  const newEnd = endDate?.toISOString()?.split("T")[0];

  return `${start} - ${newEnd}`;
}

export function subtractDaysFromDate(dateStr, days = 1) {
  const date = new Date(dateStr);
  if (isNaN(date)) return null; // Invalid date

  date?.setDate(date?.getDate() - days);

  // Return in YYYY-MM-DD format
  return date.toISOString().split("T")[0];
}

export const makeRoundOf = (value) => Math.round(value);

// props :-
export const overrideKeyValues = (dataArray, keyName, mappedStatus) => {
  // Check if the dataArray is an array
  if (!Array.isArray(dataArray)) {
    throw new Error("First argument must be an array.");
  }

  // Check if mappedStatus is an object
  if (typeof mappedStatus !== "object" || mappedStatus === null) {
    throw new Error("Third argument must be an object.");
  }

  // Traverse the data array
  return dataArray.map((item) => {
    // Check if the item has the specified key
    if (item?.hasOwnProperty(keyName)) {
      // Override the key's value with the mapped status if it exists
      if (mappedStatus.hasOwnProperty(item[keyName])) {
        item[keyName] = mappedStatus[item[keyName]];
      }
    }
    return item; // Return the modified item
  });
};

export const lowercaseFirstChar = (str) => {
  if (typeof str !== "string") return "";
  return str?.charAt(0).toLowerCase() + str.slice(1);
};

// export const uppercaseFirstChar = (str) => {
//   if (typeof str !== "string") return "";

// export const getShortMonth = (dateString, withDate = false) => {
//   // Create a new Date object from the input date string
//   const date = new Date(dateString);
//   // Array of short month names
//   const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   // Get the month index (0-11)
//   const month = shortMonths[date.getMonth()];
//   if (withDate) {
//     // Return date along with short month (e.g., "07 Jan")
//     // Pad date with leading zero if less than 10
//     const day = date.getDate().toString().padStart(2, "0");
//     return `${day} ${month}`;
//   }

//   // Return just the short month name
//   return month;
// };

export const getShortMonth = (
  dateString,
  withDate = false,
  dateFormat = "yyyy-MM-dd"
) => {
  let date;

  // Remove time component if present
  const dateWithoutTime = dateString.split(" ")[0];

  // Check if the provided format is 'yyyy-dd-mm'
  if (dateFormat === "yyyy-dd-mm") {
    // Split the date string into parts
    const parts = dateWithoutTime.split("-");
    // Rearrange the parts to match 'yyyy-MM-dd' format
    const formattedDateString = `${parts[0]}-${parts[2]}-${parts[1]}`;
    date = parse(formattedDateString, "yyyy-MM-dd", new Date());
  } else {
    // Parse the date using the provided format
    date = parse(dateWithoutTime, dateFormat, new Date());
  }
  if (dateFormat === "yyyy-mm") {
    const parts = dateWithoutTime.split("-");
    const formattedDateString = `${parts[0]}-${parts[1]}-01`;
    date = parse(formattedDateString, "yyyy-MM-dd", new Date());
  }

  // Array of short month names
  const shortMonths = [
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

  // Get the month index (0-11)
  const month = shortMonths[date.getMonth()];

  if (withDate) {
    // Return date along with short month (e.g., "07 Jan")
    // Pad date with leading zero if less than 10
    const day = date.getDate().toString().padStart(2, "0");
    return `${day} ${month}`;
  }

  // Return just the short month name
  return month;
};

export const sortDataByDate = (data, dateKey) => {
  return data
    .slice()
    .sort((a, b) => new Date(a[dateKey]) - new Date(b[dateKey]));
};

export const getObjectKeys = ({ obj, excludeKeys = [] }) => {
  let result = [];
  if (!obj) return [];
  Object.keys(obj).forEach((key) => {
    if (!excludeKeys?.includes(key)) {
      result?.push(key);
    }
  });
  return result;
};

export const uppercaseFirstChar = (str) => {
  if (typeof str !== "string") return "";
  return str?.charAt(0).toUpperCase() + str.slice(1);
};
export const removeUnderscores = (str) => {
  if (typeof str !== "string") return "";
  return str?.replace("_", " ");
};

export function convertToISTFormatted(dateString, time = false) {
  if (!dateString) return "";

  let normalized = dateString.trim();

  // If format is DD/MM/YYYY, convert to YYYY-MM-DD
  const ddmmyyyyMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(normalized);
  if (ddmmyyyyMatch) {
    const [, dd, mm, yyyy] = ddmmyyyyMatch;
    normalized = `${yyyy}-${mm}-${dd}`;
  }

  // Convert "YYYY-MM-DD HH:mm:ss.000000" to ISO-like "YYYY-MM-DDTHH:mm:ss"
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(\.\d+)?$/.test(normalized)) {
    normalized = normalized.replace(" ", "T").split(".")[0];
  }

  const date = new Date(normalized);
  if (isNaN(date.getTime())) return dateString;

  // Convert to IST
  // const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const istOffsetMs = 0;
  const istDate = new Date(date.getTime() + istOffsetMs);

  const day = String(istDate.getDate()).padStart(2, "0");
  const month = istDate.toLocaleString("en-IN", { month: "short" });
  const year = `'${String(istDate.getFullYear()).slice(-2)}`;
  const datePart = `${day} ${month} ${year}`;

  if (!time) return datePart;

  const hours = String(istDate.getHours()).padStart(2, "0");
  const minutes = String(istDate.getMinutes()).padStart(2, "0");
  const seconds = String(istDate.getSeconds()).padStart(2, "0");

  return `${datePart}, ${hours}:${minutes}:${seconds}`;
}

export function reverseISTFormatted(formattedDate) {
  if (!formattedDate) return "";

  // Regex to match date like: 01 Jan '25 or 01 Jan '25, 17:30:00
  const match = formattedDate.match(
    /^(\d{2})\s+([A-Za-z]{3,9})\s+'?(\d{2})'?(?:,\s*(\d{2}):(\d{2}):(\d{2}))?$/
  );

  if (!match) return formattedDate;

  const [_, day, rawMonth, year, hh = "00", mm = "00", ss = "00"] = match;

  const monthStr =
    rawMonth.charAt(0).toUpperCase() + rawMonth.slice(1).toLowerCase();

  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sept: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const month = months[monthStr];
  if (!month) return formattedDate;

  const fullYear = `20${year}`;
  const timeProvided = match[4] !== undefined;

  return timeProvided
    ? `${fullYear}-${month}-${day}T${hh}:${mm}:${ss}`
    : `${fullYear}-${month}-${day}`;
}

const shortForms = ["rta", "Rta", "rtd", "Rtd"]; // Add more as needed

export const transformKeyValue = (data, keys, keyType) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    const newItem = { ...item };

    keys.forEach((key) => {
      const value = newItem[key];
      if (keyType === "String" && typeof value === "string") {
        const lowerValue = value.toLowerCase();

        if (["hm_rejected", "hm_pending", "hm_approved"].includes(lowerValue)) {
          // Special case handling for HM statuses
          newItem[key] = lowerValue
            .replace("hm_", "HM ")
            .replace(/\b(\w)/g, (char) => char.toUpperCase());
        } else if (shortForms.includes(lowerValue)) {
          newItem[key] = value.toUpperCase(); // Convert short form to uppercase
        } else {
          newItem[key] = value
            .replace(/[^a-zA-Z0-9]+/g, " ") // Replace non-alphanumeric chars with space
            .trim()
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
        }
      }
    });
    return newItem;
  });
};

export const capitalizeFirstLetterOfWord = (input = "") => {
  if (!input || typeof input !== "string") return input;
  let a = input
    .replace(/[^a-zA-Z0-9]+/g, " ") // Replace non-alphanumerics with space
    .trim() // Trim spaces
    .split(/\s+/) // Split on space(s)
    .map((word) => {
      const lower = word.toLowerCase();
      if (lower.includes("wagonr")) {
        return "WagonR";
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");

  return a;
};

export const convertToTitleCase = (input) => {
  if (!input || typeof input !== "string") return "";

  const ABBREVIATIONS = new Set(["SD", "HM"]); // Add abbreviations here

  const OVERRIDE_MAP = {
    "rental flat - WagonR": "Rental Flat - WagonR",
    "rental - WagonR": "Rental - WagonR",
    "double driver - WagonR": "Double Driver - WagonR",
    "ownership - 3yr - WagonR": "Ownership - 3yr - WagonR",
    "ownership - 4yr - WagonR": "Ownership - 4yr - WagonR",
    "uber black - WagonR": "Uber Black - WagonR",
    "double driver flat - WagonR": "Double Driver Flat - WagonR",
    DoubleDriverB: "Double DriverB",
    VendorB: "VendorB",
    WagonR: "WagonR",
    // Add more custom mappings as needed
  };

  // Check for exact match in override map (case-sensitive)
  if (OVERRIDE_MAP.hasOwnProperty(input)) {
    return OVERRIDE_MAP[input];
  }

  // Fallback to default logic
  return input
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters (camelCase)
    .trim()
    .split(/\s+/)
    .map((word) => {
      const upper = word.toUpperCase();
      return ABBREVIATIONS.has(upper)
        ? upper
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

// this function help in doing round of if value > 10 and keep up to one decimal if value is lesser then 10 
export const makePercentageRoundof = (value) => {
  value = Number(value);
  if (typeof value !== "number" || isNaN(value)) {
    return value;
  }
  if (value > 10) {
    return Math.round(value);
  } else {
    return Math.round(value * 10) / 10;
  }
};

// this fucntion help if value is les than 1 then shows as it is if more than 1 then do the round off

export const formatPercentage = (percent) => {
  const value = percent * 100;
  return value < 1 ? `${value.toFixed(1)}%` : `${Math.round(value)}%`;
};

export function chartFormatFinancialValue(num) {
  if (isNaN(num)) {
    return "Invalid input";
  }

  num = parseFloat(num);
  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  let formattedValue;

  if (absNum >= 1e7) {
    // Crores
    formattedValue = (absNum / 1e7).toFixed(2).replace(/\.?0+$/, "") + " Cr";
  } else if (absNum >= 1e5) {
    // Lakhs
    formattedValue = (absNum / 1e5).toFixed(2).replace(/\.?0+$/, "") + " L";
  } else if (absNum >= 1e3) {
    // Thousands
    formattedValue = (absNum / 1e3).toFixed(2).replace(/\.?0+$/, "") + " K";
  } else {
    formattedValue = absNum.toString().replace(/\.0+$/, "");
  }

  return sign + formattedValue;
}

export const handleAccessoriesSanity = (arr = []) => {
  let sanitedText = "";
  arr?.forEach((item, index) => {
    sanitedText =
      sanitedText +
      ` ${textBeautifyFunction(item)}${arr?.length - 1 === index ? "" : ","} `;
  });
  return sanitedText;
};

export const formatDateInNumber = (dateString, inputFormat = "YYYY-MM-DD") => {
  if (!dateString) {
    return "";
  }

  let date;

  // Attempt to parse the date. The Date constructor is quite flexible,
  // but for truly arbitrary formats, a dedicated library is better.
  // We'll primarily rely on it here.
  try {
    date = new Date(dateString);

    // Basic validation: Check if the date object is valid
    if (isNaN(date.getTime())) {
      // If the default parsing failed, try a specific parse if inputFormat hints at it
      // For this simple function, we'll just return empty string.
      // For more robust parsing, you'd integrate a library here.
      return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed

    return `${day}/${month}`;
  } catch (error) {
    console.error("Error parsing date:", dateString, error);
    return "";
  }
};

export const universalSort = (array, sortOption = "default") => {
  // Create a shallow copy of the array to avoid modifying the original in place.
  let newArr = [...array];

  // Define a consistent order for different data types.
  // Lower numbers mean higher precedence (come earlier in the sorted list).
  const typeOrder = {
    boolean: 0,
    number: 1,
    string: 2,
    object: 3, // This includes null, arrays, and other objects (like Dates)
    symbol: 4,
    bigint: 5,
    function: 6,
    undefined: 7, // undefined typically goes last
  };

  newArr.sort((a, b) => {
    // --- Step 1: Handle null and undefined consistently ---
    // Push undefined to the very end.
    if (a === undefined && b !== undefined) return 1;
    if (a !== undefined && b === undefined) return -1;
    if (a === undefined && b === undefined) return 0; // Both undefined are equal

    // Push null after defined values but before undefined.
    // We place null after numbers, strings, booleans, but before undefined.
    // For simplicity, we'll place null at the end of 'object' type group.
    if (a === null && b !== null) return 1;
    if (a !== null && b === null) return -1;
    if (a === null && b === null) return 0; // Both null are equal

    // --- Step 2: Compare based on the predefined type order if types are different ---
    const typeA = typeof a;
    const typeB = typeof b;

    // Get the order for each type. If a type is not in typeOrder, give it a very low precedence (Infinity).
    const orderA = typeOrder[typeA] !== undefined ? typeOrder[typeA] : Infinity;
    const orderB = typeOrder[typeB] !== undefined ? typeOrder[typeB] : Infinity;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    // --- Step 3: If types are the same, compare based on the specific type's logic ---
    if (typeA === "number") {
      return a - b; // Numeric comparison
    } else if (typeA === "string") {
      return a.localeCompare(b); // Lexicographical comparison for strings
    } else if (typeA === "boolean") {
      // false comes before true
      return a === b ? 0 : a ? 1 : -1;
    } else if (typeA === "object") {
      // Handle Date objects specifically
      if (a instanceof Date && b instanceof Date) {
        return a.getTime() - b.getTime(); // Compare dates by their timestamp
      }
      // For other generic objects (including arrays, plain objects),
      // fall back to string comparison. This might not always be meaningful
      // depending on the object's toString() implementation.
      try {
        return String(a).localeCompare(String(b));
      } catch (e) {
        // If string conversion or comparison fails, treat them as equal.
        console.warn("Could not meaningfully compare objects:", a, b, e);
        return 0;
      }
    }
    // For 'symbol', 'bigint', 'function', or any other unhandled types,
    // we consider them equal within their own type group.
    return 0;
  });
  if (sortOption.startsWith("date:")) {
    const formatPart = sortOption.substring(5); // Get the part after 'date:'
    if (formatPart === "DD Mon 'YY") {
      newArr = newArr?.map((item) => {
        return reverseISTFormatted(item);
      });
      newArr = newArr.sort((a, b) => a.localeCompare(b));
      newArr = newArr?.map((item) => {
        return convertToISTFormatted(item);
      });
    }
    if (formatPart === "DD Mon 'YY - DD Mon 'YY") {
      newArr = newArr?.map((item) => {
        let startDate = item?.split(" - ")[0];
        let endDate = item?.split(" - ")[1];
        return `${reverseISTFormatted(startDate)} - ${reverseISTFormatted(
          endDate
        )}`;
      });
      newArr = newArr.sort((a, b) => {
        let startDate = a?.split(" - ")[0];
        return startDate.localeCompare(b?.split(" - ")[0]);
      });
      newArr = newArr?.map((item) => {
        let startDate = item?.split(" - ")[0];
        let endDate = item?.split(" - ")[1];
        return `${convertToISTFormatted(startDate)} - ${convertToISTFormatted(
          endDate
        )}`;
      });
    }
    if (formatPart === "DD Mon 'YY HH:MM:SS") {
      newArr = newArr?.map((item) => {
        return reverseISTFormatted(item);
      });
      newArr = newArr.sort((a, b) => a.localeCompare(b));
      newArr = newArr?.map((item) => {
        return convertToISTFormatted(item, true);
      });
    }
  }

  return newArr;
};

export const csvDownloadByLink = async (csvUrl, title = "") => {
  const token = Cookies.get("authToken");
  fetch(csvUrl, {
    headers: {
      Authorization: `carrum ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob(); // important: convert to blob
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = title; // Set the filename here
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // cleanup
    })
    .catch((error) => {
      throw error;
    });
};

export function DateFormatter(dateString, time = false, format = "DD MMM YY") {
  if (!dateString) return "";

  let normalized = dateString.trim();

  // If format is DD/MM/YYYY, convert to YYYY-MM-DD
  const ddmmyyyyMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(normalized);
  if (ddmmyyyyMatch) {
    const [, dd, mm, yyyy] = ddmmyyyyMatch;
    normalized = `${yyyy}-${mm}-${dd}`;
  }

  // Convert "YYYY-MM-DD HH:mm:ss.000000" to ISO-like "YYYY-MM-DDTHH:mm:ss"
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(\.\d+)?$/.test(normalized)) {
    normalized = normalized.replace(" ", "T").split(".")[0];
  }

  const date = new Date(normalized);
  if (isNaN(date.getTime())) return dateString;

  // Convert to IST
  const istOffsetMs = 0; // Change to 5.5 * 60 * 60 * 1000 for actual IST
  const istDate = new Date(date.getTime() + istOffsetMs);

  const day = String(istDate.getDate()).padStart(2, "0");
  const monthShort = istDate.toLocaleString("en-IN", { month: "short" }); // Mar
  const monthLong = istDate.toLocaleString("en-IN", { month: "long" });   // March
  const monthNum = String(istDate.getMonth() + 1).padStart(2, "0");       // 01-12
  const yearFull = String(istDate.getFullYear());                         // 2025
  const yearShort = `'${yearFull.slice(-2)}`;                             // '25

  // Replace format tokens with actual values
  let formattedDate = format
    .replace(/DD/, day)
    .replace(/MMMM/, monthLong)
    .replace(/MMM/, monthShort)
    .replace(/MM/, monthNum)
    .replace(/YYYY/, yearFull)
    .replace(/YY/, yearShort);

  if (!time) return formattedDate;

  const hours = String(istDate.getHours()).padStart(2, "0");
  const minutes = String(istDate.getMinutes()).padStart(2, "0");
  const seconds = String(istDate.getSeconds()).padStart(2, "0");

  return `${formattedDate}, ${hours}:${minutes}:${seconds}`;
}



export const getCurrentDateInfo = (date = null, format = 'YYYY-MM-DD') => {
  const today = date ? new Date(date) : new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-indexed (0 = Jan)
  const currentDay = today.getDate(); // day of month (1–31)

  // Get number of days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  return {
    currentYear,
    currentMonth: currentMonth + 1, // make it 1-indexed for readability
    currentDay,
    daysInMonth,
    daysPassedInMonth: currentDay,
    daysRemainingInMonth: daysInMonth - currentDay,
    currentWeekDay: today.toLocaleString('default', { weekday: 'long' }), // e.g., "Monday"
    currentMonthName: today.toLocaleString('default', { month: 'long' })   // e.g., "June"
  };
};

export const mappedStatus = (value)=>{
  const mapStatus = {
    permanent_drop: "Permanent Drop",
    onboarding_drop: "Onboarding Drop",
    active: "Active",
    temp_drop: "Temp Drop",
    recovered: "Recovered",
    "va to be assigned": "VA to be Assigned",
    inactive: "Inactive",
    recovery_initiated: "Recovery Initiated",
    "in verification": "In Verification",
    verified: "Verified",
    driver_returned: "Driver Returned",
    maintenance_drop: "Maintenance Drop",
  };
  if (mapStatus[value]) {
    return mapStatus[value];
  }
  return value;
}

export const sortAlphabetically = (word) => {
  return [...word].sort((a, b) =>
    a.label.localeCompare(b.label)
  );
};


export const getNestedValue = (obj, path) => {
  const keys = Array.isArray(path)
    ? path
    : typeof path === "string"
      ? path.includes(",")
        ? path.split(",").map(k => k.trim())
        : path.split(".")
      : [];

  return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

export const shiftDateByOffset = (dateStr, format, offset) => {
  const date = dayjs(dateStr, format);
  const shiftedDate = date.add(offset, 'day');
  return shiftedDate.format(format);
};


// export const manualSearch = ({value, key, data,columns,dataIndex}) => {
//   const data_index = columns?.find((item) => item.key === key)?.dataIndex;
//   const filteredData = data?.filter((item) => {
//     if (Array.isArray(data_index)) {
//       return data_index
//         .reduce((acc, currKey) => acc && acc[currKey], item)
//         ?.toString()
//         ?.toLowerCase()
//         ?.includes(value?.toString()?.toLowerCase());
//     } else {
//       return item[data_index]
//         ?.toString()
//         ?.toLowerCase()
//         ?.includes(value?.toString()?.toLowerCase());
//     }
//   });
//   return filteredData;
// };
export const manualSearch = ({ value = '', key, data = [], columns = [] }) => {
  const valueStr = value?.toString()?.toLowerCase();
  const column = columns?.find((item) => item.key === key);
  if (!column) return data; // If column not found, return full data
  if(!value || value === '') return data
  const dataIndex = column.dataIndex;

  return data?.filter((item) => {
    let targetValue;

    if (Array.isArray(dataIndex)) {
      // Traverse nested keys safely
      targetValue = dataIndex.reduce((acc, currKey) => {
        return acc && acc[currKey] !== undefined ? acc[currKey] : null;
      }, item);
    } else {
      targetValue = item?.[dataIndex];
    }

    if (targetValue === null || targetValue === undefined) return false;

    return targetValue
      ?.toString()
      ?.toLowerCase()
      .includes(valueStr);
  });
};
export const manualFilter = ({ filters = {}, data = [], columns = [] }) => {
  return data?.filter((item) => {
    // Check if every filter condition is matched
    return Object.entries(filters).every(([filterKey, filterValues]) => {
      const column = columns.find((col) => col.key === filterKey);
      if (!column) return true; // Skip unknown columns

      const dataIndex = column.dataIndex;

      // Resolve value from item (supports nested dataIndex)
      const targetValue = Array.isArray(dataIndex)
        ? dataIndex.reduce((acc, currKey) => {
            return acc && acc[currKey] !== undefined ? acc[currKey] : null;
          }, item)
        : item?.[dataIndex];

      if (targetValue === null || targetValue === undefined) return false;

      const valueStr = targetValue.toString().toLowerCase();

      // Match if any of the filter values exist in the target string
      return filterValues.some((val) =>
        valueStr.includes(val.toString().toLowerCase())
      );
    });
  });
};


export const openDriverDetailPageWithUuId = (uuid)=>{
  window.location.href = `/driver-details-edit/${uuid}`
}

export const  getDataType = (value)=>{
//   numeric string
// numeric string
// string
// integer
// float
// boolean
// null
// string
// undefined
// array
// object
// function
// date

  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "string") {
    if (!isNaN(value) && value.trim() !== "") return "numeric string";
    return "string";
  }
  if (typeof value === "number") return Number.isInteger(value) ? "integer" : "float";
  if (value instanceof Date) return "date";
  if (typeof value === "object") return "object";
  return typeof value; // handles "boolean", "undefined", "function", "symbol", etc.
}