'use client';

import type { CSSProperties } from 'react';
import { agents, statusCopy, type AgentStatus, type GardenAgent } from '@/lib/gardenData';
import { useGardenStore } from '@/lib/store';

const statusClass: Record<AgentStatus, string> = {
  working: 'status-working',
  idle: 'status-idle',
  watching: 'status-watching',
  warning: 'status-warning',
  offline: 'status-offline',
};

function mapX(x: number) {
  return `${50 + x * 5.8}%`;
}

function mapZ(z: number) {
  return `${51 + z * 5.35}%`;
}

function agentStyle(agent: GardenAgent, index: number): CSSProperties {
  return {
    left: mapX(agent.home[0]),
    top: mapZ(agent.home[2]),
    '--agent-color': agent.color,
    '--skin': agent.skinTone,
    '--hair': agent.hair,
    '--outfit': agent.outfit,
    '--delay': `${index * -1.35}s`,
    '--range-x': `${Math.sin(index + 1.2) * 18}px`,
    '--range-y': `${Math.cos(index + 0.7) * 14}px`,
  } as CSSProperties;
}

function SeedSparkles() {
  return (
    <>
      {Array.from({ length: 14 }).map((_, index) => (
        <span key={index} className="seed-spark" style={{ '--seed-delay': `${index * 0.33}s`, '--seed-left': `${12 + (index * 7) % 78}%`, '--seed-top': `${18 + (index * 11) % 60}%` } as CSSProperties} />
      ))}
    </>
  );
}

function GardenBeds() {
  const beds = [
    ['tomatoes', 'left', 'Tomato bed'],
    ['carrots', 'center', 'Carrot bed'],
    ['flowers', 'right', 'Flower bed'],
    ['greens', 'lower-left', 'Leafy greens'],
    ['peppers', 'lower-right', 'Pepper bed'],
  ];

  return (
    <div className="garden-beds" aria-hidden="true">
      {beds.map(([crop, pos, label]) => (
        <div key={crop} className={`garden-bed bed-${pos} crop-${crop}`} title={label}>
          <span className="bed-rim" />
          <span className="soil-lines" />
          {Array.from({ length: 9 }).map((_, index) => (
            <i key={index} />
          ))}
        </div>
      ))}
    </div>
  );
}

function CornField() {
  return (
    <div className="corn-field" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, index) => (
        <span key={index} style={{ '--corn-delay': `${index * -0.08}s` } as CSSProperties} />
      ))}
    </div>
  );
}

function FarmHouse() {
  return (
    <div className="farmhouse" aria-hidden="true">
      <div className="house-roof" />
      <div className="house-body">
        <span className="porch" />
        <span className="window window-one" />
        <span className="window window-two" />
        <span className="door" />
      </div>
    </div>
  );
}

function ShedAndScarecrow() {
  return (
    <>
      <div className="garden-shed" aria-hidden="true">
        <span className="shed-roof" />
        <span className="shed-door" />
        <span className="tool-rake" />
      </div>
      <div className="scarecrow" aria-label="Small scarecrow watching the corn field">
        <span className="scarecrow-hat" />
        <span className="scarecrow-head" />
        <span className="scarecrow-arms" />
        <span className="scarecrow-body" />
        <span className="scarecrow-post" />
      </div>
    </>
  );
}

function OakTree() {
  return (
    <div className="oak-tree" aria-hidden="true">
      <span className="tree-shadow" />
      <span className="tree-trunk" />
      <span className="leaf leaf-one" />
      <span className="leaf leaf-two" />
      <span className="leaf leaf-three" />
      <span className="music-notes">♪ ♫</span>
    </div>
  );
}

function TractorAndTruck() {
  return (
    <>
      <div className="tractor-track" aria-hidden="true" />
      <div className="tractor" aria-hidden="true">
        <span className="tractor-trailer"><i /><i /><i /></span>
        <span className="tractor-body" />
        <span className="tractor-seat" />
        <span className="wheel wheel-big" />
        <span className="wheel wheel-small" />
      </div>
      <div className="red-truck" aria-hidden="true">
        <span className="truck-bed"><i /><i /></span>
        <span className="truck-cab" />
        <span className="truck-window" />
        <span className="truck-wheel left" />
        <span className="truck-wheel right" />
      </div>
    </>
  );
}

function Birds() {
  return (
    <>
      <div className="bird bird-one" aria-hidden="true"><span /></div>
      <div className="bird bird-two" aria-hidden="true"><span /></div>
    </>
  );
}

function Butterflies() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={`butterfly butterfly-${index + 1}`} aria-hidden="true" />
      ))}
    </>
  );
}

function AgentAvatar({ agent, index }: { agent: GardenAgent; index: number }) {
  const selectedAgent = useGardenStore((s) => s.selectedAgent);
  const setSelectedAgent = useGardenStore((s) => s.setSelectedAgent);

  return (
    <button
      className={`person person-${agent.id} anim-${agent.animation} ${selectedAgent.id === agent.id ? 'selected' : ''} ${statusClass[agent.status]}`}
      style={agentStyle(agent, index)}
      onClick={() => setSelectedAgent(agent)}
      title={`${agent.name}: ${statusCopy[agent.status]} — ${agent.sceneRole}`}
    >
      <span className="person-shadow" />
      <span className="legs"><i /><i /></span>
      <span className="body" />
      <span className="arm arm-left" />
      <span className="arm arm-right" />
      <span className="head">
        <span className="hair" />
        <span className="face-detail" />
      </span>
      <span className="prop prop-one" />
      <span className="prop prop-two" />
      <span className="action-fx" />
      <em>{agent.name}</em>
    </button>
  );
}

export function GardenWorld() {
  return (
    <section className="world-shell" aria-label="Animated 3D-style farm garden dashboard">
      <div className="sun-glow" />
      <Birds />
      <div className="farm-scene">
        <div className="ground-plane">
          <span className="lawn-texture" />
          <span className="driveway" />
          <span className="stone-path path-one" />
          <span className="stone-path path-two" />
          <FarmHouse />
          <OakTree />
          <ShedAndScarecrow />
          <GardenBeds />
          <CornField />
          <SeedSparkles />
          <TractorAndTruck />
          <Butterflies />
          {agents.map((agent, index) => (
            <AgentAvatar key={agent.id} agent={agent} index={index} />
          ))}
        </div>
      </div>
      <div className="world-vignette" />
      <div className="world-caption">3D-style farm diorama • dashboard-only agent appearances • Vercel-safe animation</div>
    </section>
  );
}
