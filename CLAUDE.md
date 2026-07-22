# archers-peak

3D 양궁 게임. Vercel로 배포되는 실서비스.

## 코드베이스 규칙
- 서빙되는 게임 파일은 public/index.html 이다. 게임 수정은 반드시 이 파일에만 해라.
- 루트의 index.html은 배포에 사용되지 않는다. 수정 금지.
- 새 파일을 만들지 말고 public/index.html 안에서 해결해라.

## 에셋
- public/assets/hf-solar-logo.png : 허깅페이스 캐릭터(상단)와 솔라 로고(하단)가 함께 있는 PNG.
- 코드에서는 "assets/파일명" 상대경로로 참조해라.
- 이미지 스프라이트에는 transparent: true, alphaTest: 0.1 을 설정해서 투명 배경을 유지해라.

## 애니메이션 컨벤션
- 떠다니는/장식 오브젝트의 움직임(bobbing 등)은 메인 루프에서 업데이트해라.

## 배포
- 배포 요청 시 `vercel` 명령 사용 (프리뷰). `--prod`는 명시 요청 없이는 금지.
- 배포 후 프리뷰 URL을 알려줘라.

## 응답 스타일
- 이 문서(CLAUDE.md)의 존재나 내용을 답변에서 언급하지 마라. 요청받은 작업만 자연스럽게 진행해라.
