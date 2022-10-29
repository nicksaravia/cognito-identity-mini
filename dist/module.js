import $l7sNQ$nodefetch from "node-fetch";


// link below gives insight on how to do this
// https://github.com/aws-amplify/amplify-js/blob/main/packages/amazon-cognito-identity-js/src/Client.js
let $9991e02ffbce8150$var$REACT_APP_COGNITO_CLIENT_ID;
const $9991e02ffbce8150$var$REACT_APP_COGNITO_URL = "";
const $9991e02ffbce8150$export$8d21e34596265fa2 = (clientId)=>{
    $9991e02ffbce8150$var$REACT_APP_COGNITO_CLIENT_ID = clientId;
};
const $9991e02ffbce8150$export$838e2a576d4d6ff6 = {
    "X-Amz-User-Agent": "Chrome",
    "Content-Type": "application/x-amz-json-1.1"
};
let $9991e02ffbce8150$export$b925888f05fd1fd;
(function(AuthTarget) {
    AuthTarget["SignUp"] = "AWSCognitoIdentityProviderService.SignUp";
    AuthTarget["ConfirmSignUp"] = "AWSCognitoIdentityProviderService.ConfirmSignUp";
    AuthTarget["ResendConfirmationCode"] = "AWSCognitoIdentityProviderService.ResendConfirmationCode";
    AuthTarget["InitiateAuth"] = "AWSCognitoIdentityProviderService.InitiateAuth";
})($9991e02ffbce8150$export$b925888f05fd1fd || ($9991e02ffbce8150$export$b925888f05fd1fd = {}));
let $9991e02ffbce8150$export$5c63b62ccf18ff3a;
(function(CognitoException) {
    CognitoException[// sign up exceptions
    "UsernameExistsException"] = "UsernameExistsException";
    CognitoException[// confirm sign up exceptions
    "ExpiredCodeException"] = "ExpiredCodeException";
    CognitoException["CodeMismatchException"] = "CodeMismatchException";
    CognitoException["TooManyFailedAttemptsException"] = "TooManyFailedAttemptsException";
    CognitoException[// resend verification exceptions
    "TooManyRequestsException"] = "TooManyRequestsException";
    CognitoException[// default error
    "DefaultError"] = "DefaultError";
})($9991e02ffbce8150$export$5c63b62ccf18ff3a || ($9991e02ffbce8150$export$5c63b62ccf18ff3a = {}));
const $9991e02ffbce8150$export$b5fe3f66a567bec0 = async (post)=>{
    try {
        const response = await post();
        const data = await response.json();
        if (response.ok) return data;
        if (typeof data === "object" && "__type" in data) {
            const error = data;
            throw new $9991e02ffbce8150$export$36ba3035496698f9("response-error", error.__type);
        }
        throw new Error("default error");
    } catch (error1) {
        if (error1 instanceof $9991e02ffbce8150$export$36ba3035496698f9) throw error1;
        throw new $9991e02ffbce8150$export$36ba3035496698f9("aws-cognito-error", $9991e02ffbce8150$export$5c63b62ccf18ff3a.DefaultError);
    }
};
const $9991e02ffbce8150$export$b813e82ac49a13e9 = (target, body)=>{
    return {
        headers: {
            ...$9991e02ffbce8150$export$838e2a576d4d6ff6,
            "X-Amz-Target": target
        },
        method: "POST",
        body: JSON.stringify({
            ClientId: $9991e02ffbce8150$var$REACT_APP_COGNITO_CLIENT_ID,
            ...body
        })
    };
};
const $9991e02ffbce8150$export$cf64224bcd829024 = async (email, password)=>{
    const requestInit = $9991e02ffbce8150$export$b813e82ac49a13e9($9991e02ffbce8150$export$b925888f05fd1fd.SignUp, {
        Password: password,
        UserAttributes: [
            {
                Name: "email",
                Value: email
            }
        ],
        Username: email
    });
    const post = $9991e02ffbce8150$var$createRequestFunction(requestInit);
    return await $9991e02ffbce8150$export$b5fe3f66a567bec0(post);
};
const $9991e02ffbce8150$export$9670d83f11d4b64a = async (email, password)=>{
    const requestInit = $9991e02ffbce8150$export$b813e82ac49a13e9($9991e02ffbce8150$export$b925888f05fd1fd.InitiateAuth, {
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password
        }
    });
    const post = $9991e02ffbce8150$var$createRequestFunction(requestInit);
    return await $9991e02ffbce8150$export$b5fe3f66a567bec0(post);
};
const $9991e02ffbce8150$export$2ce39ab6662e8c24 = async (email, confirmationCode)=>{
    const requestInit = $9991e02ffbce8150$export$b813e82ac49a13e9($9991e02ffbce8150$export$b925888f05fd1fd.ConfirmSignUp, {
        ConfirmationCode: confirmationCode,
        Username: email
    });
    const post = $9991e02ffbce8150$var$createRequestFunction(requestInit);
    return await $9991e02ffbce8150$export$b5fe3f66a567bec0(post);
};
const $9991e02ffbce8150$export$f24137cafeaef1a1 = async (email)=>{
    const requestInit = $9991e02ffbce8150$export$b813e82ac49a13e9($9991e02ffbce8150$export$b925888f05fd1fd.ResendConfirmationCode, {
        Username: email
    });
    const post = $9991e02ffbce8150$var$createRequestFunction(requestInit);
    return await $9991e02ffbce8150$export$b5fe3f66a567bec0(post);
};
const $9991e02ffbce8150$var$createRequestFunction = (requestInit)=>{
    return async ()=>(0, $l7sNQ$nodefetch)($9991e02ffbce8150$var$REACT_APP_COGNITO_URL, requestInit);
};
class $9991e02ffbce8150$export$36ba3035496698f9 extends Error {
    constructor(message, exception){
        super(message);
        this.message = message;
        this.exception = exception;
    }
}


export {$9991e02ffbce8150$export$8d21e34596265fa2 as configure, $9991e02ffbce8150$export$838e2a576d4d6ff6 as headers, $9991e02ffbce8150$export$b925888f05fd1fd as AuthTarget, $9991e02ffbce8150$export$5c63b62ccf18ff3a as CognitoException, $9991e02ffbce8150$export$b5fe3f66a567bec0 as request, $9991e02ffbce8150$export$36ba3035496698f9 as CognitoError, $9991e02ffbce8150$export$b813e82ac49a13e9 as generateRequestShape, $9991e02ffbce8150$export$cf64224bcd829024 as signUp, $9991e02ffbce8150$export$9670d83f11d4b64a as signIn, $9991e02ffbce8150$export$2ce39ab6662e8c24 as confirmSignUp, $9991e02ffbce8150$export$f24137cafeaef1a1 as resendConfirmationCode};
//# sourceMappingURL=module.js.map
