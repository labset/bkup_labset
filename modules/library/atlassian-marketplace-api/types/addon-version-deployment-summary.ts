type AddonVersionDeploymentSummary = {
    server: boolean;
    cloud: boolean;
    connect: boolean;
    autoUpdateAllowed: boolean;
    dataCenter: boolean;
    dataCenterStatus?: 'compatible' | 'pending' | 'rejected';
};

export type { AddonVersionDeploymentSummary };
