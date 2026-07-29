import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  projectFilters,
  projects,
  type Project,
  type ProjectFilter,
} from "../data/projects";

function ExternalArrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  if (!project) return null;

  return (
    <dialog
      className="project-dialog noise-layer"
      ref={dialogRef}
      aria-labelledby={`project-dialog-title-${project.id}`}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="project-dialog__inner">
        <button
          className="dialog-close"
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="프로젝트 상세 닫기"
        >
          <span />
          <span />
        </button>

        <div
          className={`project-dialog__visual project-visual project-visual--${project.visual}`}
          aria-hidden="true"
        >
          <span className="project-visual__index">{project.index}</span>
          <span className="project-visual__mark">XTR</span>
        </div>

        <div className="project-dialog__content">
          <div className="project-dialog__meta">
            <span>{project.label}</span>
            <span>{project.year}</span>
          </div>
          <h3 id={`project-dialog-title-${project.id}`}>{project.title}</h3>
          <p className="project-dialog__lead">{project.summary}</p>
          <p className="project-dialog__description">{project.description}</p>

          <ul className="tag-list" aria-label="프로젝트 분야">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {project.href ? (
            <a
              className="button button--ink"
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              라이브 사이트
              <ExternalArrow />
            </a>
          ) : (
            <span className="project-dialog__note">
              Selected project / 상세 자료 준비 중
            </span>
          )}
        </div>
      </div>
    </dialog>
  );
}

export function ProjectArchive() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category.includes(activeFilter));

  return (
    <section className="work-section section" id="work" aria-labelledby="work-title">
      <div className="page-shell">
        <div className="section-heading">
          <div>
            <p className="section-index">01 / SELECTED WORK</p>
            <h2 id="work-title">작업 아카이브</h2>
          </div>
          <p className="section-heading__copy">
            제품부터 실험까지, 문제에 맞는 형식으로 만든 작업들입니다.
            필터로 분야를 골라보세요.
          </p>
        </div>

        <div className="filter-bar">
          <div className="filter-list" aria-label="프로젝트 필터">
            {projectFilters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={filter === activeFilter ? "is-active" : ""}
                aria-pressed={filter === activeFilter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <span className="filter-count" aria-live="polite">
            {String(filteredProjects.length).padStart(2, "0")} PROJECTS
          </span>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project) => (
            <article
              className={`project-card project-card--${project.size}`}
              key={project.id}
              style={{ "--card-order": Number(project.index) } as CSSProperties}
            >
              <button
                className="project-card__button"
                type="button"
                onClick={() => setSelectedProject(project)}
                aria-label={`${project.title} 프로젝트 상세 보기`}
              >
                <div
                  className={`project-visual project-visual--${project.visual} noise-layer`}
                  aria-hidden="true"
                >
                  <span className="project-visual__index">{project.index}</span>
                  <span className="project-visual__mark">XTR</span>
                  <span className="project-visual__action">OPEN ↗</span>
                </div>

                <div className="project-card__body">
                  <div className="project-card__meta">
                    <span>{project.label}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="project-card__footer">
                    <span>{project.category.join(" / ")}</span>
                    <span className="circle-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
