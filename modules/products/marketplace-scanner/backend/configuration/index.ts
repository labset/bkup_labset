interface MpsConfiguration {
    BASE_URL: string;
    GATEWAY_URL: string;
}

const mpsConfiguration: MpsConfiguration = {
    BASE_URL: 'http://localhost:8000',
    GATEWAY_URL: 'http://localhost:4000/labset-gateway/mps'
};

export { mpsConfiguration };
export type { MpsConfiguration };
