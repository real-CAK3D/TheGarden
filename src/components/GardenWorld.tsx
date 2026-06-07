'use client';

import type { CSSProperties } from 'react';
import { agents, devices, statusCopy, type AgentStatus, type GardenAgent } from '@/lib/gardenData';
import { useGardenStore } from '@/lib/store';

const statusClass: Record<AgentStatus, string> = {
  working: 'status-working',
  idle: 'status-idle',
  watching: 'status-watching',
  warning: 'status-warning',
  offline: 'status-offline',
};

function mapX(x: number) {
  return `${50 + x * 6.2}%`;
}

function mapZ(z: number) {
  return `${50 + z * 6.2}%`;
}

function patrolPath(agent: GardenAgent) {
  return agent.patrol
    .map(([x, , z], index) => `${index === 0 ? 'M' : 'L'} ${50 + x * 6.2} ${50 + z * 6.2}`)
    .join(' ');
}

export function GardenWorld() {
  const selectedAgent = useGardenStore((s) => s.selectedAgent);
  const setSelectedAgent = useGardenStore((s) => s.setSelectedAgent);

  return (
    <section className="world-shell" aria-label="Animated Garden world map">
      <div className="living-world">
        <div className="sky-orbit orbit-one" />
        <div className="sky-orbit orbit-two" />
        <div className="island-core" />
        <div className="path-ring path-ring-one" />
        <div className="path-ring path-ring-two" />

        <svg className="patrol-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 18 32 L 50 50 L 85 36" />
          <path d="M 50 14 L 50 50 L 51 87" />
          <path d="M 19 56 L 50 50 L 85 72" />
          {agents.map((agent) => (
            <path key={agent.id} className={selectedAgent.id === agent.id ? 'active-patrol' : ''} d={`${patrolPath(agent)} Z`} />
          ))}
        </svg>

        {devices.map((device) => (
          <button
            key={device.id}
            className={`zone-building ${statusClass[device.status]}`}
            style={{ left: mapX(device.position[0]), top: mapZ(device.position[2]), '--zone-color': device.color } as CSSProperties}
            onClick={() => {
              const related = agents.find((agent) => agent.currentTask.toLowerCase().includes(device.name.toLowerCase()) || agent.zone.toLowerCase().includes(device.name.toLowerCase()));
              if (related) setSelectedAgent(related);
            }}
            title={`${device.name}: ${device.detail}`}
          >
            <span className="building-roof" />
            <span className="building-body" />
            <span className="beacon" />
            <strong>{device.name}</strong>
            <small>{device.kind}</small>
          </button>
        ))}

        {agents.map((agent, index) => (
          <button
            key={agent.id}
            className={`agent-sprite ${selectedAgent.id === agent.id ? 'selected' : ''} ${statusClass[agent.status]}`}
            style={{
              left: mapX(agent.home[0]),
              top: mapZ(agent.home[2]),
              '--agent-color': agent.color,
              '--delay': `${index * -1.7}s`,
              '--range-x': `${Math.sin(index + 1) * 34}px`,
              '--range-y': `${Math.cos(index + 2) * 28}px`,
            } as CSSProperties}
            onClick={() => setSelectedAgent(agent)}
            title={`${agent.name}: ${statusCopy[agent.status]} — ${agent.currentTask}`}
          >
            <span className="sprite-shadow" />
            <span className="sprite-body" />
            <span className="sprite-head" />
            <span className="sprite-pulse" />
            <em>{agent.name}</em>
          </button>
        ))}
      </div>
      <div className="world-vignette" />
      <div className="world-caption">living map • click an agent • static-safe Vercel build</div>
    </section>
  );
}
