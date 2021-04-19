import React from 'react';
import { useSiteListState } from '../Contexts/siteListContext';
import Alert from './Alert';
import Loader from './Loader';

const SiteList = () => {
  const { status, error, siteList } = useSiteListState();

  if (error) return <Alert alert={error} />;

  if (status === 'fetching')
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    siteList.length &&
    status === 'ready' && (
      <div>
        <ul>
          {siteList.map(site => (
            <div key={site.id}>
              <img src={site.image[0]} alt="logo" />
              <div>
                <p>{site.name}</p>
                <p>Main Contact: {site.contact}</p>
                <p>More -&gt</p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    )
  );
};

export default SiteList;
