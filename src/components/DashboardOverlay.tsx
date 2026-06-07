'use client';

import { Activity, Bot, Clock3, Cpu, RadioTower, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { agents, devices, statusCopy } from '@/lib/gardenData';
import { useGardenStore } from '@/lib/store';

const statusClass: Record<string, string> = {
  working: 'status-working',
  idle: 'status-idle',
  watching: 'status-watching',
  warning: 'status-warning',
  offline: 'status-offline',
};

export function DashboardOverlay() {
  const selectedAgent = useGardenStore((s) => s.selectedAgent);
  const setSelectedAgent = useGardenStore((s) => s.setSelectedAgent);
  const working = agents.filter((a) => a.status === 'working').length;
  const watching = agents.filter((a) => a.status === 'watching').length;

  return (
    <div className="overlay-grid">
      <motion.section className="glass hero-panel" initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="eyebrow"><Sparkles size={16} /> The Garden Live</div>
        <h1>Living Agent Dashboard</h1>
        <p>
          A top-down animated command world for CAK3D&apos;s agents, devices, memory lanes, and workshop vibes.
          This first build is static-safe and Vercel-ready; the live telemetry bridge can plug in next.
        </p>
        <div className="hero-stats">
          <span><Bot size={16} /> {agents.length} agents</span>
          <span><Cpu size={16} /> {devices.length} devices</span>
          <span><Activity size={16} /> {working} working</span>
          <span><RadioTower size={16} /> {watching} watching</span>
        </div>
      </motion.section>

      <motion.aside className="glass agent-list" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
        <div className="panel-title">Agent Roster</div>
        {agents.map((agent) => (
          <button key={agent.id} className={`agent-row ${selectedAgent.id === agent.id ? 'active' : ''}`} onClick={() => setSelectedAgent(agent)}>
            <span className="agent-dot" style={{ background: agent.color, boxShadow: `0 0 18px ${agent.color}` }} />
            <span>
              <strong>{agent.name}</strong>
              <small>{agent.title}</small>
            </span>
            <em className={statusClass[agent.status]}>{statusCopy[agent.status]}</em>
          </button>
        ))}
      </motion.aside>

      <motion.aside className="glass detail-panel" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.18 }}>
        <div className="panel-title">Selected Agent</div>
        <div className="agent-headline">
          <div className="avatar-glow" style={{ background: selectedAgent.color, boxShadow: `0 0 36px ${selectedAgent.color}` }} />
          <div>
            <h2>{selectedAgent.name}</h2>
            <p>{selectedAgent.title}</p>
          </div>
        </div>
        <div className="status-pill-row">
          <span className={`status-pill ${statusClass[selectedAgent.status]}`}>{statusCopy[selectedAgent.status]}</span>
          <span className="status-pill neutral">{selectedAgent.zone}</span>
        </div>
        <p className="task-copy">{selectedAgent.currentTask}</p>
        <div className="mini-grid">
          <div><Clock3 size={16} /> Last seen <strong>{selectedAgent.stats.lastSeen}</strong></div>
          <div><RadioTower size={16} /> Signal <strong>{selectedAgent.stats.signal}</strong></div>
          <div><Activity size={16} /> Pulse <strong>{selectedAgent.stats.pulse}</strong></div>
        </div>
        <div className="mood-box">
          <span>Mood</span>
          <p>{selectedAgent.mood}</p>
        </div>
      </motion.aside>

      <motion.section className="glass device-strip" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
        <div className="panel-title">Device Zones</div>
        <div className="device-grid">
          {devices.map((device) => (
            <div key={device.id} className="device-card">
              <span className="device-light" style={{ background: device.color, boxShadow: `0 0 16px ${device.color}` }} />
              <strong>{device.name}</strong>
              <small>{device.kind}</small>
              <p>{device.detail}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
