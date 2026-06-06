const authListeners = new Set();
const emitAuthEvent = (event, session) => {
  authListeners.forEach((listener) => {
    try {
      listener(event, { session });
    }
    catch (error) {
      console.error('Auth listener error:', error);
    }
  });
};
const createQuery = () => {
  const state = {
    action: null,
    payload: null,
    returnSingle: false,
  };
  const builder = {
    select() {
      state.action = 'select';
      return builder;
    },
    insert(payload) {
      state.action = 'insert';
      state.payload = payload;
      return builder;
    },
    update(payload) {
      state.action = 'update';
      state.payload = payload;
      return builder;
    },
    delete() {
      state.action = 'delete';
      return builder;
    },
    upsert(payload) {
      state.action = 'upsert';
      state.payload = payload;
      return builder;
    },
    eq() {
      return builder;
    },
    order() {
      return builder;
    },
    limit() {
      return builder;
    },
    single() {
      state.returnSingle = true;
      return builder;
    },
    _result() {
      const dataByAction = {
        select: [],
        insert: state.payload,
        update: state.payload,
        delete: null,
        upsert: state.payload,
      };
      const data = dataByAction[state.action] ?? [];
      if (state.returnSingle) {
        if (Array.isArray(data)) {
          return { data: data[0] || {}, error: null };
        }
        return { data: data || {}, error: null };
      }
      return { data, error: null };
    },
    then(resolve, reject) {
      return Promise.resolve(builder._result()).then(resolve, reject);
    },
  };
  return builder;
};
export const supabase = {
  auth: {
    async getSession() {
      const token = localStorage.getItem('aet_token');
      return { data: { session: token ? { access_token: token } : null } };
    },
    onAuthStateChange(callback) {
      authListeners.add(callback);
      const listener = {
        subscription: {
          unsubscribe() {
            authListeners.delete(callback);
          },
        },
      };
      return { data: listener };
    },
    async signOut() {
      localStorage.removeItem('aet_token');
      emitAuthEvent('SIGNED_OUT', null);
      return { error: null };
    },
    async signInWithPassword({ email, password }) {
      if (!email || !password) {
        return { data: { session: null }, error: { message: 'Email and password are required.' } };
      }
      const token = 'local-session-token';
      localStorage.setItem('aet_token', token);
      emitAuthEvent('SIGNED_IN', { access_token: token });
      return { data: { session: { access_token: token } }, error: null };
    },
    async signUp() {
      return { data: null, error: null };
    },
    async resetPasswordForEmail() {
      return { error: null };
    },
    async updateUser() {
      return { error: null };
    },
    admin: {
      async createUser() {
        return { data: { user: { id: 'local-user', email: '' } }, error: null };
      },
    },
  },
  from() {
    return createQuery();
  },
};
