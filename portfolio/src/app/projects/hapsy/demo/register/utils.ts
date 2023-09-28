export enum SignUpResult {
    Success,
    AlreadyExists = 'AlreadyExists',
    InvalidEmailAddress = 'InvalidEmailAddress',
    InvalidPassword = 'InvalidPassword',
    InvalidApplicationID = 'InvalidApplicationID',
    ApplicationDoesNotExist = 'ApplicationDoesNotExist',
    InternalServerError = 'InternalServerError',
}
