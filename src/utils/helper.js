import {appColors} from './appColors';
import {Cloudinary} from '@cloudinary/url-gen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function getFilename(url) {
  const parts = url.split('/');
  const imageName = parts[parts.length - 1];
  console.log(imageName); // Output: IMG_20240503_111322.jpg

  return imageName;
}

export const updateColorBasedOnValue = data => {
  const updatedData = data?.map(item => {
    let color = '';
    if (item.name === 'Score') {
      color =
        item.population > 75
          ? '#4CAF50'
          : item.population < 35
          ? appColors.primary
          : '#F3CA52'; // Change color based on population value
    } else if (item.name === 'Total') {
      color = appColors.borderGray; // Change color based on population value
    }
    return {...item, color};
  });

  return updatedData;
};

export function truncateString(str, maxLength) {
  if (str?.length > maxLength) {
    return str?.substring(0, maxLength - 3) + '...';
  } else {
    return str;
  }
}

export const uploadImageToCloudinary = async imagePath => {
  try {
    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'devtrendy',
      },
      api: {
        apiKey: '741628894727182',
        apiSecret: 'n_9-wUMfgSoxNx56GBbzeAXmrhU',
      },
    });

    const result = await cloudinary.image(imagePath);
    const myURL = result.toURL();
    console.log('Uploaded image details:', myURL);
    // Return the URL of the uploaded image

    // Upload image to Cloudinary
    const formData = new FormData();
    formData.append('file', {
      uri: myURL,
      name: getFilename(imagePath),
    });

    const response = await fetch(myURL, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Image uploaded successfully');
      // Handle success
    } else {
      console.error('Error uploading image:', response.statusText);
      // Handle error
    }
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

export function generateRandomString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export const fileExtention = uri => {
  // Split the URI by '.' to get an array of substrings
  const parts = uri.split('.');
  // Get the last element of the array, which should be the file extension
  const fileExtension = parts[parts.length - 1];

  console.log(fileExtension); // Output: "png"
  return fileExtension;
};

export function convertToReadableFormat(num) {
  const absNum = Math.abs(num); // Handle negative numbers
  let formattedNumber = '';

  if (absNum >= 1.0e9) {
    // Number is in billions
    formattedNumber = (num / 1.0e9).toFixed(2) + 'B';
  } else if (absNum >= 1.0e6) {
    // Number is in millions
    formattedNumber = (num / 1.0e6).toFixed(2) + 'M';
  } else if (absNum >= 1.0e3) {
    // Number is in thousands
    formattedNumber = (num / 1.0e3).toFixed(2) + 'k';
  } else {
    // Number is less than 1000
    formattedNumber = num;
  }

  return formattedNumber;
}

export function convertDateFormat(isoDateString) {
  const date = new Date(isoDateString);

  // Array of month names
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Extract the day, month, and year
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Format the date as 'day month year'
  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
}

export function convertArrayToString(array) {
  return array.join(', ');
}

export const getRoutes = async key => {
  const value = await AsyncStorage.getItem(key);
  return value;
};
export const saveRoute = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (e) {
    // saving error
    console.log('something went wrong!!');
  }
};
