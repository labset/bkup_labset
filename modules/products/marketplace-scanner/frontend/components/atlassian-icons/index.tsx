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

const BambooIcon = () => <SvgIcon component={BambooLogo} />;
const BitbucketIcon = () => <SvgIcon component={BitbucketLogo} />;
const ConfluenceIcon = () => <SvgIcon component={ConfluenceLogo} />;
const CrowdIcon = () => <SvgIcon component={CrowdLogo} />;
const FisheyeIcon = () => <SvgIcon component={FisheyeLogo} />;
const JiraIcon = () => <SvgIcon component={JiraLogo} />;
const OpsGenieIcon = () => <SvgIcon component={OpsGenieLogo} />;
const StatusPageIcon = () => <SvgIcon component={StatusPageLogo} />;

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
