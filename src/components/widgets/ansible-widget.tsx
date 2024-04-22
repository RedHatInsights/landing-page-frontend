import React from 'react';
import { SimpleServiceWidget } from './simple-service-widget';

const AnsibleWidget: React.FunctionComponent = () => {
  return (
    <>
      <SimpleServiceWidget
        id={2}
        body="Create, share, and manage automations - from development and operations, to security and network teams."
        linkTitle="Ansible"
        url="/ansible/ansible-dashboard"
      />
    </>
  );
};

export default AnsibleWidget;
