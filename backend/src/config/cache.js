import NodeCache from 'node-cache';

// Practical 9: In-Memory Caching layer with 60s TTL and auto expiration
const cache = new NodeCache({
  stdTTL: 60,
  checkperiod: 120,
  deleteOnExpire: true,
  useClones: false
});

export default cache;
