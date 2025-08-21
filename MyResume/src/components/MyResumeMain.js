import { useEffect, useMemo, useRef, useState } from "react";
import PageViews from "../components/PageViews";

import face from '../images/face.jpg';
import "./MyResumeMain.css";

// mock 데이터
import {
  skills,
  projects,
  experiences,
  certifications,
  FLOATING_ICONS,
} from "../data/resumeData";

function getRandomPosition(index) {
  const top = Math.floor(Math.random() * 85) + 5;
  const left = Math.floor(Math.random() * 85) + 5;
  const delay = (Math.random() * 5).toFixed(1);
  return {
    top: `${top}%`,
    left: `${left}%`,
    animationDelay: `${delay}s`,
    fontSize: `${Math.floor(Math.random() * 40) + 30}px`,
  };
}

export default function MyResumeMain() {
  // 스킬바 애니메이션
  useEffect(() => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 500);
    });
  }, []);

  // ===== 사이드 네비: 섹션 refs & 활성 섹션 감지 =====
  const sections = useMemo(
    () => ([
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "education", label: "Education" },
    ]),
    []
  );

  const sectionRefs = useRef(
    sections.reduce((acc, s) => {
      acc[s.id] = null;
      return acc;
    }, {})
  );

  const [activeId, setActiveId] = useState(sections[0].id);

  // IntersectionObserver로 현재 섹션 하이라이트
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActiveId(id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: 0.1,
      }
    );

    const nodes = Object.values(sectionRefs.current).filter(Boolean);
    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 부드러운 스크롤
  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* 조회수 배지 (고정 표시) */}
      <PageViews
        namespace="sehyun-portfolio"
        keyName="myresume-v1"
      />
      <div className="floating-elements">
        {FLOATING_ICONS.map((icon, i) => (
          <div key={i} className="floating-element" style={getRandomPosition(i)}>
            {icon}
          </div>
        ))}
      </div>

      {/* ===== 사이드 네비게이션 ===== */}
      <nav className="side-nav">
        <ul>
          {sections.map((s) => (
            <li key={s.id}>
              <button
                className={`side-nav-btn ${activeId === s.id ? "active" : ""}`}
                onClick={() => scrollTo(s.id)}
                aria-current={activeId === s.id ? "page" : undefined}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container">
        {/* 헤더(About 섹션의 앵커 역할) */}
        <header
          className="header target-section"
          id="about"
          ref={(el) => (sectionRefs.current["about"] = el)}
        >
          <img className="profile-img" src={face} alt="프로필 이미지" />
          <h1 className="name">박세현</h1>
          <p className="title">Full Stack Developer | Backend & Frontend</p>
          <div className="contact-info">
            <a href="mailto:jdg9926@naver.com" className="contact-item">📧 jdg9926@naver.com</a>
            <a href="tel:+82-10-9041-7013" className="contact-item">📱 010-9041-7013</a>
            <a href="https://github.com/jdg9926" className="contact-item" target="_blank" rel="noopener noreferrer">🐱 GitHub</a>
          </div>
        </header>

        {/* 자기소개 */}
        <section className="section" aria-labelledby="about-title">
          <h2 className="section-title" id="about-title">👋 About Me</h2>
          <p style={{ fontSize: '1.1em', lineHeight: 1.8, color: '#555' }}>
            안녕하세요! 3년차 개발자입니다.
            백엔드와 프론트엔드 개발 모두에 열정을 가지고 있으며,
            사용자 중심의 웹 애플리케이션을 만드는 것을 좋아합니다.
            새로운 기술을 배우고 적용하는 것에 즐거움을 느끼며,
            팀과의 협업을 통해 더 나은 결과를 만들어내는 것을 중요하게 생각합니다.
          </p>
        </section>

        {/* 기술 스택 */}
        <section
          className="section target-section"
          id="skills"
          ref={(el) => (sectionRefs.current["skills"] = el)}
        >
          <h2 className="section-title">💻 Tech Skills</h2>
          <div className="skills-grid">
            {skills.map((category, i) => (
              <div className="skill-category" key={i}>
                <h3>{category.category}</h3>
                {category.items.map(item => (
                  <div className="skill-item" key={item.name}>
                    <span>{item.name}</span>
                    <div className="skill-bar">
                      <div className="skill-progress" data-width={`${item.level}%`} style={{ width: `${item.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* 프로젝트 */}
        <section
          className="section target-section"
          id="projects"
          ref={(el) => (sectionRefs.current["projects"] = el)}
        >
          <h2 className="section-title">🚀 Projects</h2>
          <div className="project-grid">
            {projects.map((proj, i) => (
              <div className="project-card" key={i}>
                <div className="project-image">
                  {typeof proj.image === "string" && proj.image.includes(".png") ? (
                    <img src={proj.image} alt={proj.title} style={{ width: "90%", height: "90%" }} />
                  ) : (
                    proj.image
                  )}
                </div>
                <div className="project-content">
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-description">{proj.description}</p>
                  <div className="tech-stack">
                    {proj.techStack.map((tech, j) => (
                      <span className="tech-tag" key={j}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {proj.live && (
                      <a href={proj.live} className="project-link btn-primary" target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </a>
                    )}
                    <a href={proj.github} className="project-link btn-secondary" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 경력 */}
        <section
          className="section target-section"
          id="experience"
          ref={(el) => (sectionRefs.current["experience"] = el)}
        >
          <h2 className="section-title">💼 Experience</h2>
          <div className="experience-timeline">
            {experiences.map((exp, i) => (
              <div className="experience-item" key={i}>
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-company">{exp.company}</p>
                <p className="experience-period">{exp.period}</p>
                <p className="experience-description">
                  {exp.description.map((desc, idx) => (
                    <span key={idx}>{desc}<br /></span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 교육/자격증 */}
        <section
          className="section target-section"
          id="education"
          ref={(el) => (sectionRefs.current["education"] = el)}
        >
          <h2 className="section-title">🎓 Education</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {certifications.map((cert, i) => (
              <div key={i} style={{ background: 'rgba(102, 126, 234, 0.1)', padding: 20, borderRadius: 15 }}>
                <h3 style={{ color: '#667eea', marginBottom: 10 }}>{cert.title}</h3>
                <p style={{ color: '#666', marginBottom: 5 }}>{cert.org}</p>
                <p style={{ color: '#888', fontSize: '0.9em' }}>{cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
