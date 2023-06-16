import { SvgIcon } from "@mui/material";
import React from "react";

import BambooLogo from "./bamboo.svg";
import BitbucketLogo from "./bitbucket.svg";
import ConfluenceLogo from "./confluence.svg";
import CrowdLogo from "./crowd.svg";
import FisheyeLogo from "./fisheye.svg";
import JiraLogo from "./jira.svg";
import OpsGenieLogo from "./opsgenie.svg";
import StatusPageLogo from "./statuspage.svg";

const BambooIcon = () => <SvgIcon component={BambooLogo} viewBox="0 0 32 32" />;
const BitbucketIcon = () => (
  <SvgIcon component={BitbucketLogo} viewBox="0 0 32 32" />
);
const ConfluenceIcon = () => (
  <SvgIcon component={ConfluenceLogo} viewBox="0 0 32 32" />
);
const CrowdIcon = () => <SvgIcon component={CrowdLogo} viewBox="0 0 32 32" />;
const FisheyeIcon = () => (
  <SvgIcon component={FisheyeLogo} viewBox="0 0 32 32" />
);
const JiraIcon = () => <SvgIcon component={JiraLogo} viewBox="0 0 32 32" />;
const OpsGenieIcon = () => (
  <SvgIcon component={OpsGenieLogo} viewBox="0 0 32 32" />
);
const StatusPageIcon = () => (
  <SvgIcon component={StatusPageLogo} viewBox="0 0 32 32" />
);

export {
  BambooIcon,
  BitbucketIcon,
  ConfluenceIcon,
  CrowdIcon,
  FisheyeIcon,
  JiraIcon,
  OpsGenieIcon,
  StatusPageIcon,
};
