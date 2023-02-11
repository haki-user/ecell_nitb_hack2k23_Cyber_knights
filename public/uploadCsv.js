document.getElementById('csv-form').addEventListener('submit', handleFormSubmit);
console.log('b')
function handleFormSubmit(event) {
  event.preventDefault();
  console.log('bb')
  const csvFile = document.getElementById('csv-file').files[0];
  const formData = new FormData();
  formData.append('csv-file', csvFile);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/v1/upload-csv/', true);
  xhr.send(formData);
}
 