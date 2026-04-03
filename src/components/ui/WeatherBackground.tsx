// WeatherBackground.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

type WeatherType = "SUNNY" | "CLOUDY" | "RAINY" | "SNOWY";

interface Cloud {
  x: number;
  y: number;
  scale: number;
  speed: number;
  opacity: number;
}

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speedY: number;
  speedX: number;
  opacity: number;
  thickness: number;
}

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  swayLimit: number;
  swaySpeed: number;
  swayTimer: number;
}

export const WeatherBackground = () => {
  const { theme, resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Start with RAINY to show off the new precipitation right away
  const weatherRef = useRef<WeatherType>("RAINY");
  
  // Track opacity for smooth transitions between skies
  // Track opacity for smooth transitions between skies (Removed unused var)

  useEffect(() => {
    setMounted(true);
    // Cycle through weather conditions every 7 seconds to show variations
    const weathers: WeatherType[] = ["SUNNY", "CLOUDY", "RAINY", "SNOWY"];
    let currentIndex = weathers.indexOf(weatherRef.current);
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % weathers.length;
      weatherRef.current = weathers[currentIndex];
    }, 7000); // 7 seconds per weather

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const currentTheme = theme === "system" ? resolvedTheme : theme;
    if (currentTheme !== "light") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    let clouds: Cloud[] = [];
    let raindrops: Raindrop[] = [];
    let snowflakes: Snowflake[] = [];

    const initElements = () => {
      clouds = [];
      raindrops = [];
      snowflakes = [];
      
      // Always initialize enough elements so they're ready when the weather cycles
      const numClouds = 12; // Good average for all weathers
      for (let i = 0; i < numClouds; i++) {
        clouds.push({
          x: Math.random() * width,
          y: (Math.random() * height) / 3, // Upper third
          scale: 0.8 + Math.random() * 1.5,
          speed: 0.1 + Math.random() * 0.4,
          opacity: 0.8,
        });
      }

      // Rain
      const numDrops = Math.floor((width * height) / 1500);
      for (let i = 0; i < numDrops; i++) {
        raindrops.push({
          x: Math.random() * (width + 200),
          y: Math.random() * height,
          length: 15 + Math.random() * 20,
          speedY: 15 + Math.random() * 15,
          speedX: 3 + Math.random() * 2,
          opacity: 0.3 + Math.random() * 0.3,
          thickness: 1 + Math.random() * 2,
        });
      }

      // Snowflakes
      const numSnow = Math.floor((width * height) / 2000);
      for (let i = 0; i < numSnow; i++) {
        snowflakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1 + Math.random() * 3,
          speedY: 1 + Math.random() * 2,
          speedX: (Math.random() - 0.5) * 1,
          opacity: 0.4 + Math.random() * 0.6,
          swayLimit: Math.random() * 2,
          swaySpeed: 0.02 + Math.random() * 0.03,
          swayTimer: Math.random() * 100,
        });
      }
    };

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initElements();
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    let sunAngle = 0;

    const drawCloud = (cloud: Cloud, targetWeather: WeatherType) => {
      ctx.save();
      ctx.translate(cloud.x, cloud.y);
      ctx.scale(cloud.scale, cloud.scale);

      const isBadWeather = targetWeather === "RAINY" || targetWeather === "SNOWY";
      
      // Smoothly transition cloud opacity/color (basic immediate logic for simplicity)
      if (isBadWeather) {
        ctx.fillStyle = `rgba(160, 170, 180, ${cloud.opacity * 0.9})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
      }

      ctx.beginPath();
      ctx.arc(0, 0, 30, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(30, -30, 40, Math.PI * 1, Math.PI * 2);
      ctx.arc(70, -20, 35, Math.PI * 1.2, Math.PI * 2);
      ctx.arc(100, 0, 30, Math.PI * 1.5, Math.PI * 0.5);
      ctx.closePath();
      ctx.fill();

      if (!isBadWeather) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.05)";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 5;
      }
      ctx.restore();
    };

    const drawSun = (targetWeather: WeatherType) => {
      if (targetWeather !== "SUNNY" && targetWeather !== "CLOUDY") return;
      sunAngle += 0.002;

      const sunX = width * 0.85;
      const sunY = 150;

      ctx.save();
      ctx.translate(sunX, sunY);
      
      // Make it slightly dimmer if Cloudy
      const globalOpacity = targetWeather === "CLOUDY" ? 0.4 : 1;

      // Glow
      const gradient = ctx.createRadialGradient(0, 0, 40, 0, 0, 150);
      gradient.addColorStop(0, `rgba(255, 220, 50, ${0.4 * globalOpacity})`);
      gradient.addColorStop(1, "rgba(255, 220, 50, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, 150, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = `rgba(255, 230, 0, ${0.9 * globalOpacity})`;
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();

      // Rays
      ctx.rotate(sunAngle);
      ctx.strokeStyle = `rgba(255, 200, 0, ${0.6 * globalOpacity})`;
      ctx.lineCap = "round";
      ctx.lineWidth = 6;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 60);
        ctx.lineTo(0, 90);
        ctx.stroke();
        ctx.rotate((Math.PI * 2) / 8);
      }

      ctx.restore();
    };

    const drawRain = (targetWeather: WeatherType) => {
      if (targetWeather !== "RAINY") return;
      ctx.strokeStyle = "rgba(180, 190, 220, 0.6)";
      ctx.lineCap = "round";

      raindrops.forEach((drop) => {
        ctx.lineWidth = drop.thickness;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.speedX * (drop.length / 10), drop.y + drop.speedY * (drop.length / 10));
        ctx.stroke();

        drop.y += drop.speedY;
        drop.x -= drop.speedX;

        if (drop.y > height) {
          drop.y = -50;
          drop.x = Math.random() * (width + 200);
        }
      });
    };

    const drawSnow = (targetWeather: WeatherType) => {
      if (targetWeather !== "SNOWY") return;
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      
      snowflakes.forEach((flake) => {
        ctx.globalAlpha = flake.opacity;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Add sway movement for snow
        flake.swayTimer += flake.swaySpeed;
        const swayX = Math.sin(flake.swayTimer) * flake.swayLimit;

        flake.y += flake.speedY;
        flake.x += flake.speedX + swayX * 0.1;

        if (flake.y > height) {
          flake.y = -50;
          flake.x = Math.random() * width;
        }
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const targetWeather = weatherRef.current;

      // Dynamic Sky Gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      if (targetWeather === "SUNNY") {
        bgGradient.addColorStop(0, "#87CEEB");
        bgGradient.addColorStop(1, "#f2f9ff");
      } else if (targetWeather === "CLOUDY") {
        bgGradient.addColorStop(0, "#cbd5e1");
        bgGradient.addColorStop(1, "#f1f5f9");
      } else if (targetWeather === "RAINY") {
        bgGradient.addColorStop(0, "#71717a");
        bgGradient.addColorStop(1, "#e4e4e7");
      } else if (targetWeather === "SNOWY") {
        bgGradient.addColorStop(0, "#9ca3af"); // slightly cooler grey for snow
        bgGradient.addColorStop(1, "#f3f4f6");
      }

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      drawSun(targetWeather);

      // Manage cloud visibility based on weather
      clouds.forEach((cloud, idx) => {
        // Less clouds in SUNNY mode
        if (targetWeather === "SUNNY" && idx % 2 === 0) return;
        
        drawCloud(cloud, targetWeather);
        cloud.x += cloud.speed;
        if (cloud.x > width + 100) {
          cloud.x = -150;
        }
      });

      drawRain(targetWeather);
      drawSnow(targetWeather);

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, resolvedTheme, mounted]);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  if (currentTheme !== "light") return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-1000"
      style={{ zIndex: -1 }}
    />
  );
};
