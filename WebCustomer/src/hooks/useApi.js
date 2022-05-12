import { useState } from "react";

/**
 * Hook gọi API
 *
 * @param {*} opts
 * @returns
 */
export function useApi(path, opts = {}) {
  const [loading, setLoading] = useState(false);

  const loadData = async (query = "", data = {}) => {
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:8080${path}${query}`, {
        method: opts.method || "GET",
        body: opts.method == "POST" ? JSON.stringify(data) : null,
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
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
