export const MESSAGES = {
  // 200
  success: "success!",
  register: "Signed Up successfully!",
  login: "Logged in successfully!",
  update: "Updated!",
  delete: "Deleted!",
  productCreated: "Product Created",
  productEdited: "Product Edited",
  // 400
  badRequest: "Bad Request!",
  unAuthorized: "You are not authorized!",
  user_exist: "Username already Exists!",
  userNotFound: "Username or password is In-Correct!",
  noMatchPassword: "Current Password is in-correct!",
  forbidden: "Access Denied!",
  fillInp: "Please enter valid Data!",
  fields: "Fill all fields!",
  image: "Please put image!",
  updateProfile: "Profile Updated",
  // 500
  failed: "failed!",
  server: "Server Error!",
};

export const STATUS_CODES = {
  // 200
  success: 200,
  created: 201,
  updated: 202,
  // 400
  badRequest: 400,
  unAuthorized: 401,
  forbidden: 403,
  exist: 422,
  not_found: 404,
  // 500
  server: 500,
};
