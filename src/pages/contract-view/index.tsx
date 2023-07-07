import React from 'react';
import styles from './styles.module.scss';
import { LoginDocument } from '@/generated/graphql';
import { useQuery } from 'urql';
import { useRouter } from 'next/router';

const FolhasA4Centralizadas = () => {
  const { query } = useRouter();

  const [result] = useQuery({
    query: LoginDocument,
    variables: { username: query.id },
    requestPolicy: `cache-and-network`,
  });

  const { data } = result;

  return (
    <div className={styles.container}>
      <div className={styles.folha}>
        <img src="/images/f1.jpg" alt="" />
      </div>
      {data?.dashboard?.id && (
        <div className={styles.code2}>
          <span>Authentication code: {data?.dashboard?.id}</span>
        </div>
      )}

      <div className={styles.folha}>
        <img src="/images/f2.jpg" alt="" />
      </div>
      {data?.dashboard?.id && (
        <div className={styles.code2}>
          <span>Authentication code: {data?.dashboard?.id}</span>
        </div>
      )}

      <div className={styles.folha2}>
        {data?.dashboard?.signature && (
          <div className={styles.signature}>
            <img src={data?.dashboard?.signature} alt="" width={190} />
          </div>
        )}

        {data?.dashboard?.responsable_name && (
          <div className={styles.name}>
            <span>{data?.dashboard?.responsable_name}</span>
          </div>
        )}

        {data?.dashboard?.project_name && (
          <div className={styles.artist}>
            <span>{data?.dashboard?.project_name}</span>
          </div>
        )}

        {data?.dashboard?.updatedAt && (
          <div className={styles.hour}>
            <span>
              Date: {new Date(data?.dashboard?.updatedAt).toLocaleString()}
            </span>
          </div>
        )}

        {data?.dashboard?.id && (
          <div className={styles.code3}>
            <span>Authentication code: {data?.dashboard?.id}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <FolhasA4Centralizadas />
    </div>
  );
};

export default App;
