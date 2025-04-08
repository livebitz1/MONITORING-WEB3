import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BACKEND_URL } from "@/config";

interface Website {
  id: string;
  url: string;
  ticks: {
    id: string;
    createdAt: string;
    status: string;
    latency: number;
  }[];
}

export function useWebsite() {
  const { getToken } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);

  async function refreshWebsites() {
    const token = await getToken();
    try {
      const response = await axios.get(`${API_BACKEND_URL}/api/v1/websites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWebsites(response.data);
    } catch (error) {
      console.error("Failed to fetch websites:", error);
    }
  }

  useEffect(() => {
    refreshWebsites();

    const interval = setInterval(() => {
      refreshWebsites();
    }, 1000 * 60 * 1); // 1 minute

    return () => {
      clearInterval(interval);
    };
  }, []);

  return websites;
}
