type TServerResponse = {
  statusCode: 200 | 400 | 500 | 401 | 201 | 204 | 226 | 429;
  status: "success" | "error";
  title: string;
  message: string;
  data?: any;
  pageData?: any;
};
