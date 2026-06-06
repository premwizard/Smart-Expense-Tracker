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
    async getUser(authHeader) {
      if (!authHeader) {
        return { data: { user: null }, error: { message: 'Unauthorized' } };
      }
      return { data: { user: { id: 'local-user', email: 'local@example.com' } }, error: null };
    },
    async signInWithPassword() {
      return { data: { session: { access_token: 'local-session-token' }, user: { id: 'local-user', email: 'local@example.com' } }, error: null };
    },
    async updateUser() {
      return { data: null, error: null };
    },
    async resetPasswordForEmail() {
      return { data: null, error: null };
    },
    admin: {
      async createUser() {
        return { data: { user: { id: 'local-user', email: 'local@example.com' } }, error: null };
      },
    },
  },
  from() {
    return createQuery();
  },
};
