function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Function to generate a random string of given length
  function getRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  // Generate a random JavaScript object
  function generateRandomObject() {
    return {
      id: getRandomNumber(1, 100),
      name: getRandomString(5),
      age: getRandomNumber(18, 50),
      email: getRandomString(8) + '@example.com',
      isActive: Math.random() < 0.5,
    };
  }
  
  // Create a random JavaScript object
  const randomObject = generateRandomObject();
  
  // Convert the object to a JSON string
  const jsonString = JSON.stringify(randomObject);
  
  // Log the JSON string to the console
  console.log(jsonString[0]);