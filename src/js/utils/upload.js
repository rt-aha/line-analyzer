import getDom from '@/js/utils/getDom';

const uploadInput = getDom('#upload-input');
const uploadBtn = getDom('#upload-chat-file-btn');

uploadInput.addEventListener('change', (e) => {
  let files = e.target.files;

  console.log('file', files);
});

uploadBtn.addEventListener('click', () => {
  uploadInput.click();
});
