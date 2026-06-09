'use client';

import { Activity, Bot, ChevronRight, Cpu, EyeOff, Leaf, RadioTower, Sprout } from 'lucide-react';
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
    <div className="hud-shell">
      <motion.header className="hud-card title-hud" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        <div className="hud-eyebrow"><Leaf size={15} /> The Garden Live</div>
        <h1>Gnome Garden</h1>
        <p>Real Three.js low-poly dashboard. Tiny agents walk their routes; the UI stays out of the scenery&apos;s way.</p>
        <div className="hud-stats">
          <span><Bot size={14} /> {agents.length}</span>
          <span><Cpu size={14} /> {devices.length}</span>
          <span><Activity size={14} /> {working}</span>
          <span><RadioTower size={14} /> {watching}</span>
        </div>
      </motion.header>

      <motion.aside className="hud-card selected-hud" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
        <div className="mini-title">Selected Gnome</div>
        <div className="selected-headline">
          <span className="selected-orb" style={{ background: selectedAgent.color, boxShadow: `0 0 28px ${selectedAgent.color}` }} />
          <div>
            <h2>{selectedAgent.name}</h2>
            <p>{selectedAgent.title}</p>
          </div>
        </div>
        <div className="pill-row">
          <span className={`pill ${statusClass[selectedAgent.status]}`}>{statusCopy[selectedAgent.status]}</span>
          <span className="pill neutral">{selectedAgent.zone}</span>
        </div>
        <p className="scene-line">{selectedAgent.sceneRole}</p>
        <p className="task-line">{selectedAgent.currentTask}</p>
        <div className="prop-line"><Sprout size={14} /> {selectedAgent.prop}</div>
      </motion.aside>

      <motion.nav className="hud-card roster-dock" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.18 }} aria-label="Gnome agent roster">
        {agents.map((agent) => (
          <button key={agent.id} className={`dock-agent ${selectedAgent.id === agent.id ? 'active' : ''}`} onClick={() => setSelectedAgent(agent)} title={`${agent.name}: ${agent.sceneRole}`}>
            <span className="dock-dot" style={{ background: agent.color }} />
            <strong>{agent.name}</strong>
          </button>
        ))}
      </motion.nav>

      <motion.section className="hud-card lane-hud" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.22 }}>
        <div className="mini-title">Garden Lanes</div>
        {devices.slice(0, 4).map((device) => (
          <div key={device.id} className="lane-row">
            <span className="lane-light" style={{ background: device.color }} />
            <span><strong>{device.name}</strong><small>{device.kind}</small></span>
            <ChevronRight size={14} />
          </div>
        ))}
        <div className="visual-note"><EyeOff size={13} /> dashboard-only character looks</div>
      </motion.section>
    </div>
  );
}
