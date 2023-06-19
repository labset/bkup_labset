interface TaxGateway {
  url: string;
}

declare const __TAX_GATEWAY__: TaxGateway;
const taxGateway: TaxGateway = __TAX_GATEWAY__;

export { taxGateway };
