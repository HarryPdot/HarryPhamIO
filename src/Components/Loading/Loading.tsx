import styles from './Loading.module.css';

const Loading = (props) => {
  const { isLoading } = props;

  return (
    <>
      {isLoading ? (
        <div className={styles.loading}></div>
      ) : (
        <div className={styles.loadingOut}></div>
      )}
    </>
  );
};

export { Loading };
