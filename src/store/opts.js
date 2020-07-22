function calculatePrimes(iterations, multiplier) {
  const primes = [];
  const now = Date.now();
  // Casual UI-Locking code for 2 seconds!
  while (now + 2000 >= Date.now());

  for (let i = 0; i < iterations; i += 1) {
    const candidate = i * (multiplier * Math.random());
    let isPrime = true;
    for (let c = 2; c <= Math.sqrt(candidate); c += 1) {
      if (candidate % c === 0) {
        // not prime
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}

export default {
  state: {
    items: [],
    isWorking: false
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items;
    },
    SET_WORKING(state, value) {
      state.isWorking = value;
    }
  },
  actions: {
    generateItems({ commit }) {
      commit("SET_WORKING", true);
      const primes = calculatePrimes(400, 1000000000);
      commit("SET_ITEMS", primes);
      commit("SET_WORKING", false);
    }
  }
};
