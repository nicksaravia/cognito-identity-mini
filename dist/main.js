function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "configure", () => $882b6d93070905b3$export$8d21e34596265fa2);
$parcel$export(module.exports, "headers", () => $882b6d93070905b3$export$838e2a576d4d6ff6);
$parcel$export(module.exports, "AuthTarget", () => $882b6d93070905b3$export$b925888f05fd1fd);
$parcel$export(module.exports, "CognitoException", () => $882b6d93070905b3$export$5c63b62ccf18ff3a);
$parcel$export(module.exports, "request", () => $882b6d93070905b3$export$b5fe3f66a567bec0);
$parcel$export(module.exports, "CognitoError", () => $882b6d93070905b3$export$36ba3035496698f9);
$parcel$export(module.exports, "generateRequestShape", () => $882b6d93070905b3$export$b813e82ac49a13e9);
$parcel$export(module.exports, "signUp", () => $882b6d93070905b3$export$cf64224bcd829024);
$parcel$export(module.exports, "signIn", () => $882b6d93070905b3$export$9670d83f11d4b64a);
$parcel$export(module.exports, "confirmSignUp", () => $882b6d93070905b3$export$2ce39ab6662e8c24);
$parcel$export(module.exports, "resendConfirmationCode", () => $882b6d93070905b3$export$f24137cafeaef1a1);
// link below gives insight on how to do this
// https://github.com/aws-amplify/amplify-js/blob/main/packages/amazon-cognito-identity-js/src/Client.js
let $882b6d93070905b3$var$REACT_APP_COGNITO_CLIENT_ID;
const $882b6d93070905b3$var$REACT_APP_COGNITO_URL = "";
const $882b6d93070905b3$export$8d21e34596265fa2 = (clientId)=>{
    $882b6d93070905b3$var$REACT_APP_COGNITO_CLIENT_ID = clientId;
};
const $882b6d93070905b3$export$838e2a576d4d6ff6 = {
    "X-Amz-User-Agent": "Chrome",
    "Content-Type": "application/x-amz-json-1.1"
};
let $882b6d93070905b3$export$b925888f05fd1fd;
(function(AuthTarget) {
    AuthTarget["SignUp"] = "AWSCognitoIdentityProviderService.SignUp";
    AuthTarget["ConfirmSignUp"] = "AWSCognitoIdentityProviderService.ConfirmSignUp";
    AuthTarget["ResendConfirmationCode"] = "AWSCognitoIdentityProviderService.ResendConfirmationCode";
    AuthTarget["InitiateAuth"] = "AWSCognitoIdentityProviderService.InitiateAuth";
})($882b6d93070905b3$export$b925888f05fd1fd || ($882b6d93070905b3$export$b925888f05fd1fd = {}));
let $882b6d93070905b3$export$5c63b62ccf18ff3a;
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
})($882b6d93070905b3$export$5c63b62ccf18ff3a || ($882b6d93070905b3$export$5c63b62ccf18ff3a = {}));
const $882b6d93070905b3$export$b5fe3f66a567bec0 = async (post)=>{
    try {
        const response = await post();
        const data = await response.json();
        if (response.ok) return data;
        if ("__type" in data) throw new $882b6d93070905b3$export$36ba3035496698f9("response-error", data.__type);
        throw new Error("default error");
    } catch (error) {
        if (error instanceof $882b6d93070905b3$export$36ba3035496698f9) throw error;
        throw new $882b6d93070905b3$export$36ba3035496698f9("aws-cognito-error", $882b6d93070905b3$export$5c63b62ccf18ff3a.DefaultError);
    }
};
const $882b6d93070905b3$export$b813e82ac49a13e9 = (target, body)=>{
    return {
        headers: {
            ...$882b6d93070905b3$export$838e2a576d4d6ff6,
            "X-Amz-Target": target
        },
        method: "POST",
        body: JSON.stringify({
            ClientId: $882b6d93070905b3$var$REACT_APP_COGNITO_CLIENT_ID,
            ...body
        })
    };
};
const $882b6d93070905b3$export$cf64224bcd829024 = async (email, password)=>{
    const requestInit = $882b6d93070905b3$export$b813e82ac49a13e9($882b6d93070905b3$export$b925888f05fd1fd.SignUp, {
        Password: password,
        UserAttributes: [
            {
                Name: "email",
                Value: email
            }
        ],
        Username: email
    });
    const post = $882b6d93070905b3$var$createRequestFunction(requestInit);
    return await $882b6d93070905b3$export$b5fe3f66a567bec0(post);
};
const $882b6d93070905b3$export$9670d83f11d4b64a = async (email, password)=>{
    const requestInit = $882b6d93070905b3$export$b813e82ac49a13e9($882b6d93070905b3$export$b925888f05fd1fd.InitiateAuth, {
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password
        }
    });
    const post = $882b6d93070905b3$var$createRequestFunction(requestInit);
    return await $882b6d93070905b3$export$b5fe3f66a567bec0(post);
};
const $882b6d93070905b3$export$2ce39ab6662e8c24 = async (email, confirmationCode)=>{
    const requestInit = $882b6d93070905b3$export$b813e82ac49a13e9($882b6d93070905b3$export$b925888f05fd1fd.ConfirmSignUp, {
        ConfirmationCode: confirmationCode,
        Username: email
    });
    const post = $882b6d93070905b3$var$createRequestFunction(requestInit);
    return await $882b6d93070905b3$export$b5fe3f66a567bec0(post);
};
const $882b6d93070905b3$export$f24137cafeaef1a1 = async (email)=>{
    const requestInit = $882b6d93070905b3$export$b813e82ac49a13e9($882b6d93070905b3$export$b925888f05fd1fd.ResendConfirmationCode, {
        Username: email
    });
    const post = $882b6d93070905b3$var$createRequestFunction(requestInit);
    return await $882b6d93070905b3$export$b5fe3f66a567bec0(post);
};
const $882b6d93070905b3$var$createRequestFunction = (requestInit)=>{
    return async ()=>fetch($882b6d93070905b3$var$REACT_APP_COGNITO_URL, requestInit);
};
class $882b6d93070905b3$export$36ba3035496698f9 extends Error {
    constructor(message, exception){
        super(message);
        this.message = message;
        this.exception = exception;
    }
}


//# sourceMappingURL=main.js.map
