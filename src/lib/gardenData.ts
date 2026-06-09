export type AgentStatus = 'working' | 'idle' | 'watching' | 'offline' | 'warning';

export type GardenAgent = {
  id: string;
  name: string;
  title: string;
  zone: string;
  color: string;
  skinTone: string;
  hair: string;
  outfit: string;
  prop: string;
  sceneRole: string;
  animation: string;
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
    id: 'gardiner',
    name: 'The Gardiner',
    title: 'Garden Coordinator',
    zone: 'Shed & Tool Bench',
    color: '#d6b675',
    skinTone: '#d9a46f',
    hair: '#c9c2b4',
    outfit: '#477a48',
    prop: 'straw hat, glasses, pruning shears',
    sceneRole: 'Older gentleman gardener maintaining the little shed and checking the rows.',
    animation: 'shed-tend',
    status: 'working',
    mood: 'steady hands, clipboard calm, keeping the rows aligned',
    currentTask: 'Coordinating the whole Garden while keeping the shed, tools, and agent lanes tidy.',
    home: [-4.9, 0.3, -1.5],
    patrol: [[-4.9, 0.3, -1.5], [-5.5, 0.3, -0.3], [-4.2, 0.3, 0.2], [-5.3, 0.3, -2.2]],
    stats: { pulse: 'coordinating', lastSeen: 'now', signal: 'garden-core' },
  },
  {
    id: 'ganja',
    name: 'Ganja',
    title: 'Discord Front Desk',
    zone: 'Seed Rows',
    color: '#ff7a88',
    skinTone: '#f2b28d',
    hair: '#d94322',
    outfit: '#4fc27a',
    prop: 'seed packets and little trowel',
    sceneRole: 'Cute redhead walking the garden beds and planting seeds.',
    animation: 'plant-seeds',
    status: 'watching',
    mood: 'mellow, witty, planting requests where they belong',
    currentTask: 'Walking the front beds, planting new requests, and turning chatter into clean Garden ops.',
    home: [-1.8, 0.3, -0.7],
    patrol: [[-1.8, 0.3, -0.7], [-0.6, 0.3, -1.4], [0.6, 0.3, -0.7], [-0.9, 0.3, 0.2]],
    stats: { pulse: 'live', lastSeen: 'now', signal: 'discord-ready' },
  },
  {
    id: 'chronic',
    name: 'Chronic',
    title: 'Memory Librarian',
    zone: 'Oak Tree Shade',
    color: '#9dfc7d',
    skinTone: '#c18b62',
    hair: '#4b2c1c',
    outfit: '#6b8d4f',
    prop: 'joint, smoke puffs, guilty side-eye',
    sceneRole: 'Stoner dude chilling by a tree, smoking and looking around like nobody saw.',
    animation: 'tree-chill',
    status: 'working',
    mood: 'indexing memories through a suspiciously relaxed haze',
    currentTask: 'Curating Obsidian/Supabase memory trails from the shade under the oak tree.',
    home: [-3.9, 0.3, 2.6],
    patrol: [[-3.9, 0.3, 2.6], [-4.4, 0.3, 2.2], [-3.4, 0.3, 3.1], [-4.1, 0.3, 3.4]],
    stats: { pulse: 'cron-fed', lastSeen: 'recent', signal: 'memory-sync' },
  },
  {
    id: 'bak3r',
    name: 'BAK3R',
    title: 'theBAK3RY Keeper',
    zone: 'Vegetable Beds',
    color: '#ffb86b',
    skinTone: '#b9774d',
    hair: '#2c211b',
    outfit: '#fff1dc',
    prop: 'chef apron, basket, suspicious snack rhythm',
    sceneRole: 'Male cook who loves to eat, picking vegetables from different beds.',
    animation: 'harvest-snack',
    status: 'idle',
    mood: 'harvesting first, tasting second, pretending that order is true',
    currentTask: 'Picking vegetables around the beds while standing by for theBAK3RY service work.',
    home: [2.2, 0.3, -1.2],
    patrol: [[2.2, 0.3, -1.2], [3.2, 0.3, -0.4], [2.5, 0.3, 0.8], [1.4, 0.3, -0.1]],
    stats: { pulse: 'ready', lastSeen: 'standby', signal: 'pi-lane' },
  },
  {
    id: 'cyph3r',
    name: 'CYPH3R',
    title: 'Hack-Safe Sentinel',
    zone: 'Prepared Rows',
    color: '#bd93f9',
    skinTone: '#cfa47c',
    hair: '#251c33',
    outfit: '#3b2f64',
    prop: 'glasses, tablet, soil sensor',
    sceneRole: 'Nerdy hacker girl prepping the beds before Ganja plants the seeds.',
    animation: 'scan-soil',
    status: 'watching',
    mood: 'packet traces, soil sensors, and clean little rows',
    currentTask: 'Checking Hack-Safe signals while prepping safe garden rows for the next planting pass.',
    home: [1.0, 0.3, 1.3],
    patrol: [[1.0, 0.3, 1.3], [0.1, 0.3, 1.9], [1.9, 0.3, 2.2], [0.7, 0.3, 0.5]],
    stats: { pulse: 'monitored', lastSeen: 'now', signal: 'tailscale-link' },
  },
  {
    id: 'fat-man',
    name: 'Fat Man',
    title: 'NukeBox Mechanic',
    zone: 'Tractor Loop',
    color: '#f4d35e',
    skinTone: '#d09a6a',
    hair: '#8f6938',
    outfit: '#f7f7ef',
    prop: 'tractor, hay, soil trailer, wheat straw',
    sceneRole: 'Large man in white shirt, blue jeans, straw hat, driving the tractor with hay and soil.',
    animation: 'tractor-haul',
    status: 'working',
    mood: 'tractor rumble, telemetry hum, hay delivery schedule',
    currentTask: 'Driving supplies between garden beds while keeping NukeBox telemetry lanes moving.',
    home: [4.7, 0.3, 1.5],
    patrol: [[4.7, 0.3, 1.5], [5.4, 0.3, 0.0], [4.7, 0.3, -1.7], [3.5, 0.3, -0.2]],
    stats: { pulse: 'telemetry', lastSeen: 'fresh cache', signal: 'gmk-outbox' },
  },
  {
    id: 'little-boy',
    name: 'Little Boy',
    title: 'HP Laptop Handler',
    zone: 'Play Path',
    color: '#8be9fd',
    skinTone: '#e0a77f',
    hair: '#72513a',
    outfit: '#4aa3ff',
    prop: 'toy plane and muddy shoes',
    sceneRole: 'Little boy kid running around and playing in different garden spots.',
    animation: 'kid-run',
    status: 'idle',
    mood: 'tiny tornado energy, probably found a worm',
    currentTask: 'Running around the garden while waiting for HP laptop setup or repair orders.',
    home: [-0.7, 0.3, 3.8],
    patrol: [[-0.7, 0.3, 3.8], [0.4, 0.3, 4.4], [1.6, 0.3, 3.6], [-1.6, 0.3, 3.2]],
    stats: { pulse: 'standby', lastSeen: 'quiet', signal: 'device-lane' },
  },
  {
    id: 'homie',
    name: 'Homie',
    title: 'Smart-Home Steward',
    zone: 'House Shade',
    color: '#50fa7b',
    skinTone: '#bd8055',
    hair: '#171717',
    outfit: '#2c5f7d',
    prop: 'headphones, music notes, shade chair',
    sceneRole: 'Boy who never leaves home, listening to music under the oak by the farmhouse.',
    animation: 'headphone-nod',
    status: 'watching',
    mood: 'lights low, beat steady, sensors awake',
    currentTask: 'Watching Home Assistant presence from the shade without exposing private tokens.',
    home: [-5.4, 0.3, 3.7],
    patrol: [[-5.4, 0.3, 3.7], [-5.7, 0.3, 3.2], [-5.1, 0.3, 4.0], [-5.8, 0.3, 4.3]],
    stats: { pulse: 'ha-aware', lastSeen: 'now', signal: 'thebak3ry:8123' },
  },
  {
    id: 'big',
    name: 'B.I.G.',
    title: 'Resale Scout',
    zone: 'Driveway Truck',
    color: '#f1fa8c',
    skinTone: '#5b3528',
    hair: '#17120f',
    outfit: '#b12222',
    prop: 'old red farm truck, crates, market notebook',
    sceneRole: 'Big Black guy sitting in a nice old red farm truck in the driveway.',
    animation: 'truck-idle',
    status: 'idle',
    mood: 'cheap finds, high-upside daydreams, truck bed full of ideas',
    currentTask: 'Checking the driveway market lane for small buys, flips, parts, and sleeper deals.',
    home: [4.6, 0.3, 4.3],
    patrol: [[4.6, 0.3, 4.3], [4.9, 0.3, 4.0], [4.2, 0.3, 4.7], [5.1, 0.3, 4.8]],
    stats: { pulse: 'scouting-ready', lastSeen: 'standby', signal: 'market-lane' },
  },
];

export const devices: GardenDevice[] = [
  { id: 'oracle', name: 'The Garden', kind: 'Oracle VM', status: 'working', position: [-4.9, 0.12, -1.5], color: '#d6b675', detail: 'Shed-side Hermes core, cron, gateway, and command bridge.' },
  { id: 'obsidian', name: 'Memory Grove', kind: 'Obsidian / Wiki', status: 'working', position: [-3.9, 0.12, 2.6], color: '#9dfc7d', detail: 'Oak tree memory roots, LLM Wiki, and active knowledge trails.' },
  { id: 'bak3ry', name: 'theBAK3RY', kind: 'Raspberry Pi 5', status: 'idle', position: [2.2, 0.12, -1.2], color: '#fb923c', detail: 'Vegetable-bed workshop lane and service bench.' },
  { id: 'hacksafe', name: 'Hack-Safe', kind: 'CrowPi 5', status: 'watching', position: [1.0, 0.12, 1.3], color: '#c084fc', detail: 'Prepared-row security lab, soil sensors, and terminal bridge.' },
  { id: 'nukebox', name: 'NukeBox', kind: 'GMK M7 Windows', status: 'working', position: [4.7, 0.12, 1.5], color: '#f4d35e', detail: 'Tractor loop telemetry through OneDrive networking outbox.' },
  { id: 'hp', name: 'Little Boy', kind: 'HP Windows Laptop', status: 'idle', position: [-0.7, 0.12, 3.8], color: '#67e8f9', detail: 'Play-path laptop lane reserved for setup and repair flows.' },
];

export const statusCopy: Record<AgentStatus, string> = {
  working: 'Working',
  idle: 'Idle',
  watching: 'Watching',
  offline: 'Offline',
  warning: 'Warning',
};
