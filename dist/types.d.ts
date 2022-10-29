import { Response } from "node-fetch";
export const configure: (clientId: any) => void;
export const headers: {
    "X-Amz-User-Agent": string;
    "Content-Type": string;
};
export enum AuthTarget {
    SignUp = "AWSCognitoIdentityProviderService.SignUp",
    ConfirmSignUp = "AWSCognitoIdentityProviderService.ConfirmSignUp",
    ResendConfirmationCode = "AWSCognitoIdentityProviderService.ResendConfirmationCode",
    InitiateAuth = "AWSCognitoIdentityProviderService.InitiateAuth"
}
export enum CognitoException {
    UsernameExistsException = "UsernameExistsException",
    ExpiredCodeException = "ExpiredCodeException",
    CodeMismatchException = "CodeMismatchException",
    TooManyFailedAttemptsException = "TooManyFailedAttemptsException",
    TooManyRequestsException = "TooManyRequestsException",
    DefaultError = "DefaultError"
}
export const request: <T>(post: () => Promise<Response>) => Promise<T>;
export const generateRequestShape: (target: AuthTarget, body: Body) => {
    headers: {
        "X-Amz-Target": AuthTarget;
        "X-Amz-User-Agent": string;
        "Content-Type": string;
    };
    method: string;
    body: string;
};
export const signUp: (email: string, password: string) => Promise<SignUpResponse>;
export const signIn: (email: string, password: string) => Promise<any>;
export const confirmSignUp: (email: string, confirmationCode: string) => Promise<Record<string, string>>;
export const resendConfirmationCode: (email: string) => Promise<ResendConfirmationResponse>;
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
    UserAttributes: {
        Name: "email";
        Value: string;
    }[];
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
    message: string;
    exception: CognitoException;
    constructor(message: string, exception: CognitoException);
}

//# sourceMappingURL=types.d.ts.map
