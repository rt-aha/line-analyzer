import getDom from '@/js/utils/getDom';
import { uploadAPI } from '@/api/upload.js';

const uploadInput = getDom('#upload-input');
const uploadBtn = getDom('#upload-chat-file-btn');

uploadInput.addEventListener('change', (e) => {
  let files = e.target.files;

  console.log('file', files);

  uploadAPI(files[0]);
});

uploadBtn.addEventListener('click', () => {
  uploadInput.click();
});
