export const formattedError = (errorObj) => {
  const error = errorObj?.data?.error;
  const message = errorObj?.data?.message;
  const statusCode = errorObj?.data?.statusCode;
  let alertMessage = error ? error : message;
 
  return statusCode? `${statusCode} : ${alertMessage}`:alertMessage;
};
 
