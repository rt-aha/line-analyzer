/* eslint-disable */ 

const validate = (type, value) => {
  if (value === '') {
    console.error(`${type} can't be empty`)
    return false;
  }

  switch (type) {
    case 'baseURL':
      if (typeof value !== 'string') {
        console.error(`expect ${type} should be given!`)
        return false;
      }
      return true;
    case 'method':
      const valueStr = String(value).toLowerCase();
      const allowedMethods = ['get', 'post', 'put', 'patch', 'delete'];

      if (!allowedMethods.includes(valueStr)) {
        console.error(`${type} must be one of get, post, put, patch, delete!`)
        return false;
      }
      return true
    default:
      console.error('You\'d give a wrong type, type must be init or methods')
      return false;
  }
}


export default validate;