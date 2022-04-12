const calcMinSec = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}分${secs}秒`;
};

export default calcMinSec;
