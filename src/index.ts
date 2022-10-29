// link below gives insight on how to do this
// https://github.com/aws-amplify/amplify-js/blob/main/packages/amazon-cognito-identity-js/src/Client.js
let REACT_APP_COGNITO_CLIENT_ID;
const REACT_APP_COGNITO_URL = "";
export const configure = (clientId) => {
  REACT_APP_COGNITO_CLIENT_ID = clientId;
};

export const headers = {
  "X-Amz-User-Agent": "Chrome",
  "Content-Type": "application/x-amz-json-1.1",
};

export enum AuthTarget {
  SignUp = "AWSCognitoIdentityProviderService.SignUp",
  ConfirmSignUp = "AWSCognitoIdentityProviderService.ConfirmSignUp",
  ResendConfirmationCode = "AWSCognitoIdentityProviderService.ResendConfirmationCode",
  InitiateAuth = "AWSCognitoIdentityProviderService.InitiateAuth",
}
export enum CognitoException {
  // sign up exceptions
  UsernameExistsException = "UsernameExistsException",
  // confirm sign up exceptions
  ExpiredCodeException = "ExpiredCodeException",
  CodeMismatchException = "CodeMismatchException",
  TooManyFailedAttemptsException = "TooManyFailedAttemptsException",
  // resend verification exceptions
  TooManyRequestsException = "TooManyRequestsException",
  // default error
  DefaultError = "DefaultError",
}

export const request = async <T>(post: () => Promise<Response>): Promise<T> => {
  try {
    const response = await post();
    const data = await response.json();

    if (response.ok) return data as T;

    if ("__type" in data) {
      throw new CognitoError("response-error", data.__type);
    }

    throw new Error("default error");
  } catch (error) {
    if (error instanceof CognitoError) throw error;

    throw new CognitoError("aws-cognito-error", CognitoException.DefaultError);
  }
};

export const generateRequestShape = (target: AuthTarget, body: Body) => {
  return {
    headers: {
      ...headers,
      "X-Amz-Target": target,
    },
    method: "POST",
    body: JSON.stringify({
      ClientId: REACT_APP_COGNITO_CLIENT_ID,
      ...body,
    }),
  };
};

export const signUp = async (email: string, password: string) => {
  const requestInit = generateRequestShape(AuthTarget.SignUp, {
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
    Username: email,
  });
  const post = createRequestFunction(requestInit);
  return await request<SignUpResponse>(post);
};

export const signIn = async (email: string, password: string) => {
  const requestInit = generateRequestShape(AuthTarget.InitiateAuth, {
    AuthFlow: "USER_PASSWORD_AUTH",
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });
  const post = createRequestFunction(requestInit);
  return await request<any>(post);
};

export const confirmSignUp = async (
  email: string,
  confirmationCode: string
) => {
  const requestInit = generateRequestShape(AuthTarget.ConfirmSignUp, {
    ConfirmationCode: confirmationCode,
    Username: email,
  });
  const post = createRequestFunction(requestInit);
  return await request<Record<string, string>>(post);
};

export const resendConfirmationCode = async (email: string) => {
  const requestInit = generateRequestShape(AuthTarget.ResendConfirmationCode, {
    Username: email,
  });
  const post = createRequestFunction(requestInit);
  return await request<ResendConfirmationResponse>(post);
};

const createRequestFunction = (requestInit: RequestInit) => {
  return async (): Promise<Response> =>
    fetch(REACT_APP_COGNITO_URL, requestInit);
};

/**
 * Post Responses
 **/
export interface ResendConfirmationResponse {
  CodeDeliveryDetails: {
    AttributeName: string;
    DeliveryMedium: string;
    Destination: string;
  };
}
export interface SignUpResponse {
  CodeDeliveryDetails: {
    AttributeName: string;
    DeliveryMedium: string;
    Destination: string;
  };
  UserConfirmed: boolean;
  UserSub: string;
}

/**
 * Post Body
 **/

export type Body = BaseBody | SignUpBody | ConfirmSignUpBody | SignInBody;
export interface BaseBody {
  Username: string;
}
export interface SignInBody {
  AuthFlow: string;
  AuthParameters: {
    USERNAME: string;
    PASSWORD: string;
  };
}
export interface SignUpBody extends BaseBody {
  Password: string;
  UserAttributes: { Name: "email"; Value: string }[];
}
export interface ConfirmSignUpBody extends BaseBody {
  ConfirmationCode: string;
}

/**
 * Error Handling
 **/
export interface CognitoErrorResponse {
  __type: CognitoException;
  message: string;
}

export class CognitoError extends Error {
  constructor(public message: string, public exception: CognitoException) {
    super(message);
  }
}
