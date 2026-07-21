"use client";

import { useEffect, useState, useCallback } from "react";
import { signalApi, historyApi, ApiError } from "./api";
import type { AnySignal } from "./types";

export function useLiveSignals() {
  const [signals, setSignals] = useState<AnySignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    setStatusCode(null);
    try {
      const data = await signalApi.getAllLive();
      setSignals(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        setStatusCode(err.status);
      } else {
        setError("Couldn't load signals right now.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    // Live signals refresh on a schedule server-side every 15–60 min; poll every 2 min
    const interval = setInterval(refresh, 120_000);
    return () => clearInterval(interval);
  }, [refresh]);

  return { signals, loading, error, statusCode, refresh };
}

export function useHistory(params?: { instrument?: string; limit?: number }) {
  const [history, setHistory] = useState<AnySignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    setStatusCode(null);
    try {
      const data = await historyApi.getHistory(params);
      setHistory(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        setStatusCode(err.status);
      } else {
        setError("Couldn't load history right now.");
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.instrument, params?.limit]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { history, loading, error, statusCode, refresh };
}
