import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../components/layouts/Page';

function PolicyTemplate({ pageTitle, policyType, svg, ...props }) {
  return (
    <Page title={pageTitle}>
      <div className="w-full c-shadow max-w-lg mx-auto my-12 bg-white">
        <div className="flex justify-center h-72 pt-12">{svg}</div>
        <div className="relative z-10 leading-normal bg-white p-3">
          <h1 className="px-2 mb-4 text-base leading-6 text-blue-600 font-semibold tracking-wide uppercase">
            {policyType}
          </h1>
          {props.children}
        </div>
      </div>
    </Page>
  );
}

PolicyTemplate.propTypes = {
  children: PropTypes.node,
  svg: PropTypes.node,
  pageTitle: PropTypes.string,
  policyType: PropTypes.string,
};

export default PolicyTemplate;
