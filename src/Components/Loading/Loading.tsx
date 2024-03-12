import styles from './Loading.module.css';

const Loading = (props) => {
  const { isLoading } = props;

  return (
    <>
      {isLoading ? (
        <div className={styles.loadingIn}>
          <div className={styles.dotspin}></div>
        </div>
      ) : (
        <div className={styles.loadingOut}></div>
      )}
    </>
  );
};

export { Loading };
