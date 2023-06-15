import {
  BambooIcon,
  BitbucketIcon,
  ConfluenceIcon,
  CrowdIcon,
  JiraIcon,
  OpsGenieIcon,
  StatusPageIcon,
} from "@labset-mps-frontend/atlassian-icons-component";
import React from "react";
import { Link } from "react-router-dom";

import "./application-card.css";

interface ApplicationCardProps {
  applicationKey: string;
  title: string;
  link: string;
}

const ApplicationLogo = ({ applicationKey }: { applicationKey: string }) => {
  switch (applicationKey) {
    case "bamboo":
      return <BambooIcon />;
    case "bitbucket":
      return <BitbucketIcon />;
    case "confluence":
      return <ConfluenceIcon />;
    case "crowd":
      return <CrowdIcon />;
    case "jira":
      return <JiraIcon />;
    case "opsgenie":
      return <OpsGenieIcon />;
    case "statuspage":
      return <StatusPageIcon />;
    case "townsquare":
    default:
      console.info("**", applicationKey);
      return <></>;
  }
};

const ApplicationCard = ({
  applicationKey,
  link,
  title,
}: ApplicationCardProps) => {
  return (
    <div className="application-card">
      <ApplicationLogo applicationKey={applicationKey} />
      <div className="application-card-title">
        <Link to={link}>{title}</Link>
      </div>
    </div>
  );
};

export { ApplicationCard };
