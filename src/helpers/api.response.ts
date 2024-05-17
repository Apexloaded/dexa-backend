export interface ApiResponse {
  code?: number;
  data?: object | string | boolean | Array<any> | null;
  message?: string;
}

export function apiResponse(
  code?: number,
  message?: string,
  data?: object | string | boolean | Array<any> | null,
) {
  const response: ApiResponse = {};
  if (!data) {
    response.code = code;
    response.message = message;
    return response;
  }
  response.code = code;
  response.message = message;
  response.data = data;

  return response;
}
