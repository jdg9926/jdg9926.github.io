// src/data/resumeData.js
import UKAMainLogo from '../images/UKAMainLogo.png';
import wineMainLogo from '../images/wineMainLogo.png';
import OMRMainLogo from '../images/OMRMainLogo.png';

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 95 },
      { name: "JavaScript", level: 95 },
      { name: "Vue.js", level: 90 },
      { name: "HTML/CSS", level: 85 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Java", level: 85 },
      { name: "Spring boot", level: 80 },
      { name: "Node.js", level: 80 },
      { name: "Python", level: 60 },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL", level: 85 },
      { name: "OracleDB", level: 85 },
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Git", level: 80 },
      { name: "AWS", level: 75 },
      { name: "Jenkins", level: 70 },
    ],
  },
];

export const projects = [
  {
    image: UKAMainLogo,
    title: "UKA 센터 (유기동물센터) 25.06.09 ~ 25.07.04",
    description:
      "팀 프로젝트로 만들었으며 React와 Java를 활용하여 유기동물 입양 센터 페이지를 만들었습니다.",
    techStack: ["React", "Java", "Spring boot", "JPA", "MySQL"],
    live: "http://teamproject-uka.s3-website.ap-northeast-2.amazonaws.com/",
    github: "https://github.com/hms1218/TeamProject-UKA",
  },
  {
    image: OMRMainLogo,
    title: "OTT Movie 리뷰 사이트 25.07.01 ~ 25.08.05",
    description:
      "모바일 팀 프로젝트로 만들었으며 React Native를 활용하여 OTT Movie 리뷰 사이트를 만들었습니다.",
    techStack: ["React", "React Native", "Spring boot", "Java", "JPA", "MySQL"],
    // 라이브 데모 링크 제거 (요청사항)
    github: "https://github.com/guensoo/TeamProject-OMR",
  },
  {
    image: wineMainLogo,
    title: "AI가 말아주는 와인 추천  25.07.14 ~ 진행중",
    description:
      "개인 프로젝트로 만들었으며 Python로 진행하여 Open API AI 를 활용한 AI 와인 추천 기능을 구현했습니다.",
    techStack: ["Python", "Java", "Spring boot", "JPA", "MySQL"],
    live: "http://project-alcohol-recommendation.s3-website.ap-northeast-2.amazonaws.com/",
    github: "https://github.com/jdg9926/project-alcohol-recommendation",
  },
];

export const experiences = [
  {
    title: "한화생명 보험코어S 구축 TF 대응 개발",
    company: "한화생명",
    period: "2021 09월 - 2022 11월",
    description: [
      "금융·보험 웹·앱 SI 시스템의 AS-IS/TO-BE 분석 및 대응 개발",
      "AS-IS 분석: 현행 업무 프로세스·시스템 환경 파악, 사용자 경험 및 불편사항 검토, 핵심 문제점 도출",
      "TO-BE 분석: 개선 목표 및 전략 수립, 프로세스 변경 및 목표 달성 계획 수립",
      "Java, JSP, Vue.js, Ajax 등 한화생명 앱 개발·개선",
    ],
  },
  {
    title: "소프트웨어개발",
    company: "현대오토에버/에이치앤웍스",
    period: "2019년 09월 - 2021년 08월",
    description: [
      "통합검색기능강화",
      "2019-09-01 ~ 2020-06-01",
      "기존 사용하던 서비스 개편으로 인해 (MiPlatform --> NexacroPlatform 14)",
      "통합검색기능 개선(강화) 진행",
      "",
      "SW업데이트시스템구축",
      "2020-06-01 ~ 2020-11-01",
      "기존 사용하던 서비스 개편으로 인해 (MiPlatform --> NexacroPlatform 14)",
      "개편 시스템 구축",
      "",
      "고장진단정보관리",
      "2020-11-01 ~ 2021-08-01",
      "차량 정보를 이용, 빅데이터를 통한 고장진단 데이터 관리 화면 구축",
    ],
  },
];

export const certifications = [
  {
    title: "AWS 클라우드를 활용한 풀스택(React, SpringBoot) 개발",
    org: "코리아IT아카데미",
    date: "2025.02 - 2025.08",
  },
  {
    title: "응용 SW 엔지니어링 과정",
    org: "미래능력개발교육원",
    date: "2018.11 - 2019.08",
  },
  {
    title: "기계공학과 학사 졸업",
    org: "명지전문대학교",
    date: "2014.03 - 2019.02",
  },
];

export const FLOATING_ICONS = [
  "💻", "🚀", "⚡", "🌐", "🧑‍💻", "🛠️", "🎨", "📱", "☁️", "🔒", "📊", "🖥️", "🧩", "🗄️", "📦", "🤖",
  "💻", "🚀", "⚡", "🌐", "🧑‍💻", "🛠️", "🎨", "📱", "☁️", "🔒", "📊", "🖥️", "🧩", "🗄️", "📦", "🤖",
];
