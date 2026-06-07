export type AgentStatus = 'working' | 'idle' | 'watching' | 'offline' | 'warning';

export type GardenAgent = {
  id: string;
  name: string;
  title: string;
  zone: string;
  color: string;
  status: AgentStatus;
  mood: string;
  currentTask: string;
  home: [number, number, number];
  patrol: [number, number, number][];
  stats: {
    pulse: string;
    lastSeen: string;
    signal: string;
  };
};

export type GardenDevice = {
  id: string;
  name: string;
  kind: string;
  status: AgentStatus;
  position: [number, number, number];
  color: string;
  detail: string;
};

export const agents: GardenAgent[] = [
  {
    id: 'ganja',
    name: 'Ganja',
    title: 'Discord Front Desk',
    zone: 'Lobby',
    color: '#79ffe1',
    status: 'watching',
    mood: 'mellow, witty, routing requests',
    currentTask: 'Watching the front gate and translating chatter into clean Garden ops.',
    home: [-4.2, 0.3, -2.8],
    patrol: [[-4.2, 0.3, -2.8], [-3.2, 0.3, -1.3], [-2.2, 0.3, -3.2], [-4.6, 0.3, -4.0]],
    stats: { pulse: 'live', lastSeen: 'now', signal: 'discord-ready' },
  },
  {
    id: 'chronic',
    name: 'Chronic',
    title: 'Memory Librarian',
    zone: 'Obsidian Library',
    color: '#9dfc7d',
    status: 'working',
    mood: 'indexing, linking, pruning duplicate fog',
    currentTask: 'Curating Obsidian/Supabase memory trails and keeping the wiki roots watered.',
    home: [0, 0.3, -4.2],
    patrol: [[0, 0.3, -4.2], [1.5, 0.3, -3.6], [-1.2, 0.3, -3.2], [0.4, 0.3, -5.0]],
    stats: { pulse: 'cron-fed', lastSeen: 'recent', signal: 'memory-sync' },
  },
  {
    id: 'bak3r',
    name: 'BAK3R',
    title: 'theBAK3RY Keeper',
    zone: 'Workshop',
    color: '#ffb86b',
    status: 'idle',
    mood: 'bench lights on, tools lined up',
    currentTask: 'Standing by for Raspberry Pi workshop maintenance and service checks.',
    home: [4.1, 0.3, -2.5],
    patrol: [[4.1, 0.3, -2.5], [5.0, 0.3, -1.1], [3.1, 0.3, -0.7], [4.6, 0.3, -3.6]],
    stats: { pulse: 'ready', lastSeen: 'standby', signal: 'pi-lane' },
  },
  {
    id: 'cyph3r',
    name: 'CYPH3R',
    title: 'Hack-Safe Sentinel',
    zone: 'Security Lab',
    color: '#bd93f9',
    status: 'watching',
    mood: 'quiet paranoia, clean packet traces',
    currentTask: 'Watching Hack-Safe workspace signals and keeping the lab perimeter tidy.',
    home: [4.5, 0.3, 2.9],
    patrol: [[4.5, 0.3, 2.9], [3.2, 0.3, 3.8], [5.3, 0.3, 4.1], [4.1, 0.3, 1.8]],
    stats: { pulse: 'monitored', lastSeen: 'now', signal: 'tailscale-link' },
  },
  {
    id: 'fat-man',
    name: 'Fat Man',
    title: 'NukeBox Mechanic',
    zone: 'Garage',
    color: '#ff6b6b',
    status: 'working',
    mood: 'grease pencil, telemetry hum',
    currentTask: 'Reading GMK/NukeBox telemetry lanes and keeping Windows bridge notes warm.',
    home: [0.8, 0.3, 4.2],
    patrol: [[0.8, 0.3, 4.2], [-0.8, 0.3, 4.8], [1.7, 0.3, 5.0], [1.4, 0.3, 3.0]],
    stats: { pulse: 'telemetry', lastSeen: 'fresh cache', signal: 'gmk-outbox' },
  },
  {
    id: 'little-boy',
    name: 'Little Boy',
    title: 'HP Laptop Handler',
    zone: 'Desk',
    color: '#8be9fd',
    status: 'idle',
    mood: 'sleeping with one eye open',
    currentTask: 'Waiting for HP laptop setup, repair, or remote workflow orders.',
    home: [-2.8, 0.3, 3.7],
    patrol: [[-2.8, 0.3, 3.7], [-4.0, 0.3, 3.2], [-3.2, 0.3, 4.8], [-1.7, 0.3, 4.1]],
    stats: { pulse: 'standby', lastSeen: 'quiet', signal: 'device-lane' },
  },
  {
    id: 'homie',
    name: 'Homie',
    title: 'Smart-Home Steward',
    zone: 'Home Control',
    color: '#50fa7b',
    status: 'watching',
    mood: 'lights low, sensors awake',
    currentTask: 'Keeping Home Assistant presence visible without leaking private tokens.',
    home: [-4.4, 0.3, 0.9],
    patrol: [[-4.4, 0.3, 0.9], [-5.1, 0.3, 2.0], [-3.2, 0.3, 1.8], [-4.8, 0.3, -0.2]],
    stats: { pulse: 'ha-aware', lastSeen: 'now', signal: 'thebak3ry:8123' },
  },
  {
    id: 'big',
    name: 'B.I.G.',
    title: 'Resale Scout',
    zone: 'Market Kiosk',
    color: '#f1fa8c',
    status: 'idle',
    mood: 'cheap finds, high-upside daydreams',
    currentTask: 'Waiting for a hunting lane: small buys, flips, parts, and sleeper deals.',
    home: [2.8, 0.3, 0.7],
    patrol: [[2.8, 0.3, 0.7], [1.8, 0.3, 1.4], [3.6, 0.3, 1.9], [3.4, 0.3, -0.4]],
    stats: { pulse: 'scouting-ready', lastSeen: 'standby', signal: 'market-lane' },
  },
];

export const devices: GardenDevice[] = [
  { id: 'oracle', name: 'The Garden', kind: 'Oracle VM', status: 'working', position: [0, 0.12, 0], color: '#a78bfa', detail: 'Hermes core, cron, gateway, command bridge.' },
  { id: 'obsidian', name: 'Obsidian VM', kind: 'Knowledge Vault', status: 'working', position: [0, 0.12, -5.8], color: '#7dd3fc', detail: 'Vault, LLM Wiki, active memory roots.' },
  { id: 'bak3ry', name: 'theBAK3RY', kind: 'Raspberry Pi 5', status: 'idle', position: [5.8, 0.12, -2.3], color: '#fb923c', detail: 'Workshop Pi and service bench.' },
  { id: 'hacksafe', name: 'Hack-Safe', kind: 'CrowPi 5', status: 'watching', position: [5.8, 0.12, 3.6], color: '#c084fc', detail: 'Security lab workspace and terminal bridge.' },
  { id: 'nukebox', name: 'NukeBox', kind: 'GMK M7 Windows', status: 'working', position: [0.2, 0.12, 5.9], color: '#fb7185', detail: 'Telemetry through OneDrive networking outbox.' },
  { id: 'hp', name: 'Little Boy', kind: 'HP Windows Laptop', status: 'idle', position: [-4.4, 0.12, 5.1], color: '#67e8f9', detail: 'Laptop lane reserved for setup and repair flows.' },
];

export const statusCopy: Record<AgentStatus, string> = {
  working: 'Working',
  idle: 'Idle',
  watching: 'Watching',
  offline: 'Offline',
  warning: 'Warning',
};
