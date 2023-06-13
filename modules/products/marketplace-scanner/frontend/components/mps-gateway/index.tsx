interface MpsGateway {
  url: string;
}

declare const __MPS_GATEWAY__: MpsGateway;
const mpsGateway: MpsGateway = __MPS_GATEWAY__;

export { mpsGateway };
