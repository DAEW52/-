<form id="uploadForm" enctype="multipart/form-data" method="POST" action="http://localhost:3000/upload">
  <label>ชื่อ:</label><br>
  <input type="text" id="name" name="name"><br><br>

  <label>เบอร์โต๊ะ:</label><br>
  <input type="text" id="table" name="table"><br><br>

  <label>ข้อความ:</label><br>
  <textarea id="message" name="message"></textarea><br><br>

  <label>เลือกรูปภาพ:</label><br>
  <input type="file" id="image" name="image"><br><br>

  <img id="preview" style="display:none; max-width: 300px; margin-top: 10px;" /><br>

  <button type="button" onclick="handleSubmit()">ส่งข้อมูล</button>
</form>

<script>
// แสดง preview รูปทันทีที่เลือก
document.getElementById("image").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById("preview");
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

function handleSubmit() {
  const form = document.getElementById("uploadForm");
  const formData = new FormData(form);

  // ใช้ fetch เพื่อส่งข้อมูลไปยัง server
  fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    alert("ส่งข้อมูลเรียบร้อยแล้ว!\n\n" + data);
  })
  .catch(error => {
    console.error('เกิดข้อผิดพลาด:', error);
    alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
  });
}
</script>
