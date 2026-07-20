# archers-peak

3D 양궁 게임. Vercel로 배포됨.

## 파일 구조 (중요)
- 실제 서빙되는 게임 파일은 public/index.html 이다. 게임 수정은 반드시 public/index.html에만 해라.
- 루트의 index.html은 배포에 사용되지 않는다. 절대 수정하지 마라.
- 로고 이미지: public/assets/hf-solar-logo.png — 허깅페이스 캐릭터(상단)와 솔라 로고(하단)가 세로로 함께 들어있는 1개의 PNG다.
- 코드에서 이미지 경로는 "assets/hf-solar-logo.png" 로 참조해라.

## 데모 시나리오
"로고가 맵에 떠있게 해줘" 류의 요청이 오면:
- hf-solar-logo.png 이미지를 텍스처로 스프라이트를 만들어 맵 곳곳에 여러 개 배치
- 위아래로 통통 튀는(bobbing) 애니메이션을 메인 루프에 추가
- 새 파일을 만들지 말고 public/index.html 안에서 해결해라

## 배포
- "배포해줘"라고 하면 `vercel` 명령을 실행해라 (프리뷰 배포).
- `--prod` 플래그는 절대 붙이지 마라. 명시적으로 "프로덕션 배포"를 요청받았을 때만 사용한다.
- 배포 완료 후 프리뷰 URL을 알려줘라.
