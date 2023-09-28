/* eslint-disable */
import { ChannelCredentials, Client, makeGenericClientConstructor, Metadata } from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export enum VerificationMethod {
  EmailCode = 0,
  EmailLink = 1,
  UNRECOGNIZED = -1,
}

export function verificationMethodFromJSON(object: any): VerificationMethod {
  switch (object) {
    case 0:
    case "EmailCode":
      return VerificationMethod.EmailCode;
    case 1:
    case "EmailLink":
      return VerificationMethod.EmailLink;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VerificationMethod.UNRECOGNIZED;
  }
}

export function verificationMethodToJSON(object: VerificationMethod): string {
  switch (object) {
    case VerificationMethod.EmailCode:
      return "EmailCode";
    case VerificationMethod.EmailLink:
      return "EmailLink";
    case VerificationMethod.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ErrorCode {
  EmailFormat = 0,
  PasswordFormat = 1,
  AlreadyExists = 2,
  ApplicationDoesNotExist = 3,
  InternalServerError = 4,
  UNRECOGNIZED = -1,
}

export function errorCodeFromJSON(object: any): ErrorCode {
  switch (object) {
    case 0:
    case "EmailFormat":
      return ErrorCode.EmailFormat;
    case 1:
    case "PasswordFormat":
      return ErrorCode.PasswordFormat;
    case 2:
    case "AlreadyExists":
      return ErrorCode.AlreadyExists;
    case 3:
    case "ApplicationDoesNotExist":
      return ErrorCode.ApplicationDoesNotExist;
    case 4:
    case "InternalServerError":
      return ErrorCode.InternalServerError;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ErrorCode.UNRECOGNIZED;
  }
}

export function errorCodeToJSON(object: ErrorCode): string {
  switch (object) {
    case ErrorCode.EmailFormat:
      return "EmailFormat";
    case ErrorCode.PasswordFormat:
      return "PasswordFormat";
    case ErrorCode.AlreadyExists:
      return "AlreadyExists";
    case ErrorCode.ApplicationDoesNotExist:
      return "ApplicationDoesNotExist";
    case ErrorCode.InternalServerError:
      return "InternalServerError";
    case ErrorCode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface RegisterRequest {
  email: string;
  password: string;
  applicationId: string;
  verificationMethod: VerificationMethod;
}

export interface RegisterResponse {
  userId: string;
}

function createBaseRegisterRequest(): RegisterRequest {
  return { email: "", password: "", applicationId: "", verificationMethod: 0 };
}

export const RegisterRequest = {
  encode(message: RegisterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    if (message.applicationId !== "") {
      writer.uint32(26).string(message.applicationId);
    }
    if (message.verificationMethod !== 0) {
      writer.uint32(32).int32(message.verificationMethod);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.applicationId = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.verificationMethod = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterRequest {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      password: isSet(object.password) ? String(object.password) : "",
      applicationId: isSet(object.applicationId) ? String(object.applicationId) : "",
      verificationMethod: isSet(object.verificationMethod) ? verificationMethodFromJSON(object.verificationMethod) : 0,
    };
  },

  toJSON(message: RegisterRequest): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.applicationId !== "") {
      obj.applicationId = message.applicationId;
    }
    if (message.verificationMethod !== 0) {
      obj.verificationMethod = verificationMethodToJSON(message.verificationMethod);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterRequest>, I>>(base?: I): RegisterRequest {
    return RegisterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterRequest>, I>>(object: I): RegisterRequest {
    const message = createBaseRegisterRequest();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    message.applicationId = object.applicationId ?? "";
    message.verificationMethod = object.verificationMethod ?? 0;
    return message;
  },
};

function createBaseRegisterResponse(): RegisterResponse {
  return { userId: "" };
}

export const RegisterResponse = {
  encode(message: RegisterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterResponse {
    return { userId: isSet(object.userId) ? String(object.userId) : "" };
  },

  toJSON(message: RegisterResponse): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisterResponse>, I>>(base?: I): RegisterResponse {
    return RegisterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisterResponse>, I>>(object: I): RegisterResponse {
    const message = createBaseRegisterResponse();
    message.userId = object.userId ?? "";
    return message;
  },
};

export type BasicAuthService = typeof BasicAuthService;
export const BasicAuthService = {
  register: {
    path: "/authcore.auth.basic.BasicAuth/Register",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RegisterRequest) => Buffer.from(RegisterRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RegisterRequest.decode(value),
    responseSerialize: (value: RegisterResponse) => Buffer.from(RegisterResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => RegisterResponse.decode(value),
  },
} as const;

export interface BasicAuthServer extends UntypedServiceImplementation {
  register: handleUnaryCall<RegisterRequest, RegisterResponse>;
}

export interface BasicAuthClient extends Client {
  register(
    request: RegisterRequest,
    callback: (error: ServiceError | null, response: RegisterResponse) => void,
  ): ClientUnaryCall;
  register(
    request: RegisterRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: RegisterResponse) => void,
  ): ClientUnaryCall;
  register(
    request: RegisterRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: RegisterResponse) => void,
  ): ClientUnaryCall;
}

export const BasicAuthClient = makeGenericClientConstructor(
  BasicAuthService,
  "authcore.auth.basic.BasicAuth",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): BasicAuthClient;
  service: typeof BasicAuthService;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
