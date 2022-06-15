export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum CapcthaCodeResult {
  CaptchaIsRequired = 10,
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};
