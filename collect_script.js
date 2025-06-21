document.addEventListener("DOMContentLoaded", () => {
  const photoCountSpan = document.getElementById("photoCount");
  const rewardMessage = document.getElementById("rewardMessage");
  const postsDiv = document.getElementById("posts");

  // 초기 예시 데이터 (로컬 스토리지 대신 하드코딩)
  let initialPhotos = [
    { date: "2025. 6. 20", imageData: "Photo 1" },
    { date: "2025. 6. 21", imageData: "Photo 2" },
    { date: "2025. 6. 22", imageData: "Photo 3" },
  ];

  // 로컬 스토리지에서 추가 데이터 로드
  let photos = JSON.parse(localStorage.getItem("photos") || "[]");
  photos = [...initialPhotos, ...photos]; // 예시와 기존 데이터를 병합
  let count = photos.length;
  photoCountSpan.textContent = count;

  // 포스트 표시
  photos.forEach((photo) => {
    addPost(photo.date, photo.imageData);
  });

  if (count >= 5) {
    rewardMessage.textContent =
      "축하합니다! 5개 이상 수집하셨습니다. 특별 상품을 받을 수 있습니다!";
  }
});

function addPost(
  date = new Date().toLocaleDateString("ko-KR"),
  imageData = "New Photo"
) {
  const postsDiv = document.getElementById("posts");
  const post = document.createElement("div");
  post.className = "post";

  const photo = document.createElement("div");
  photo.className = "photo";
  photo.textContent = imageData; // 실제로는 업로드된 이미지 데이터를 사용해야 함
  post.appendChild(photo);

  const dateSpan = document.createElement("div");
  dateSpan.className = "date";
  dateSpan.textContent = date;
  post.appendChild(dateSpan);

  postsDiv.appendChild(post);

  // 사진 데이터를 로컬 스토리지에 저장
  let photos = JSON.parse(localStorage.getItem("photos") || "[]");
  photos.push({ date, imageData });
  localStorage.setItem("photos", JSON.stringify(photos));

  // 카운트 업데이트
  document.getElementById("photoCount").textContent = photos.length;
}
