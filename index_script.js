function checkCassLogo() {
  const input = document.getElementById("cassUpload");
  const resultDiv = document.getElementById("result");
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const isCassDetected = Math.random() > 0.3;
      resultDiv.textContent = isCassDetected
        ? "Cass 로고 감지 성공!"
        : "Cass 로고를 다시 확인하세요.";
      resultDiv.style.color = isCassDetected ? "#ff4d4d" : "#333";
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function checkWorldCupLogo() {
  const input = document.getElementById("worldCupUpload");
  const resultDiv = document.getElementById("result");
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const isWorldCupDetected = Math.random() > 0.3;
      resultDiv.textContent = isWorldCupDetected
        ? "World Cup 로고 감지 성공!"
        : "World Cup 로고를 다시 확인하세요.";
      resultDiv.style.color = isWorldCupDetected ? "#ff4d4d" : "#333";
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function checkBothLogos() {
  const cassInput = document.getElementById("cassUpload");
  const worldCupInput = document.getElementById("worldCupUpload");
  const resultDiv = document.getElementById("result");
  if (
    cassInput.files &&
    cassInput.files[0] &&
    worldCupInput.files &&
    worldCupInput.files[0]
  ) {
    const cassReader = new FileReader();
    const worldCupReader = new FileReader();
    let cassDetected = false,
      worldCupDetected = false;

    cassReader.onload = function (e) {
      cassDetected = Math.random() > 0.3;
      checkCompletion();
    };
    worldCupReader.onload = function (e) {
      worldCupDetected = Math.random() > 0.3;
      checkCompletion();
    };

    cassReader.readAsDataURL(cassInput.files[0]);
    worldCupReader.readAsDataURL(worldCupInput.files[0]);

    function checkCompletion() {
      if (cassDetected !== null && worldCupDetected !== null) {
        if (cassDetected && worldCupDetected) {
          resultDiv.textContent = "성공! 두 로고가 모두 감지되었습니다.";
          resultDiv.style.color = "#ff4d4d";
          // 스캔한 이미지를 로컬 스토리지에 저장 (가상 데이터 사용)
          const currentDate = new Date().toLocaleDateString("ko-KR");
          const combinedImage = "Combined Photo"; // 실제로는 두 이미지 결합 로직 필요
          localStorage.setItem(
            "latestPhoto",
            JSON.stringify({ date: currentDate, imageData: combinedImage })
          );
          window.location.href = "collect.html";
        } else {
          resultDiv.textContent =
            "실패! 두 로고가 모두 필요합니다. 다시 시도하세요.";
          resultDiv.style.color = "#333";
        }
      }
    }
  } else {
    resultDiv.textContent = "두 이미지를 모두 업로드해 주세요.";
    resultDiv.style.color = "#333";
  }
}
