// StarryBackground.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

type NightWeather = "CLEAR" | "RAINY" | "SNOWY";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  blinkRate: number;
}

interface Meteorite {
  x: number;
  y: number;
  length: number;
  dx: number;
  dy: number;
  opacity: number;
  active: boolean;
  color: string;
  reset: (width: number, height: number) => void;
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

export const StarryBackground = () => {
  const { theme, resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const weatherRef = useRef<NightWeather>("CLEAR");

  useEffect(() => {
    setMounted(true);
    // Cycle through night weather conditions every 8 seconds
    const weathers: NightWeather[] = ["CLEAR", "SNOWY", "RAINY"];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % weathers.length;
      weatherRef.current = weathers[currentIndex];
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const currentTheme = theme === "system" ? resolvedTheme : theme;
    if (currentTheme !== "dark") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    let stars: Star[] = [];
    let raindrops: Raindrop[] = [];
    let snowflakes: Snowflake[] = [];

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initElements();
    };

    const initElements = () => {
      stars = [];
      raindrops = [];
      snowflakes = [];
      
      const numStars = Math.floor((width * height) / 2000);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          blinkRate: (Math.random() - 0.5) * 0.05,
        });
      }

      // Rain Drops for night
      const numDrops = Math.floor((width * height) / 1500);
      for (let i = 0; i < numDrops; i++) {
        raindrops.push({
          x: Math.random() * (width + 200),
          y: Math.random() * height,
          length: 15 + Math.random() * 20,
          speedY: 15 + Math.random() * 15,
          speedX: 3 + Math.random() * 2,
          opacity: 0.1 + Math.random() * 0.2, // slightly dimmer at night
          thickness: 1 + Math.random() * 1.5,
        });
      }

      // Snowflakes for night
      const numSnow = Math.floor((width * height) / 2000);
      for (let i = 0; i < numSnow; i++) {
        snowflakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1 + Math.random() * 3,
          speedY: 1 + Math.random() * 2,
          speedX: (Math.random() - 0.5) * 1,
          opacity: 0.3 + Math.random() * 0.5,
          swayLimit: Math.random() * 2,
          swaySpeed: 0.02 + Math.random() * 0.03,
          swayTimer: Math.random() * 100,
        });
      }
    };

    const meteorite: Meteorite = {
      x: 0,
      y: 0,
      length: 0,
      dx: 0,
      dy: 0,
      opacity: 0,
      active: false,
      color: "#ffaa00",
      reset: function (w: number, _h: number) {
        this.x = Math.random() * w;
        this.y = 0;
        this.length = Math.random() * 80 + 40;
        this.dx = 5 + Math.random() * 5;
        this.dy = 5 + Math.random() * 5;
        this.opacity = 1;
        this.active = true;
        const colors = ["#ffaa00", "#ff4400", "#ffffaa", "#ff7700", "#bae6fd"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      },
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    let meteoriteTimer = 0;
    const meteoriteInterval = 3000;
    let lastTime = 0;

    const drawRain = (targetWeather: NightWeather) => {
      if (targetWeather !== "RAINY") return;
      ctx.strokeStyle = "rgba(100, 150, 200, 0.4)";
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

    const drawSnow = (targetWeather: NightWeather) => {
      if (targetWeather !== "SNOWY") return;
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      
      snowflakes.forEach((flake) => {
        ctx.globalAlpha = flake.opacity;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

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

    const draw = (time: number) => {
      if (!lastTime) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      const targetWeather = weatherRef.current;

      // Draw and update stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        // Dim stars slightly when it's raining or snowing
        const dimFactor = targetWeather === "CLEAR" ? 1 : 0.4;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * dimFactor})`;
        ctx.fill();

        star.alpha += star.blinkRate;
        if (star.alpha <= 0 || star.alpha >= 1) {
          star.blinkRate = -star.blinkRate;
        }
        if (star.alpha > 1) star.alpha = 1;
        if (star.alpha < 0) star.alpha = 0;
      }

      // Handle Meteorite
      meteoriteTimer += dt;
      if (!meteorite.active && meteoriteTimer > meteoriteInterval) {
        if (Math.random() > 0.3) {
          meteorite.reset(width, height);
        }
        meteoriteTimer = 0;
      }

      if (meteorite.active) {
        meteorite.x += meteorite.dx;
        meteorite.y += meteorite.dy;
        
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          meteorite.x,
          meteorite.y,
          meteorite.x - meteorite.dx * meteorite.length * 0.1,
          meteorite.y - meteorite.dy * meteorite.length * 0.1
        );
        // Meteorite is dimmer during weather
        const opacityBoost = targetWeather === "CLEAR" ? 1 : 0.6;
        gradient.addColorStop(0, `rgba(255, 255, 255, ${meteorite.opacity * opacityBoost})`);
        gradient.addColorStop(0.2, `${meteorite.color}`);
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(meteorite.x, meteorite.y);
        ctx.lineTo(
          meteorite.x - meteorite.dx * meteorite.length * 0.1,
          meteorite.y - meteorite.dy * meteorite.length * 0.1
        );
        ctx.stroke();

        if (
          meteorite.x > width + meteorite.length ||
          meteorite.y > height + meteorite.length
        ) {
          meteorite.active = false;
        }
      }

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
  if (currentTheme !== "dark") return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-1000"
      style={{ zIndex: -1 }} // Place it behind all other content
    />
  );
};
