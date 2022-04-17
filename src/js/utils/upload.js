import getDom from '@/js/utils/getDom';
import { uploadAPI } from '@/api/upload.js';
import { resultAPI } from '@/api/result.js';
import handleLineData from '@/js/utils/handleLineData.js';

const uploadInput = getDom('#upload-input');
const uploadBtn = getDom('#upload-chat-file-btn');

let files = null;

uploadBtn.addEventListener('click', () => {
  files = null;
  uploadInput.click();
});

const getResult = async (payload) => {
  const res = await resultAPI(payload);
  return res;
};

// let timer = null;
const pollingData = (data) =>
  new Promise((resolve, reject) => {
    let count = 0;

    // 15 秒內會 call 10次，若仍無法取得則放棄
    const loop = async () => {
      count += 1;
      if (count > 10) {
        reject({ message: '發生未知問題' });
        clearTimeout(timer);
        timer = null;
        return;
      }
      const resultRes = await getResult(data);

      let timer = setTimeout(() => {
        if (resultRes.status) {
          clearTimeout(timer);
          resolve(resultRes);
        } else {
          clearTimeout(timer);
          loop(data);
        }
      }, 1500);
    };

    loop();
  });

uploadInput.addEventListener('change', async (e) => {
  files = e.target.files;

  const uploadRes = await uploadAPI(files[0]);
  const { data } = uploadRes;

  try {
    const resultRes = await pollingData(data);

    const { data: resultData, status } = resultRes;

    console.log('resultData', resultData);
    handleLineData(resultData);
  } catch (e) {
    console.log('e.message', e.message);
  }
});
