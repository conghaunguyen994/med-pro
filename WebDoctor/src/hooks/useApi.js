import { useState } from "react";

/**
 * Hook gọi API
 *
 * @param {*} opts
 * @returns
 */
export function useApi(path, opts = {}) {
  const [loading, setLoading] = useState(false);

  const loadData = async (query = "", data = {}, isFormData = false) => {
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:8080${path}${query}`, {
        method: opts.method || "GET",
        body:
          opts.method == "POST" || opts.method == "PUT"
            ? isFormData
              ? data
              : JSON.stringify(data)
            : null,
        redirect: "follow",
        headers: {
          ...(!isFormData ? { "Content-Type": "application/json" } : {}),
          ...(localStorage.getItem("@db/token") != null
            ? {
                Authorization: "Bearer " + localStorage.getItem("@db/token"),
              }
            : {}),
        },
      });
      const json = await res.json();

      return json;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return [loading, loadData];
}
