import { ImageResponse } from 'workers-og';
import client from '../../../../../client.json';

export const prerender = false;

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') || client.business.name;
  const description = url.searchParams.get('description') || client.business.tagline;

  // Render social image card using Tailwind-like inline styles in Satori
  const html = `
    <div style="
      display: flex;
      flex-direction: column;
      width: 1200px;
      height: 630px;
      background-color: #0b0f19;
      color: white;
      padding: 90px;
      font-family: sans-serif;
      justify-content: space-between;
      box-sizing: border-box;
      position: relative;
    ">
      <!-- Gradient border accent on the left -->
      <div style="
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 8px;
        background: linear-gradient(to bottom, #10b981, #3b82f6);
      "></div>

      <!-- Glowing background orbs -->
      <div style="
        position: absolute;
        top: -150px;
        left: -150px;
        width: 400px;
        height: 400px;
        border-radius: 200px;
        background-color: #10b981;
        opacity: 0.12;
      "></div>
      <div style="
        position: absolute;
        bottom: -200px;
        right: -200px;
        width: 500px;
        height: 500px;
        border-radius: 250px;
        background-color: #3b82f6;
        opacity: 0.12;
      "></div>

      <!-- Content Area -->
      <div style="display: flex; flex-direction: column; gap: 15px; z-index: 10;">
        <!-- Top Badge -->
        <div style="
          display: flex;
          align-self: flex-start;
          background-color: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 8px 16px;
          border-radius: 30px;
          color: #10b981;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        ">
          ${client.business.tagline}
        </div>
        
        <!-- Title -->
        <h1 style="
          font-size: 60px;
          font-weight: 800;
          line-height: 1.15;
          margin: 15px 0 5px 0;
          color: #ffffff;
          display: flex;
          flex-wrap: wrap;
        ">
          ${title}
        </h1>
        
        <!-- Description -->
        <p style="
          font-size: 24px;
          color: #94a3b8;
          line-height: 1.5;
          margin: 0;
          max-width: 950px;
          display: flex;
          flex-wrap: wrap;
        ">
          ${description}
        </p>
      </div>

      <!-- Footer Branding -->
      <div style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 35px;
        z-index: 10;
      ">
        <span style="font-size: 22px; font-weight: 600; color: #cbd5e1; display: flex; align-items: center;">
          ${client.business.name}
        </span>
        <span style="font-size: 20px; color: #64748b; font-weight: 500;">
          ${client.domain.production.replace(/^https?:\/\//, '')}
        </span>
      </div>
    </div>
  `;

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
  });
}
