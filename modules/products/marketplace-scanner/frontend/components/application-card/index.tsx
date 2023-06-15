import { ConfluenceIcon } from "@labset-mps-frontend/atlassian-icons-component";
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
    case "confluence":
      return <ConfluenceIcon />;
    case "townsquare":
    case "bitbucket":
    case "jira":
    case "opsgenie":
    case "statuspage":
    default:
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
