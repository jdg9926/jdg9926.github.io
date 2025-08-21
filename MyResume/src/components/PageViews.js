// src/components/PageViews.js
import { useEffect, useState } from "react";

/**
 * CountAPI 조회수 배지
 * - 첫 렌더 시 1회 증가(hit)하고 현재 값을 표시합니다.
 * - namespace/key는 고유하게 설정하세요.
 */
export default function PageViews({
  namespace = "sehyun-portfolio",
  keyName = "myresume-v1",
  className = "",
}) {
  const [count, setCount] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    // ex) https://api.countapi.xyz/hit/sehyun-portfolio/myresume-v1
    const url = `https://api.countapi.xyz/hit/${encodeURIComponent(namespace)}/${encodeURIComponent(keyName)}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // data = { value: number, ... }
        if (typeof data?.value === "number") setCount(data.value);
        else setErr("조회수 응답 형식이 올바르지 않습니다.");
      })
      .catch(() => setErr("조회수 불러오기 실패"));
  }, [namespace, keyName]);

  return (
    <div className={`page-views-badge ${className}`}>
      <span className="page-views-eye" aria-hidden>👀</span>
      <span className="page-views-text">조회수</span>
      <span className="page-views-value">
        {err ? "—" : (count ?? "…")}
      </span>
    </div>
  );
}
