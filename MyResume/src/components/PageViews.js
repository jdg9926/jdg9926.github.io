// src/components/PageViews.js
import { useEffect, useMemo, useState } from "react";

/**
 * 페이지 조회수 배지 (Abacus 기반)
 * - 첫 렌더 시 카운트 +1 (hit) 후 현재 값을 표시합니다.
 * - CountAPI가 불안정해서 Abacus로 교체했습니다.
 *
 * Props
 * - namespace: 프로젝트/도메인 단위 네임스페이스 (기본: "sehyun-portfolio")
 * - keyName: 페이지/컴포넌트 키 (기본: "myresume-v1")
 * - perPath: 경로별 개별 카운트 여부 (기본: false)
 * - className: 추가 클래스
 *
 * 참고: Abacus 엔드포인트
 *  - 증가: https://abacus.jasoncameron.dev/hit/{NAMESPACE}/{KEY}
 *  - 조회: https://abacus.jasoncameron.dev/get/{NAMESPACE}/{KEY}
 */
export default function PageViews({
  namespace = "sehyun-portfolio",
  keyName = "myresume-v1",
  perPath = false,
  className = "",
}) {
  const [count, setCount] = useState(null);
  const [err, setErr] = useState(null);

  const ABACUS = "https://abacus.jasoncameron.dev";

  // perPath=true면 현재 경로를 키에 붙여 페이지별 카운트가 되도록 함
  const effectiveKey = useMemo(() => {
    if (!perPath) return keyName;
    const path = (typeof window !== "undefined"
      ? window.location.pathname
      : "/"
    )
      .replace(/^\/+/, "") // 앞 슬래시 제거
      .replace(/\/+$/, "") // 뒤 슬래시 제거
      .replace(/\//g, "_") // 중간 슬래시 → _
      || "home";
    return `${keyName}-${path}`;
  }, [keyName, perPath]);

  useEffect(() => {
    let cancelled = false;

    const hitAndGet = async () => {
      try {
        // 1) 증가(+1)
        const hitRes = await fetch(
          `${ABACUS}/hit/${encodeURIComponent(namespace)}/${encodeURIComponent(effectiveKey)}`,
          { cache: "no-store" }
        );
        const hitData = await hitRes.json().catch(() => ({}));

        if (!cancelled && typeof hitData?.value === "number") {
          setCount(hitData.value);
          setErr(null);
          return;
        }

        // 2) 응답 형식이 이상하면 조회만 시도
        const getRes = await fetch(
          `${ABACUS}/get/${encodeURIComponent(namespace)}/${encodeURIComponent(effectiveKey)}`,
          { cache: "no-store" }
        );
        const getData = await getRes.json().catch(() => ({}));

        if (!cancelled && typeof getData?.value === "number") {
          setCount(getData.value);
          setErr(null);
        } else if (!cancelled) {
          setErr("조회수 응답 형식이 올바르지 않습니다.");
        }
      } catch (e) {
        if (!cancelled) {
          setErr("조회수 불러오기 실패");
        }
      }
    };

    hitAndGet();
    return () => {
      cancelled = true;
    };
  }, [namespace, effectiveKey]);

  return (
    <div
      className={`page-views-badge ${className}`}
      aria-live="polite"
      title={err ? "조회수 로드 실패" : "페이지 조회수"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.95rem",
      }}
    >
      <span className="page-views-eye" aria-hidden>
        👀
      </span>
      <span className="page-views-text">조회수</span>
      <span
        className="page-views-value"
        style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600 }}
      >
        {err ? "—" : count === null ? "…" : Number(count).toLocaleString()}
      </span>
    </div>
  );
}
